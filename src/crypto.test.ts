import { hashActionCode, decryptAction } from './crypto';
import { expect, test, describe, vi } from 'vitest';

// Test vector for hashActionCode
const EXAMPLE_CODE = 'test-action-code';
const EXAMPLE_HASH = '34ebe3abf9798e0a0ce08f376d24f0f890fe59eaeaddb3eda5d5752a9dfc4060';

describe('hashActionCode', () => {
  test('returns correct sha256 hex', () => {
    expect(hashActionCode(EXAMPLE_CODE)).toBe(EXAMPLE_HASH);
  });
});

describe('decryptAction', () => {
  test('decrypts and parses payload', () => {
    // Arrange
    const fakePayload = { foo: 'bar', n: 42 };
    const fakeDecrypted = Buffer.from(JSON.stringify(fakePayload));
    // Mock nacl.secretbox.open to return our fake payload
    const nacl = require('tweetnacl');
    const openSpy = vi.spyOn(nacl.secretbox, 'open').mockReturnValue(fakeDecrypted);
    // Inputs (values don't matter since we're mocking)
    const encryptedAction = 'ZmFrZQ==';
    const nonce = 'bm9uY2U=';
    const code = 'code';
    // Act
    const result = decryptAction(encryptedAction, nonce, code);
    // Assert
    expect(result).toEqual(fakePayload);
    openSpy.mockRestore();
  });

  test('throws if decryption fails', () => {
    const nacl = require('tweetnacl');
    const openSpy = vi.spyOn(nacl.secretbox, 'open').mockReturnValue(null);
    expect(() => decryptAction('ZmFrZQ==', 'bm9uY2U=', 'code')).toThrow('Failed to decrypt Action payload');
    openSpy.mockRestore();
  });
}); 