[**@useactio/sdk**](../../README.md)

***

[@useactio/sdk](../../modules.md) / [validation](../README.md) / validateCodeFormat

# Function: validateCodeFormat()

> **validateCodeFormat**(`code`, `throws`): `boolean` \| `void`

Defined in: [src/validation.ts:25](https://github.com/useactio/sdk/blob/05c3f60504530bc924eb1866a55e5825e99fa486/src/validation.ts#L25)

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
