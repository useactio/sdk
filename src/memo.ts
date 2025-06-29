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
import type { TransactionResponse } from "@solana/web3.js";

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
  tx: TransactionResponse,
  options: {
    registryUrl?: string;
  } = {}
): Promise<boolean> {
  const url =
    options.registryUrl ||
    "https://service.ota.codes/.well-known/authority-registry.json";

  if (
    !tx ||
    !tx.meta ||
    !tx.transaction ||
    !Array.isArray(tx.meta.logMessages) ||
    !Array.isArray(tx.transaction.message.instructions)
  )
    return false;

  const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";
  const memoIx = tx.transaction.message.instructions.find(
    (ix: any) =>
      ix.programId?.toBase58?.() === MEMO_PROGRAM_ID ||
      ix.programId === MEMO_PROGRAM_ID
  );

  if (!memoIx) return false;

  const memoStr = Buffer.from(memoIx.data, "base64").toString("utf-8");
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

  const signers = tx.transaction.message.accountKeys
    .filter((key: any) => key.signer)
    .map((key: any) =>
      typeof key.pubkey === "string" ? key.pubkey : key.pubkey.toBase58()
    );

  return signers.includes(memoObj.iss);
}
