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
import { sha256 } from "js-sha256";
import nacl from "tweetnacl";
import { ActionFields } from "./client";

/**
 * Decrypts an Action payload.
 * @param encryptedAction - base64 string
 * @param nonce - base64 string
 * @param code - the code string
 * @returns The decrypted intent object
 */
export function decryptAction(
  encryptedAction: string,
  nonce: string,
  code: string
): Partial<ActionFields> {
  const key = Buffer.from(hashActionCode(code), "hex"); // 32 bytes
  const box = Buffer.from(encryptedAction, "base64");
  const nonceBuf = Buffer.from(nonce, "base64");
  const message = nacl.secretbox.open(box, nonceBuf, key);
  if (!message) throw new Error("Failed to decrypt Action payload");
  return JSON.parse(Buffer.from(message).toString("utf8"));
}

/**
 * Hashes an Action code.
 * @param code - the code string
 * @returns The hashed code
 */
export function hashActionCode(code: string): string {
  return sha256(code);
}
