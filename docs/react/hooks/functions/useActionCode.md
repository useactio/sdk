[**@useactio/sdk**](../../../README.md)

***

[@useactio/sdk](../../../modules.md) / [react/hooks](../README.md) / useActionCode

# Function: useActionCode()

> **useActionCode**(`code?`): `object`

Defined in: [src/react/hooks.ts:26](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/react/hooks.ts#L26)

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
