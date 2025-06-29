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
import { useState, useCallback, useEffect, useRef } from 'react';
import { ActionCodesClient, ActionFields, ActionPayload, TaskResponse } from '..';

const client = new ActionCodesClient();

/**
 * Get the action code data.
 * @param code - The action code to get the data for.
 * @returns The action code data.
 */
export function useActionCode(code?: string) {
  const [data, setData] = useState<Partial<{
    action: Partial<ActionFields>;
    intendedFor: string;
  }> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!code) return;
    setLoading(true);
    setError(null);
    try {
      const result = await client.getAction(code);
      setData(result);
    } catch (err) {
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    if (code) fetch();
  }, [code, fetch]);

  return { ...data, loading, error, refetch: fetch };
}

/**
 * Submit an action to the action code using the task-based flow.
 * @returns The taskId, task status, and error.
 */
export function useSubmitAction() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [task, setTask] = useState<any>(null); // Could type as TaskResponse if imported
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const submit = useCallback(async (code: string, fields: ActionPayload) => {
    setLoading(true);
    setError(null);
    setTaskId(null);
    setTask(null);
    try {
      const { taskId } = await client.submitActionWithTask(code, fields);
      setTaskId(taskId);
      // Observe task status
      for await (const t of client.observeTaskStatus(taskId)) {
        if (!isMounted.current) break;
        setTask(t);
        if (
          t.status === "completed" ||
          t.status === "failed" ||
          t.status === "cancelled"
        ) {
          break;
        }
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setTaskId(null);
    setTask(null);
    setError(null);
    setLoading(false);
  }, []);

  return { submit, taskId, task, loading, error, reset };
}

/**
 * Submit an action and wait for its result in a single call (fire-and-forget).
 * @returns The final task result, loading, and error.
 */
export function useSubmitAndWait() {
  const [ result, setResult] = useState<TaskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitAndWait = useCallback(async (code: string, fields: ActionPayload, timeoutMs?: number) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await client.submitAndWait(code, fields, timeoutMs);
      setResult(res);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { submitAndWait, result, loading, error, reset };
}
