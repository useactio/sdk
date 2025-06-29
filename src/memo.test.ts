import {
  parseActionCodesMemo,
  validateActionCodesMemoTransaction,
  ParsedActionCodesMemo,
} from "./memo";
import { expect, test, describe, afterEach, vi } from "vitest";

const EXAMPLE_MEMO =
  "actioncodes:ver=1&pre=DEFAULT&ini=CCCCZSgqUBsmFLceNwgFBJC3mL5N8Be67WjRh1jhgzJ5&iss=CCCCZSgqUBsmFLceNwgFBJC3mL5N8Be67WjRh1jhgzJ5&int=761UVEYf7fqu6VSTi8uR9DepWUyxMR47sb4YeUmVL8CV";

const EXAMPLE_PARSED: ParsedActionCodesMemo = {
  ver: "1",
  pre: "DEFAULT",
  ini: "CCCCZSgqUBsmFLceNwgFBJC3mL5N8Be67WjRh1jhgzJ5",
  iss: "CCCCZSgqUBsmFLceNwgFBJC3mL5N8Be67WjRh1jhgzJ5",
  int: "761UVEYf7fqu6VSTi8uR9DepWUyxMR47sb4YeUmVL8CV",
};

describe("parseActionCodesMemo", () => {
  test("parses a valid memo string", () => {
    expect(parseActionCodesMemo(EXAMPLE_MEMO)).toEqual(EXAMPLE_PARSED);
  });

  test("returns null for invalid prefix", () => {
    expect(parseActionCodesMemo("foo:ver=1")).toBeNull();
  });

  test("returns null for missing fields", () => {
    expect(parseActionCodesMemo("actioncodes:ver=1")).toBeNull();
  });
});

describe("validateActionCodesMemoTransaction", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("validates a transaction with correct memo, registry, and signer", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ DEFAULT: EXAMPLE_PARSED.iss }),
      })
    );

    const tx = {
      meta: { logMessages: [] },
      transaction: {
        message: {
          instructions: [
            {
              programId: "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
              data: Buffer.from(EXAMPLE_MEMO, "utf-8").toString("base64"),
            },
          ],
          accountKeys: [
            {
              pubkey: EXAMPLE_PARSED.iss,
              signer: true,
            },
          ],
        },
      },
    } as any;

    const result = await validateActionCodesMemoTransaction(tx);
    expect(result).toBe(true);
  });

  test("fails if memo is missing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    );
    const tx = {
      meta: { logMessages: [] },
      transaction: { message: { instructions: [] } },
    } as any;
    const result = await validateActionCodesMemoTransaction(tx);
    expect(result).toBe(false);
  });
});
