[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [memo](../README.md) / validateActionCodesMemoTransaction

# Function: validateActionCodesMemoTransaction()

> **validateActionCodesMemoTransaction**(`tx`, `options`): `Promise`\<`boolean`\>

Defined in: [src/memo.ts:196](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/memo.ts#L196)

Full validation of an Actio Protocol memo embedded in a transaction.
- Parses the memo instruction
- Validates structure and prefix authority (via registry)
- Confirms that `iss` is a signer of the transaction

## Parameters

### tx

The Solana TransactionResponse (from @solana/web3.js).

`TransactionResponse` | `VersionedTransaction` | `Transaction`

### options

Optional override: registryUrl (defaults to official Actio registry).

#### registryUrl?

`string`

## Returns

`Promise`\<`boolean`\>

true if memo is valid and issuer is trusted and signed, false otherwise.
