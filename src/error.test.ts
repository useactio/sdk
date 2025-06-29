import {
  ActionCodesBaseError,
  InvalidCodeFormatError,
  CodeNotFoundError,
  ActionSubmissionFailedError,
  TransactionDecodingError,
  NetworkRequestError,
  UnauthorizedError,
  ExpiredCodeError,
  UnsupportedPrefixError,
  TaskNotFoundError,
  TaskTimeoutError,
  TaskStillInProgressError,
} from './error';
import { expect, test, describe } from 'vitest';

describe('Error classes', () => {
  test('InvalidCodeFormatError', () => {
    const err = new InvalidCodeFormatError();
    expect(err).toBeInstanceOf(ActionCodesBaseError);
    expect(err.code).toBe('INVALID_CODE_FORMAT');
    expect(err.message).toMatch(/format/);
  });

  test('CodeNotFoundError', () => {
    const err = new CodeNotFoundError();
    expect(err.code).toBe('CODE_NOT_FOUND');
    expect(err.message).toMatch(/not be found/);
  });

  test('ActionSubmissionFailedError', () => {
    const err = new ActionSubmissionFailedError();
    expect(err.code).toBe('ACTION_SUBMISSION_FAILED');
    expect(err.message).toMatch(/Failed to submit/);
  });

  test('TransactionDecodingError', () => {
    const err = new TransactionDecodingError();
    expect(err.code).toBe('TRANSACTION_DECODING_ERROR');
    expect(err.message).toMatch(/decode/);
  });

  test('NetworkRequestError', () => {
    const err = new NetworkRequestError();
    expect(err.code).toBe('NETWORK_REQUEST_ERROR');
    expect(err.message).toMatch(/Network request failed/);
  });

  test('UnauthorizedError', () => {
    const err = new UnauthorizedError();
    expect(err.code).toBe('UNAUTHORIZED');
    expect(err.message).toMatch(/not authorized/);
  });

  test('ExpiredCodeError', () => {
    const err = new ExpiredCodeError();
    expect(err.code).toBe('EXPIRED_CODE');
    expect(err.message).toMatch(/expired/);
  });

  test('UnsupportedPrefixError', () => {
    const err = new UnsupportedPrefixError();
    expect(err.code).toBe('UNSUPPORTED_PREFIX');
    expect(err.message).toMatch(/prefix/);
  });

  test('TaskNotFoundError', () => {
    const err = new TaskNotFoundError('abc123');
    expect(err.code).toBe('TASK_NOT_FOUND');
    expect(err.message).toMatch(/abc123/);
  });

  test('TaskTimeoutError', () => {
    const err = new TaskTimeoutError('abc123', 5000);
    expect(err.code).toBe('TASK_TIMEOUT');
    expect(err.message).toMatch(/abc123/);
    expect(err.message).toMatch(/5000/);
  });

  test('TaskStillInProgressError', () => {
    const err = new TaskStillInProgressError('abc123', 'pending');
    expect(err.code).toBe('TASK_STILL_IN_PROGRESS');
    expect(err.message).toMatch(/abc123/);
    expect(err.message).toMatch(/pending/);
  });
}); 