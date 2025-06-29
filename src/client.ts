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
import { decryptAction, hashActionCode } from "./crypto";
import {
  ActionCodesBaseError,
  CodeNotFoundError,
  ActionSubmissionFailedError,
  TransactionDecodingError,
  NetworkRequestError,
  UnauthorizedError,
  ExpiredCodeError,
  TaskNotFoundError,
  TaskTimeoutError,
  TaskStillInProgressError,
} from "./error";

/** Standarized ActionCodes Protocol Action Metadatafields */
export type ActionStatus =
  | "pending"
  | "ready"
  | "failed"
  | "completed"
  | "cancelled";
export type ActionVersion = "1";
export type Memo = string;
export type Label = string;
export type Message = string;
export type Logo = string;
export type TransactionBase64 = string;
export type ExpiresAt = string;
export type Reference = string;
export type IntendedFor = string;

export interface ActionFields {
  /**
   * The version of the action fields.
   */
  version: ActionVersion;
  /**
   * The status of the action.
   */
  status: ActionStatus;
  /**
   * The memo of the action.
   */
  memo: Memo;
  /**
   * The label of the action.
   */
  label: Label;
  /**
   * The message of the action.
   */
  message: Message;
  /**
   * The logo of the action.
   */
  logo: Logo;
  /**
   * Base64 encoded Solana transaction. If signOnly is true, this will be replaced with the signed transaction.
   */
  transactionBase64: TransactionBase64;
  /**
   * The base58 pubkeys of the reference accounts.
   */
  references?: Reference[];
  /**
   * The base58 pubkey of the intended recipient.
   */
  intendedFor: IntendedFor;
  /**
   * If true, the transaction will be signed by the user's wallet. not broadcasted.
   */
  signOnly?: boolean;
}

export type ActionPayload = Pick<
  ActionFields,
  | "memo"
  | "label"
  | "message"
  | "logo"
  | "transactionBase64"
  | "references"
  | "signOnly"
>;

/**
 * Request payload for submitting an action.
 */
export interface ActionSubmitRequest {
  code: string;
  action: Partial<ActionPayload>;
}

/**
 * Response from resolving an action code.
 */
export interface ActionResolveResponse {
  status: ActionStatus;
  encryptedIntent: string;
  nonce: string;
  intendedFor: string;
}

/**
 * Response from submitting an action.
 */
export interface SubmitResponse {
  success: boolean;
  status: ActionStatus;
  expiresAt: string;
  taskId?: string;
}

/**
 * Response for a task status or result.
 */
export interface TaskResponse {
  taskId: string;
  status: ActionStatus;
  mode: "signOnly" | "submit";
  createdAt: number;
  expiresAt: number;
  result?: {
    signedTxBase64?: string;
    txSignature?: string;
    error?: string;
  };
}

export class ActionCodesClient {
  constructor(private readonly baseUrl = "https://service.ota.codes/v1") {
    this.baseUrl = baseUrl;
  }

