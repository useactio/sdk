[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [client](../README.md) / TaskResponse

# Interface: TaskResponse

Defined in: [src/client.ts:132](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/client.ts#L132)

Response for a task status or result.

## Properties

### createdAt

> **createdAt**: `number`

Defined in: [src/client.ts:136](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/client.ts#L136)

***

### expiresAt

> **expiresAt**: `number`

Defined in: [src/client.ts:137](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/client.ts#L137)

***

### mode

> **mode**: `"signOnly"` \| `"submit"`

Defined in: [src/client.ts:135](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/client.ts#L135)

***

### result?

> `optional` **result**: `object`

Defined in: [src/client.ts:138](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/client.ts#L138)

#### error?

> `optional` **error**: `string`

#### signedTxBase64?

> `optional` **signedTxBase64**: `string`

#### txSignature?

> `optional` **txSignature**: `string`

***

### status

> **status**: [`ActionStatus`](../type-aliases/ActionStatus.md)

Defined in: [src/client.ts:134](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/client.ts#L134)

***

### taskId

> **taskId**: `string`

Defined in: [src/client.ts:133](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/client.ts#L133)
