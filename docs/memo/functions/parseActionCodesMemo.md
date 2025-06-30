[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [memo](../README.md) / parseActionCodesMemo

# Function: parseActionCodesMemo()

> **parseActionCodesMemo**(`memo`): `null` \| [`ParsedActionCodesMemo`](../interfaces/ParsedActionCodesMemo.md)

Defined in: [src/memo.ts:54](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/memo.ts#L54)

Parse an Actio Protocol memo string V1 (AIP-1).

## Parameters

### memo

The memo string to parse.

`string` | `Uint8Array`\<`ArrayBufferLike`\>

## Returns

`null` \| [`ParsedActionCodesMemo`](../interfaces/ParsedActionCodesMemo.md)

ParsedActioncodesMemo object if valid, or null if invalid.
