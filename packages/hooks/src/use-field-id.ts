import * as React from "react"

/**
 * Resolves a stable field id: returns the user-provided id if given,
 * otherwise falls back to a React-generated stable id.
 */
export function useFieldId(providedId?: string): string {
  const generatedId = React.useId()
  return providedId ?? generatedId
}
