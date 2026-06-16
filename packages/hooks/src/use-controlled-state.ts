import * as React from "react"

interface UseControlledStateOptions<T> {
  value: T | undefined
  defaultValue: T
  onChange?: ((next: T) => void) | undefined
}

/**
 * Manages the controlled/uncontrolled state pattern.
 * Returns [currentValue, setter] where setter always fires onChange
 * and only updates internal state when uncontrolled (value === undefined).
 */
export function useControlledState<T>({
  value,
  defaultValue,
  onChange,
}: UseControlledStateOptions<T>): [T, (next: T) => void] {
  const [internalValue, setInternalValue] = React.useState<T>(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const setValue = React.useCallback(
    (next: T) => {
      if (value === undefined) {
        setInternalValue(next)
      }
      onChange?.(next)
    },
    [value, onChange],
  )

  return [currentValue, setValue]
}
