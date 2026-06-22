import type * as React from "react"
import { useId } from "./use-id.js"

interface UseLabelIdsOptions {
  label?: React.ReactNode | undefined
  sideLabel?: React.ReactNode | undefined
  description?: React.ReactNode | undefined
  ariaLabel?: string | undefined
  ariaLabelledBy?: string | undefined
  ariaDescribedBy?: string | undefined
}

interface UseLabelIdsResult {
  labelId: string | undefined
  sideLabelId: string | undefined
  descriptionId: string | undefined
  labelledBy: string | undefined
  describedBy: string | undefined
}

/**
 * Derives accessible name + description ids from a base generated id.
 * Covers the checkbox/radio/toggle pattern:
 *   top label, side label, description → composed labelledBy / describedBy.
 */
export function useLabelIds(opts: UseLabelIdsOptions = {}): UseLabelIdsResult {
  const { label, sideLabel, description, ariaLabel, ariaLabelledBy, ariaDescribedBy } = opts
  const baseId = useId()

  const labelId = label ? `${baseId}-label` : undefined
  const sideLabelId = sideLabel ? `${baseId}-side-label` : undefined
  const descriptionId = description ? `${baseId}-description` : undefined

  const labelledBy =
    ariaLabel || ariaLabelledBy
      ? ariaLabelledBy
      : [labelId, sideLabelId].filter(Boolean).join(" ") || undefined

  const describedBy =
    [ariaDescribedBy, descriptionId].filter(Boolean).join(" ") || undefined

  return { labelId, sideLabelId, descriptionId, labelledBy, describedBy }
}
