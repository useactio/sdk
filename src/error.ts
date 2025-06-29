/*
 * Copyright 2025 Actio Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Base error class for all SDK errors.
 */
export class ActionCodesBaseError extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error thrown when the code format is invalid.
 */
export class InvalidCodeFormatError extends ActionCodesBaseError {
  constructor(details?: any) {
    super(
      'The provided code does not match the expected format.',
      'INVALID_CODE_FORMAT',
      details
    );
  }
}

/**
 * Error thrown when a code cannot be found.
 */
export class CodeNotFoundError extends ActionCodesBaseError {
  constructor(details?: any) {
    super(
      'The requested code could not be found.',
      'CODE_NOT_FOUND',
      details
    );
  }
}

/**
 * Error thrown when an action submission fails.
 */
export class ActionSubmissionFailedError extends ActionCodesBaseError {
  constructor(details?: any) {
    super(
      'Failed to submit the action. Please try again.',
      'ACTION_SUBMISSION_FAILED',
      details
    );
  }
}

/**
 * Error thrown when transaction decoding fails.
 */
export class TransactionDecodingError extends ActionCodesBaseError {
  constructor(details?: any) {
    super(
      'Unable to decode the transaction data.',
      'TRANSACTION_DECODING_ERROR',
      details
    );
  }
}

/**
 * Error thrown when a network request fails.
 */
export class NetworkRequestError extends ActionCodesBaseError {
  constructor(details?: any) {
    super(
      'Network request failed. Please check your connection and try again.',
      'NETWORK_REQUEST_ERROR',
      details
    );
  }
}

/**
 * Error thrown when the user is unauthorized.
 */
export class UnauthorizedError extends ActionCodesBaseError {
  constructor(details?: any) {
    super(
      'You are not authorized to perform this action.',
      'UNAUTHORIZED',
      details
    );
  }
}

/**
 * Error thrown when a code has expired.
 */
export class ExpiredCodeError extends ActionCodesBaseError {
  constructor(details?: any) {
    super(
      'This code has expired and can no longer be used.',
      'EXPIRED_CODE',
      details
    );
  }
}

/**
 * Error thrown when a code prefix is not supported.
 */
export class UnsupportedPrefixError extends ActionCodesBaseError {
  constructor(details?: any) {
    super(
      'The code prefix is not supported by this SDK.',
      'UNSUPPORTED_PREFIX',
      details
    );
  }
}

/**
 * Error thrown when a task cannot be found.
 */
export class TaskNotFoundError extends ActionCodesBaseError {
  constructor(taskId: string, details?: any) {
    super(
      `Task ${taskId} could not be found.`,
      'TASK_NOT_FOUND',
      details
    );
  }
}

/**
 * Error thrown when waiting for a task result times out.
 */
export class TaskTimeoutError extends ActionCodesBaseError {
  constructor(taskId: string, timeoutMs: number, details?: any) {
    super(
      `Task ${taskId} did not complete within ${timeoutMs}ms.`,
      'TASK_TIMEOUT',
      details
    );
  }
}

/**
 * Error thrown when trying to get a result from a task that is still in progress.
 */
export class TaskStillInProgressError extends ActionCodesBaseError {
  constructor(taskId: string, status: string, details?: any) {
    super(
      `Task ${taskId} is still in progress (status: ${status}).`,
      'TASK_STILL_IN_PROGRESS',
      details
    );
  }
}