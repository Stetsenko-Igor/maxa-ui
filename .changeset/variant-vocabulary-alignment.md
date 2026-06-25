---
"@maxa/ui": minor
---

**Variant vocabulary alignment** (audit F5 + F6): a single naming glossary now governs color/treatment props. See `specs/patterns/variant-vocabulary.md` — `intent` = semantic meaning, `appearance` = decorative palette, `emphasis` = visual weight, `variant` = structure.

Breaking prop renames (pre-v1):

- **Avatar**: `color` → `appearance`, `tone` → `emphasis` (value sets unchanged). Types `AvatarColor`/`AvatarTone` renamed to `AvatarAppearance`/`AvatarEmphasis`.
- **Spinner**: removed the deprecated `tone` prop and `SpinnerTone` type (use `appearance`).

Button keeps its fused `variant` (hierarchy + status) as the single documented exception.
