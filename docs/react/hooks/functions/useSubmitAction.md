[**@useactio/sdk**](../../../README.md)

***

[@useactio/sdk](../../../modules.md) / [react/hooks](../README.md) / useSubmitAction

# Function: useSubmitAction()

> **useSubmitAction**(): `object`

Defined in: [src/react/hooks.ts:60](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/react/hooks.ts#L60)

Submit an action to the action code using the task-based flow.

## Returns

`object`

The taskId, task status, and error.

### error

> **error**: `null` \| `Error`

### loading

> **loading**: `boolean`

### reset()

> **reset**: () => `void`

#### Returns

`void`

### submit()

> **submit**: (`code`, `fields`) => `Promise`\<`void`\>

#### Parameters

##### code

`string`

##### fields

[`ActionPayload`](../../../client/type-aliases/ActionPayload.md)

#### Returns

`Promise`\<`void`\>

### task

> **task**: `any`

### taskId

> **taskId**: `null` \| `string`
