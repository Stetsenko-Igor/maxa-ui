import * as React from "react"

let counter = 0

function nextFallbackId(): string {
  counter += 1
  return `maxa-id-${counter}`
}

function useNativeId(): string {
  // React 18+
  return React.useId()
}

function useFallbackId(): string {
  // React 17 and older: a stable, per-instance client id.
  const [id] = React.useState(nextFallbackId)
  return id
}

/**
 * `useId` ponyfill. Uses React 18+'s built-in `useId` when present, otherwise
 * falls back to a stable client-generated counter id so `@maxa/ui` works on
 * React 17 (client-rendered) apps. The implementation is chosen once at module
 * load, so the same hook runs on every render (no conditional-hook violation).
 *
 * Note: the fallback is client-only and not SSR hydration-safe; React 17 here is
 * supported for SPA consumers, which is the documented target.
 */
export const useId: () => string =
  typeof (React as { useId?: unknown }).useId === "function" ? useNativeId : useFallbackId
