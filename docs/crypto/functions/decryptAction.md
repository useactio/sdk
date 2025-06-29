[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [crypto](../README.md) / decryptAction

# Function: decryptAction()

> **decryptAction**(`encryptedAction`, `nonce`, `code`): `Partial`\<[`ActionFields`](../../client/interfaces/ActionFields.md)\>

Defined in: [src/crypto.ts:27](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/crypto.ts#L27)

Decrypts an Action payload.

## Parameters

### encryptedAction

`string`

base64 string

### nonce

`string`

base64 string

### code

`string`

the code string

## Returns

`Partial`\<[`ActionFields`](../../client/interfaces/ActionFields.md)\>

The decrypted intent object
