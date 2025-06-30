[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [crypto](../README.md) / decryptAction

# Function: decryptAction()

> **decryptAction**(`encryptedAction`, `nonce`, `code`): `Partial`\<[`ActionFields`](../../client/interfaces/ActionFields.md)\>

Defined in: [src/crypto.ts:27](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/crypto.ts#L27)

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
