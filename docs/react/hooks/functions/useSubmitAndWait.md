[**@useactio/sdk**](../../../README.md)

***

[@useactio/sdk](../../../modules.md) / [react/hooks](../README.md) / useSubmitAndWait

# Function: useSubmitAndWait()

> **useSubmitAndWait**(): `object`

Defined in: [src/react/hooks.ts:115](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/react/hooks.ts#L115)

Submit an action and wait for its result in a single call (fire-and-forget).

## Returns

`object`

The final task result, loading, and error.

### error

> **error**: `null` \| `Error`

### loading

> **loading**: `boolean`

### reset()

> **reset**: () => `void`

#### Returns

`void`

### result

> **result**: `null` \| [`TaskResponse`](../../../client/interfaces/TaskResponse.md)

### submitAndWait()

> **submitAndWait**: (`code`, `fields`, `timeoutMs?`) => `Promise`\<`void`\>

#### Parameters

##### code

`string`

##### fields

[`ActionPayload`](../../../client/type-aliases/ActionPayload.md)

##### timeoutMs?

`number`

#### Returns

`Promise`\<`void`\>
