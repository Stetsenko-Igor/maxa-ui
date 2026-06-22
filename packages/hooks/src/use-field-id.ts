import { useId } from "./use-id.js"

/**
 * Resolves a stable field id: returns the user-provided id if given,
 * otherwise falls back to a generated stable id (React 18+ `useId`, or a
 * React 17-safe ponyfill).
 */
export function useFieldId(providedId?: string): string {
  const generatedId = useId()
  return providedId ?? generatedId
}
