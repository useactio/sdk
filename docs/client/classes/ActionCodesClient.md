[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [client](../README.md) / ActionCodesClient

# Class: ActionCodesClient

Defined in: [src/client.ts:145](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L145)

## Constructors

### Constructor

> **new ActionCodesClient**(`baseUrl`): `ActionCodesClient`

Defined in: [src/client.ts:146](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L146)

#### Parameters

##### baseUrl

`string` = `"https://service.ota.codes/v1"`

#### Returns

`ActionCodesClient`

## Methods

### getAction()

> **getAction**(`code`): `Promise`\<`Partial`\<\{ `action`: `Partial`\<[`ActionFields`](../interfaces/ActionFields.md)\>; `intendedFor`: `string`; \}\>\>

Defined in: [src/client.ts:190](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L190)

Get the action fields for a given code.

#### Parameters

##### code

`string`

The code to get the action fields for.

#### Returns

`Promise`\<`Partial`\<\{ `action`: `Partial`\<[`ActionFields`](../interfaces/ActionFields.md)\>; `intendedFor`: `string`; \}\>\>

The action fields.

***

### getTask()

> **getTask**(`taskId`, `includeResult`): `Promise`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

Defined in: [src/client.ts:248](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L248)

Get the status and (optionally) result of a task by its ID.

#### Parameters

##### taskId

`string`

The task ID to fetch.

##### includeResult

`boolean` = `true`

Whether to include the result payload (default: true).

#### Returns

`Promise`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

The task response.

#### Throws

TaskNotFoundError if the task does not exist.

***

### getTaskResult()

> **getTaskResult**(`taskId`): `Promise`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

Defined in: [src/client.ts:308](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L308)

Get the final result of a task when it's completed, failed, or cancelled.

#### Parameters

##### taskId

`string`

The task ID to get the result for.

#### Returns

`Promise`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

The task with its final result.

#### Throws

TaskStillInProgressError if the task is not yet finalized.

***

### observeTaskStatus()

> **observeTaskStatus**(`taskId`, `intervalMs`): `AsyncGenerator`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

Defined in: [src/client.ts:275](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L275)

Observe the status of a task until it's finalized (completed, failed, or cancelled).

#### Parameters

##### taskId

`string`

The task ID to observe.

##### intervalMs

`number` = `2000`

The interval to check the task status in milliseconds.

#### Returns

`AsyncGenerator`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

An async generator that yields the task status updates.

***

### submitActionWithTask()

> **submitActionWithTask**(`code`, `fields`): `Promise`\<\{ `status`: [`ActionStatus`](../type-aliases/ActionStatus.md); `taskId`: `string`; \}\>

Defined in: [src/client.ts:358](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L358)

Submit an action and return a task ID for tracking.

#### Parameters

##### code

`string`

The code to submit the action for.

##### fields

[`ActionPayload`](../type-aliases/ActionPayload.md)

The action fields to submit.

#### Returns

`Promise`\<\{ `status`: [`ActionStatus`](../type-aliases/ActionStatus.md); `taskId`: `string`; \}\>

The task ID and initial status for tracking the action.

#### Throws

ActionSubmissionFailedError if submission fails or no task ID is returned.

***

### submitAndWait()

> **submitAndWait**(`code`, `fields`, `timeoutMs`): `Promise`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

Defined in: [src/client.ts:397](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L397)

Submit an action and wait for its result in a single call.

#### Parameters

##### code

`string`

The code to submit the action for.

##### fields

[`ActionPayload`](../type-aliases/ActionPayload.md)

The action fields to submit.

##### timeoutMs

`number` = `120_000`

Maximum time to wait in milliseconds (default: 2 minutes).

#### Returns

`Promise`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

The task with its final result.

#### Throws

TaskTimeoutError if the task does not complete in time.

#### Throws

TaskNotFoundError if the task is not found.

***

### waitForTaskResult()

> **waitForTaskResult**(`taskId`, `timeoutMs`): `Promise`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

Defined in: [src/client.ts:327](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/client.ts#L327)

Wait for a task to complete and return its result.

#### Parameters

##### taskId

`string`

The task ID to wait for.

##### timeoutMs

`number` = `300000`

Maximum time to wait in milliseconds (default: 5 minutes).

#### Returns

`Promise`\<[`TaskResponse`](../interfaces/TaskResponse.md)\>

The task with its final result.

#### Throws

TaskTimeoutError if the task does not complete in time.

#### Throws

TaskNotFoundError if the task is not found.
