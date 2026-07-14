/**
 * Builds a DOM id for a listbox option that is safe to reference from
 * `aria-activedescendant`.
 *
 * Option ids used to be `${listboxId}-${option.value}`, but option values are
 * arbitrary strings — whitespace or special characters produce invalid id
 * references and break `aria-activedescendant`. This helper sanitizes ONLY the
 * DOM id segment; the original option value must keep flowing through state,
 * comparisons, `onValueChange`, and native form submission untouched.
 *
 * The option index guarantees uniqueness even when two different values
 * sanitize to the same slug (e.g. "North America" and "North_America").
 */
export function optionDomId(listboxId: string, index: number, value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
  return slug ? `${listboxId}-option-${index}-${slug}` : `${listboxId}-option-${index}`
}
