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
import { InvalidCodeFormatError } from './error';

/**
 * Validates an Action Code.
 * For now, accepts default codes: 8-digit numeric codes
 * @param code - The code to validate.
 * @param throws - If true, throws InvalidCodeFormatError on invalid code. If false, returns boolean.
 * @returns boolean if throws is false, otherwise void.
 */
export function validateCodeFormat(code: string, throws = false): boolean | void {
  const plainCodeRegex = /^\d{8}$/; // For numeric codes only

  const isValid = plainCodeRegex.test(code);

  if (!isValid && throws) {
    throw new InvalidCodeFormatError();
  }

  return throws ? undefined : isValid;
}
