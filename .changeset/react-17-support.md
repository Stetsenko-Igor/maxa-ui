---
"@maxa/hooks": minor
"@maxa/ui": minor
"@maxa/icons": minor
---

Support React 17. Add a `useId` ponyfill in `@maxa/hooks` (native React 18+ `useId`
with a React 17-safe fallback) and route `useFieldId`, `useLabelIds`, and the
Dialog/Drawer/Progress/Slider components through it instead of `React.useId`. Widen
`react`/`react-dom` peer ranges to `^17 || ^18 || ^19`.
