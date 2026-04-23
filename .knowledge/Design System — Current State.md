# MAXA Design System — Current State

> Проектная заметка для Obsidian / локальной памяти репозитория.  
> Фиксирует текущее agreed state foundation-слоя перед следующими изменениями.

## 1. Общая позиция

- MAXA — **Design System-first**, не Tailwind-first.
- Источник истины для Figma token import находится в `packages/tokens/figma/`.
- `packages/tokens/figma/import-bundle.json` считается артефактом сборки, а не ручным source of truth.

## 2. Figma Collections

Текущая структура коллекций:

- `Primitives`
- `Color modes`
- `Spacing`
- `Radius`
- `Typography`
- `Layout`
- `Breakpoints`

Удалённые устаревшие слои:

- старые `layout-*`
- старая responsive typography по отдельным файлам `desktop/tablet/mobile`
- отдельная коллекция `Containers`

## 3. Primitives

### Colors

Цвета объединены в одну верхнеуровневую группу:

- `Colors/Base/...`
- `Colors/Neutral/...`
- `Colors/Neutral (alpha)/...`
- `Colors/Brand/...`
- и остальные hue groups

Это сделано по аналогии с подходом Untitled UI: единый цветовой primitive layer внутри одной коллекции.

### Spacing

Spacing primitives живут внутри:

- `Primitives/Spacing/...`

Имена spacing primitives читаемые и включают размер в пикселях:

- `Spacing/0 (0px)`
- `Spacing/0․5 (2px)`
- `Spacing/1 (4px)`
- `Spacing/1․5 (6px)`
- `Spacing/4 (16px)`
- `Spacing/12 (48px)`

Важно:

- для дробных шагов используется `․` вместо обычной ASCII-точки, потому что Figma import конфликтовал с `0.5` и `1.5`

## 4. Semantic Spacing

Semantic spacing живёт отдельным слоем:

- `spacing-none`
- `spacing-xxs`
- `spacing-xs`
- `spacing-sm`
- ...
- `spacing-11xl`

Semantic spacing aliases указывают на primitive spacing:

- например `spacing-xl -> {Primitives/Spacing/4 (16px)}`

## 5. Layout Methodology

Текущая принятая методология для Figma:

- `Primitives -> Spacing -> Layout`

Где:

- `Primitives` = raw spacing values и color primitives
- `Spacing` = универсальная semantic spacing scale
- `Layout` = designer-facing слой для ежедневного выбора в Auto layout

Это значит:

- дизайнеры не работают напрямую с primitive spacing
- для layout-решений используется отдельная коллекция `Layout`
- `Layout` ссылается на `Spacing`

Важно:

- `Spacing` не подменяется `Layout`
- `Layout` не заменяет `Spacing`, а выражает usage intent
- `Grid/margin` и `Container/padding` считаются разными по смыслу токенами, даже если их значения временно совпадают

## 6. Layout Collection

Коллекция `Layout` использует modes:

- `Desktop`
- `Tablet`
- `Mobile`

Внутри коллекции используется group-based naming, чтобы Figma показывал отдельные группы:

- `Stack/*`
- `Inline/*`
- `Container/*`
- `Grid/*`

Текущий состав `Layout`:

- `Stack/tight`
- `Stack/text`
- `Stack/default`
- `Stack/group`
- `Stack/section`
- `Inline/tight`
- `Inline/default`
- `Inline/group`
- `Container/padding`
- `Container/max-width`
- `Grid/gutter`
- `Grid/margin`

Текущие рабочие значения:

