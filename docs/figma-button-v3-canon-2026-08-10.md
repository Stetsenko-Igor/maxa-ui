# Figma Button v3 Canon — 2026-08-10

## Source

- Figma file: `9M6ulX7a6bDlmctFdClAzu`
- Component set: `11020:118515` — `🟢 Button / Light Mode`
- QA frame: `11022:327`
- Variant count: 336
- Axes: `Type × Size × State × Icon Only`

This document records the post-edit structure verified after the Button order and Loading spinner overrides were reset in Figma.

## Canonical ordering

Types, top to bottom:

1. Primary
2. Secondary
3. Outline (`𝙶̶𝚑̶𝚘̶𝚜̶𝚝̶ Outline` in Figma)
4. Positive
5. Negative
6. Ghost
7. Link

Every Type uses size rows in this order: Large, Medium, Small, Xtra Small.

Every size row contains regular variants first, then Icon Only variants. Both groups use the same state order:

`Default → Hover → Active → Focus → Loading → Disabled`

`Active` represents the transient pressed interaction and aligns with CSS `:active` and the existing `*-active` token naming. Persistent `Selected` state is intentionally excluded from Button and belongs to toggle-style controls.

## Loading spinner policy

Loading is behaviorally disabled but remains fully visible. Every Loading variant uses root opacity `1` with no disabled-opacity variable binding. Regular buttons preserve the label and place the animated Spinner at the leading edge; Icon Only buttons center the Spinner. Loading has no prototype reactions and must not respond to hover, press, focus, or click.

| Type      | Appearance | Stroke behavior                       |
| --------- | ---------- | ------------------------------------- |
| Primary   | White      | Override with `Button/primary/fg`     |
| Positive  | White      | Override with `Button/positive/fg`    |
| Negative  | White      | Override with `Button/destructive/fg` |
| Secondary | Greyscale  | Inherit Spinner component             |
| Outline   | Greyscale  | Inherit Spinner component             |
| Ghost     | Greyscale  | Inherit Spinner component             |
| Link      | Primary    | Inherit Spinner component             |

Verified population: 56 Loading spinners. The 24 spinners on colored surfaces have intentional Button foreground overrides; the remaining 32 have no nested stroke overrides.

Width, height, and root fill/variable bindings on a Spinner instance are expected. The rule above applies specifically to nested stroke overrides.

## v3 spacing model

| Size | Height | Root padding X | Root gap | Text padding X | Effective label edge | Effective icon-to-text | Icon |
| ---- | ------ | -------------- | -------- | -------------- | -------------------- | ---------------------- | ---- |
| XS   | 24px   | 6px            | 2px      | 2px            | 8px                  | 4px                    | 12px |
| S    | 28px   | 8px            | 4px      | 2px            | 10px                 | 6px                    | 16px |
| M    | 36px   | 14px           | 6px      | 2px            | 16px                 | 8px                    | 16px |
| L    | 48px   | 20px           | 4px      | 4px            | 24px                 | 8px                    | 20px |

Link uses zero root padding, zero Text padding, and Hug sizing. Its icon-to-text gaps are 4, 6, 8, and 8px for XS, S, M, and L.

## Component-token cleanup decision

The v3 migration is complete. Each size has `Button/size/*/padding-x`, `/gap`, and `/text-padding-x` roles. The gap and Text-padding roles alias global Spacing, while Icon Only width/height reuse the regular Button height.

Published v2 identities remain hidden under `Button/legacy/*` for compatibility. Social Button binds gap and horizontal padding directly to shared Spacing variables and owns no component-specific spacing proxies. New Button v3 bindings contain no legacy references.

The active size family is `height`, `padding-x`, `gap`, `text-padding-x`, `radius`, `text`, `line-height`, `weight`, and `icon-size`.
