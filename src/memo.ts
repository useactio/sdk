/*
 * Copyright 2025 Actio Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Actio Protocol Memo (AIP-1) helpers
import type {
  TransactionResponse,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";

/**
 * Parsed representation of an Actio Protocol memo.
 */
export interface ParsedActionCodesMemo {
  ver: string;
  pre: string;
  ini: string;
  iss: string;
  int: string;
}

/**
 * Parse an Actio Protocol memo string V1 (AIP-1).
 * @param memo - The memo string to parse.
 * @returns ParsedActioncodesMemo object if valid, or null if invalid.
 */
export function parseActionCodesMemo(
  memo: string
): ParsedActionCodesMemo | null {
  if (!memo.startsWith("actioncodes:")) return null;
  const query = memo.slice("actioncodes:".length);
  const params = new URLSearchParams(query);
  const ver = params.get("ver");
  const pre = params.get("pre");
  const ini = params.get("ini");
  const iss = params.get("iss");
  const int = params.get("int");
  if (!ver || !pre || !ini || !iss || !int) return null;
  return { ver, pre, ini, iss, int };
}

/**
 * Full validation of an Actio Protocol memo embedded in a transaction.
 * - Parses the memo instruction
 * - Validates structure and prefix authority (via registry)
 * - Confirms that `iss` is a signer of the transaction
 *
 * @param tx - The Solana TransactionResponse (from @solana/web3.js).
 * @param options - Optional override: registryUrl (defaults to official Actio registry).
 * @returns true if memo is valid and issuer is trusted and signed, false otherwise.
 */
export async function validateActionCodesMemoTransaction(
  tx: TransactionResponse | VersionedTransaction | Transaction,
  options: {
    registryUrl?: string;
  } = {}
): Promise<boolean> {
  const url =
    options.registryUrl ||
    "https://service.ota.codes/.well-known/authority-registry.json";

  // Type guards
  const isTransactionResponse = (obj: any): obj is TransactionResponse =>
    obj && typeof obj === "object" && "meta" in obj && "transaction" in obj;
  const isVersionedTransaction = (obj: any): obj is VersionedTransaction =>
    obj && typeof obj === "object" && "message" in obj && "signatures" in obj && Array.isArray(obj.signatures);
  const isLegacyTransaction = (obj: any): obj is Transaction =>
    obj && typeof obj === "object" && "instructions" in obj && Array.isArray(obj.instructions);

  let instructions: any[] = [];
  let signers: string[] = [];
  let accountKeys: any[] = [];

  if (isTransactionResponse(tx)) {
    if (!tx.transaction || !tx.transaction.message || !Array.isArray(tx.transaction.message.instructions)) {
      return false;
    }
    instructions = tx.transaction.message.instructions;
    accountKeys = tx.transaction.message.accountKeys;
    if (Array.isArray(accountKeys)) {
      signers = accountKeys
        .filter((key: any) => key && key.signer)
        .map((key: any) => (typeof key.pubkey === "string" ? key.pubkey : key.pubkey?.toBase58?.()));
    } else {
      signers = [];
    }
  } else if (isVersionedTransaction(tx)) {
    // VersionedTransaction: tx.message is VersionedMessage (Message or MessageV0)
    const msg: any = tx.message;
    // Try to get instructions and account keys
    if (Array.isArray(msg.instructions)) {
      // Legacy
      instructions = msg.instructions;
      accountKeys = msg.accountKeys || msg.staticAccountKeys;
    } else if (Array.isArray(msg.compiledInstructions)) {
      // V0
      instructions = msg.compiledInstructions;
      accountKeys = msg.staticAccountKeys;
    }
    // Signers are the first N account keys, where N = msg.header.numRequiredSignatures
    if (msg.header && typeof msg.header.numRequiredSignatures === "number") {
      signers = accountKeys
        .slice(0, msg.header.numRequiredSignatures)
        .map((k: any) =>
          typeof k === "string"
            ? k
            : typeof k.toBase58 === "function"
            ? k.toBase58()
            : k?.toString?.()
        );
    }
  } else if (isLegacyTransaction(tx)) {
    instructions = tx.instructions;
    // Signers: public keys in tx.signatures with a non-null signature
    if (Array.isArray(tx.signatures)) {
      signers = tx.signatures
        .filter((s: any) => s.signature)
        .map((s: any) => (typeof s.publicKey === "string" ? s.publicKey : s.publicKey.toBase58()));
    }
    // Account keys: tx.feePayer and all keys in instructions
    accountKeys = [];
    if (tx.feePayer) {
      accountKeys.push(typeof tx.feePayer === "string" ? tx.feePayer : tx.feePayer.toBase58());
    }
    for (const ix of tx.instructions) {
      for (const key of ix.keys || []) {
        const pk = typeof key.pubkey === "string" ? key.pubkey : key.pubkey.toBase58();
        if (!accountKeys.includes(pk)) accountKeys.push(pk);
      }
    }
  } else {
    return false;
  }

  const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";
  // Find memo instruction
  let memoIx: any = null;
  for (const ix of instructions) {
    // Try to support both legacy and v0/compiled
    const programId = ix.programId || (ix.programIdIndex !== undefined && accountKeys[ix.programIdIndex]);
    const programIdStr = typeof programId === "string" ? programId : programId?.toBase58?.() || programId?.toString?.();
    if (programIdStr === MEMO_PROGRAM_ID) {
      memoIx = ix;
      break;
    }
  }
  if (!memoIx) return false;

  // Extract memo data
  let memoStr: string | null = null;
  if (memoIx.data) {
    // If base64, decode
    try {
      memoStr = Buffer.from(memoIx.data, "base64").toString("utf-8");
    } catch {
      // fallback: maybe it's already utf-8
      memoStr = memoIx.data;
    }
  }
  if (!memoStr) return false;
  const memoObj = parseActionCodesMemo(memoStr);
  if (!memoObj || memoObj.ver !== "1") return false;

  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const registry = await res.json();
    const expectedIssuer = registry[memoObj.pre];
    if (!expectedIssuer || expectedIssuer !== memoObj.iss) return false;
  } catch {
    return false;
  }

  return signers.includes(memoObj.iss);
}