| Token | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| `Stack/tight` | `spacing-xs` | `spacing-xs` | `spacing-xs` |
| `Stack/text` | `spacing-lg` | `spacing-lg` | `spacing-lg` |
| `Stack/default` | `spacing-xl` | `spacing-xl` | `spacing-xl` |
| `Stack/group` | `spacing-3xl` | `spacing-3xl` | `spacing-3xl` |
| `Stack/section` | `spacing-8xl` | `spacing-7xl` | `spacing-6xl` |
| `Inline/tight` | `spacing-md` | `spacing-md` | `spacing-md` |
| `Inline/default` | `spacing-lg` | `spacing-lg` | `spacing-lg` |
| `Inline/group` | `spacing-xl` | `spacing-xl` | `spacing-xl` |
| `Container/padding` | `spacing-4xl` | `spacing-3xl` | `spacing-xl` |
| `Container/max-width` | `1568` | `1568` | `1568` |
| `Grid/gutter` | `spacing-3xl` | `spacing-2xl` | `spacing-xl` |
| `Grid/margin` | `Container/padding` | `Container/padding` | `Container/padding` |

Это временно принятые рабочие значения.

Дальше ожидается отдельный проход по реальным макетам, после которого mapping может быть скорректирован без изменения самой методологии.

## 7. Colors / Semantic

Semantic color layer называется:

- `Color modes`

Текущие modes:

- `Light`
- `Dark`

Semantic colors ссылаются на primitive colors внутри `Primitives/Colors/...`.

## 8. Radius

Текущая шкала радиусов:

- `radius-none = 0`
- `radius-xxs = 2`
- `radius-xs = 4`
- `radius-sm = 6`
- `radius-md = 8`
- `radius-lg = 10`
- `radius-xl = 12`
- `radius-2xl = 16`
- `radius-3xl = 20`
- `radius-4xl = 24`
- `radius-full = 9999`

## 9. Breakpoints

Текущие breakpoint names:

- `mobile = 375`
- `tablet = 768`
- `laptop = 1024`
- `desktop = 1280`
- `wide = 1440`
- `ultra = 1680`
- `max = 1920`

Descriptions содержат legacy aliases вроде:

- `Legacy alias: lg.`

## 10. Typography

### Font family

Текущее решение:

- `Font family/body = Montserrat`
- `Font family/mono = Bebas Neue`

Важно:

- `font-family-display` сейчас **не используется**

### Typography roles

Текущая agreed structure:

- `heading-2xl`
- `heading-xl`
- `heading-lg`
- `heading-md`
- `heading-sm`
- `heading-xs`
- `text-lg`
- `text-md`
- `text-sm`
- `caption-sm`
- `caption-xs`

### Typography sizes

Текущие значения:

- `heading-2xl = 40`
- `heading-xl = 32`
- `heading-lg = 26`
- `heading-md = 22`
- `heading-sm = 18`
- `heading-xs = 16`
- `text-lg = 16`
- `text-md = 14`
- `text-sm = 12`
- `caption-sm = 10`
- `caption-xs = 8`

### Typography line heights

Текущее зафиксированное состояние:

- `heading-2xl = 48`
- `heading-xl = 40`
- `heading-lg = 34`
- `heading-md = 30`
- `heading-sm = 26`
- `heading-xs = 24`
- `text-lg = 24`
- `text-md = 20`
- `text-sm = 18`
- `caption-sm = 16`
- `caption-xs = 12`

### Naming decisions

- для SaaS app решили уйти от `display`
- `label` пока не выносится в foundation role
- `label` считается ближе к component usage layer

## 11. Figma Import Plugin

Локальный dev plugin находится в:

- `.knowledge/Figma Import plugin/`

Текущее состояние плагина:

- умеет импортировать `import-bundle.json`
- умеет принимать drag-and-drop:
  - `import-bundle.json`
  - или `manifest.json` + referenced token files
- показывает import progress
- автоскроллит лог вниз
- удаляет stale variables при re-import

Если после изменений токенов нужно обновить Figma import:

1. из корня репо выполнить `pnpm figma:bundle`
2. импортировать свежий `packages/tokens/figma/import-bundle.json`
3. использовать обновлённый local dev plugin

## 12. Что ещё не внедрено

На текущий момент **не внедрено**, только обсуждено или оставлено на потом:

- client-specific typography modes
- более точная калибровка `Layout` значений по реальным макетам
- возможное уточнение mapping для `Stack/tight`, `Stack/group` и `Grid/gutter`

Responsive typography modes уже внедрены.
