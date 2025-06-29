[**@useactio/sdk**](../../../README.md)

***

[@useactio/sdk](../../../modules.md) / [react/hooks](../README.md) / useSubmitAction

# Function: useSubmitAction()

> **useSubmitAction**(): `object`

Defined in: [src/react/hooks.ts:60](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/react/hooks.ts#L60)

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
