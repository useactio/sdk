import { validateCodeFormat } from './validation';
import { InvalidCodeFormatError } from './error';
import { expect, test, describe } from 'vitest';

describe('validateCodeFormat', () => {
  test('returns true for valid 8-digit code', () => {
    expect(validateCodeFormat('12345678')).toBe(true);
  });

  test('returns false for invalid code (not 8 digits)', () => {
    expect(validateCodeFormat('1234')).toBe(false);
    expect(validateCodeFormat('abcdefgh')).toBe(false);
    expect(validateCodeFormat('123456789')).toBe(false);
  });

  test('throws InvalidCodeFormatError for invalid code when throws=true', () => {
    expect(() => validateCodeFormat('1234', true)).toThrow(InvalidCodeFormatError);
  });

  test('returns undefined for valid code when throws=true', () => {
    expect(validateCodeFormat('12345678', true)).toBeUndefined();
  });
}); 