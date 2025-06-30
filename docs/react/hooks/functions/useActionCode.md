[**@useactio/sdk**](../../../README.md)

***

[@useactio/sdk](../../../modules.md) / [react/hooks](../README.md) / useActionCode

# Function: useActionCode()

> **useActionCode**(`code?`): `object`

Defined in: [src/react/hooks.ts:26](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/react/hooks.ts#L26)

Get the action code data.

## Parameters

### code?

`string`

The action code to get the data for.

## Returns

`object`

The action code data.

### action?

> `optional` **action**: `Partial`\<[`ActionFields`](../../../client/interfaces/ActionFields.md)\>

### error

> **error**: `null` \| `Error`

### intendedFor?

> `optional` **intendedFor**: `string`

### loading

> **loading**: `boolean`

### refetch()

> **refetch**: () => `Promise`\<`void`\> = `fetch`

#### Returns

`Promise`\<`void`\>