  private async _request<T, U = unknown>(
    method: "GET" | "POST",
    path: string,
    body?: U,
    query?: Record<string, string | number | boolean> | URLSearchParams
  ): Promise<T> {
    try {
      let queryString = "";
      if (query) {
        queryString = `?${new URLSearchParams(
          query as Record<string, string>
        ).toString()}`;
      }
      const res = await fetch(`${this.baseUrl}${path}${queryString}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
        ...(query
          ? { query: new URLSearchParams(query as Record<string, string>) }
          : {}),
      });

      if (!res.ok) {
        if (res.status === 404) throw new CodeNotFoundError();
        if (res.status === 401) throw new UnauthorizedError();
        if (res.status === 410) throw new ExpiredCodeError();
        throw new NetworkRequestError({ status: res.status, path });
      }
      return res.json();
    } catch (err) {
      if (err instanceof ActionCodesBaseError) throw err;
      throw new NetworkRequestError(err);
    }
  }

  /**
   * Get the action fields for a given code.
   * @param code - The code to get the action fields for.
   * @returns The action fields.
   */
  public async getAction(code: string): Promise<
    Partial<{
      action: Partial<ActionFields>;
      intendedFor: string;
    }>
  > {
    try {
      const hashedCode = hashActionCode(code);
      const action = await this.resolveAction(hashedCode);

      if (action.encryptedIntent === "" || action.nonce === "") {
        return {
          action: {},
          intendedFor: action.intendedFor,
        };
      }

      try {
        const decryptedAction = decryptAction(
          action.encryptedIntent,
          action.nonce,
          hashedCode
        );
        return {
          action: decryptedAction,
          intendedFor: action.intendedFor,
        };
      } catch (err) {
        throw new TransactionDecodingError(err);
      }
    } catch (err) {
      if (err instanceof ActionCodesBaseError) throw err;
      throw new NetworkRequestError(err);
    }
  }

  private async resolveAction(code: string): Promise<ActionResolveResponse> {
    // encryptedIntent: May be empty if no intent is set. If decryption fails, fallback logic is used.
    return this._request<ActionResolveResponse>("GET", `/code/${code}`);
  }

  private async _submitRawAction(
    data: ActionSubmitRequest
  ): Promise<SubmitResponse> {
    return this._request<SubmitResponse, Partial<ActionSubmitRequest>>(
      "POST",
      "/code/submit",
      data
    );
  }

  /**
   * Get the status and (optionally) result of a task by its ID.
   * @param taskId - The task ID to fetch.
   * @param includeResult - Whether to include the result payload (default: true).
   * @returns The task response.
   * @throws TaskNotFoundError if the task does not exist.
   */
  public async getTask(
    taskId: string,
    includeResult = true
  ): Promise<TaskResponse> {
    try {
      return await this._request<TaskResponse>(
        "GET",
        `/task/${taskId}`,
        undefined,
        {
          includeResult,
        }
      );
    } catch (err) {
      if (err instanceof NetworkRequestError && err.details?.status === 404) {
        throw new TaskNotFoundError(taskId);
      }
      throw err;
    }
  }

  /**
   * Observe the status of a task until it's finalized (completed, failed, or cancelled).
   * @param taskId - The task ID to observe.
   * @param intervalMs - The interval to check the task status in milliseconds.
   * @returns An async generator that yields the task status updates.
   */
  public async *observeTaskStatus(
    taskId: string,
    intervalMs = 2000
  ): AsyncGenerator<TaskResponse> {
    let previousStatus: ActionStatus | null = null;

    while (true) {
      const task = await this.getTask(taskId, false); // Don't include result during observation

      if (task.status !== previousStatus) {
        previousStatus = task.status;
        yield task;
      }

      // Stop observing when task is finalized
      if (
        task.status === "completed" ||
        task.status === "failed" ||
        task.status === "cancelled"
      ) {
        return task;
      }

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }

  /**
   * Get the final result of a task when it's completed, failed, or cancelled.
   * @param taskId - The task ID to get the result for.
   * @returns The task with its final result.
   * @throws TaskStillInProgressError if the task is not yet finalized.
   */
  public async getTaskResult(taskId: string): Promise<TaskResponse> {
    const task = await this.getTask(taskId, true);

    // Ensure task is in a final state
    if (task.status === "pending" || task.status === "ready") {
      throw new TaskStillInProgressError(taskId, task.status);
    }

    return task;
  }

  /**
   * Wait for a task to complete and return its result.
   * @param taskId - The task ID to wait for.
   * @param timeoutMs - Maximum time to wait in milliseconds (default: 5 minutes).
   * @returns The task with its final result.
   * @throws TaskTimeoutError if the task does not complete in time.
   * @throws TaskNotFoundError if the task is not found.
   */
  public async waitForTaskResult(
    taskId: string,
    timeoutMs = 300000
  ): Promise<TaskResponse> {
    const startTime = Date.now();

    for await (const task of this.observeTaskStatus(taskId)) {
      if (
        task.status === "completed" ||
        task.status === "failed" ||
        task.status === "cancelled"
      ) {
        return this.getTaskResult(taskId);
      }

      // Check timeout
      if (Date.now() - startTime > timeoutMs) {
        throw new TaskTimeoutError(taskId, timeoutMs);
      }
    }

    throw new TaskNotFoundError(taskId);
  }

  /**
   * Submit an action and return a task ID for tracking.
   * @param code - The code to submit the action for.
   * @param fields - The action fields to submit.
   * @returns The task ID and initial status for tracking the action.
   * @throws ActionSubmissionFailedError if submission fails or no task ID is returned.
   */
  public async submitActionWithTask(
    code: string,
    fields: ActionPayload
  ): Promise<{ taskId: string; status: ActionStatus }> {
    try {
      const response = await this._submitRawAction({
        code: hashActionCode(code),
        action: { ...fields },
      });

      if (!response.success) {
        throw new ActionSubmissionFailedError();
      }

      if (!response.taskId) {
        throw new ActionSubmissionFailedError(
          "No task ID returned from action submission, please try submitAction instead"
        );
      }

      return {
        taskId: response.taskId,
        status: response.status,
      };
    } catch (err) {
      if (err instanceof ActionCodesBaseError) throw err;
      throw new NetworkRequestError(err);
    }
  }

  /**
   * Submit an action and wait for its result in a single call.
   * @param code - The code to submit the action for.
   * @param fields - The action fields to submit.
   * @param timeoutMs - Maximum time to wait in milliseconds (default: 2 minutes).
   * @returns The task with its final result.
   * @throws TaskTimeoutError if the task does not complete in time.
   * @throws TaskNotFoundError if the task is not found.
   */
  public async submitAndWait(
    code: string,
    fields: ActionPayload,
    timeoutMs = 120_000
  ): Promise<TaskResponse> {
    const { taskId } = await this.submitActionWithTask(code, fields);
    return await this.waitForTaskResult(taskId, timeoutMs);
  }
}
