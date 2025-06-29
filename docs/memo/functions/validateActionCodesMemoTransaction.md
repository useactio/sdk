[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [memo](../README.md) / validateActionCodesMemoTransaction

# Function: validateActionCodesMemoTransaction()

> **validateActionCodesMemoTransaction**(`tx`, `options`): `Promise`\<`boolean`\>

Defined in: [src/memo.ts:60](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/memo.ts#L60)

Full validation of an Actio Protocol memo embedded in a transaction.
- Parses the memo instruction
- Validates structure and prefix authority (via registry)
- Confirms that `iss` is a signer of the transaction

## Parameters

### tx

`TransactionResponse`

The Solana TransactionResponse (from @solana/web3.js).

### options

Optional override: registryUrl (defaults to official Actio registry).

#### registryUrl?

`string`

## Returns

`Promise`\<`boolean`\>

true if memo is valid and issuer is trusted and signed, false otherwise.
