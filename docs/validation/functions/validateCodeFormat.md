[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [validation](../README.md) / validateCodeFormat

# Function: validateCodeFormat()

> **validateCodeFormat**(`code`, `throws`): `boolean` \| `void`

Defined in: [src/validation.ts:25](https://github.com/useactio/sdk/blob/aa0cbb7aefc891bd76a4e1447f8c84a24792d899/src/validation.ts#L25)

Validates an Action Code.
For now, accepts default codes: 8-digit numeric codes

## Parameters

### code

`string`

The code to validate.

### throws

`boolean` = `false`

If true, throws InvalidCodeFormatError on invalid code. If false, returns boolean.

## Returns

`boolean` \| `void`

boolean if throws is false, otherwise void.
