[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [memo](../README.md) / getActioMemo

# Function: getActioMemo()

> **getActioMemo**(`tx`): `null` \| \{ `memoString`: `string`; `parsed`: [`ParsedActionCodesMemo`](../interfaces/ParsedActionCodesMemo.md); \}

Defined in: [src/memo.ts:227](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/memo.ts#L227)

Extracts and parses the Actio Protocol memo from a transaction.

## Parameters

### tx

The Solana TransactionResponse, Transaction, or VersionedTransaction.

`TransactionResponse` | `VersionedTransaction` | `Transaction`

## Returns

`null` \| \{ `memoString`: `string`; `parsed`: [`ParsedActionCodesMemo`](../interfaces/ParsedActionCodesMemo.md); \}

if found and valid, or null if not found/invalid.
