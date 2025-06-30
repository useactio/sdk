[**@useactio/sdk**](../../../README.md)

***

[@useactio/sdk](../../../modules.md) / [react/hooks](../README.md) / useSubmitAndWait

# Function: useSubmitAndWait()

> **useSubmitAndWait**(): `object`

Defined in: [src/react/hooks.ts:115](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/react/hooks.ts#L115)

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
