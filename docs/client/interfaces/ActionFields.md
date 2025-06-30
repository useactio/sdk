[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [client](../README.md) / ActionFields

# Interface: ActionFields

Defined in: [src/client.ts:47](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L47)

## Properties

### intendedFor

> **intendedFor**: `string`

Defined in: [src/client.ts:83](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L83)

The base58 pubkey of the intended recipient.

***

### label

> **label**: `string`

Defined in: [src/client.ts:63](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L63)

The label of the action.

***

### logo

> **logo**: `string`

Defined in: [src/client.ts:71](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L71)

The logo of the action.

***

### memo

> **memo**: `string`

Defined in: [src/client.ts:59](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L59)

The memo of the action.

***

### message

> **message**: `string`

Defined in: [src/client.ts:67](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L67)

The message of the action.

***

### references?

> `optional` **references**: `string`[]

Defined in: [src/client.ts:79](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L79)

The base58 pubkeys of the reference accounts.

***

### signOnly?

> `optional` **signOnly**: `boolean`

Defined in: [src/client.ts:87](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L87)

If true, the transaction will be signed by the user's wallet. not broadcasted.

***

### status

> **status**: [`ActionStatus`](../type-aliases/ActionStatus.md)

Defined in: [src/client.ts:55](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L55)

The status of the action.

***

### transactionBase64

> **transactionBase64**: `string`

Defined in: [src/client.ts:75](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L75)

Base64 encoded Solana transaction. If signOnly is true, this will be replaced with the signed transaction.

***

### version

> **version**: `"1"`

Defined in: [src/client.ts:51](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L51)

The version of the action fields.
