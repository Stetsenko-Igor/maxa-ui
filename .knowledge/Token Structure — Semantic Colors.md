# Token Structure — Semantic Colors

> **Статус:** ✅ Согласовано (апрель 2026)  
> **Применяется в:** `packages/tokens/figma/colors-semantic-light.json` + `colors-semantic-dark.json`  
> **Figma коллекция:** `Colors / Semantic` — моды Light / Dark

---

## Принципы именования

- Группы: `text-`, `bg-`, `border-`, `action-`
- Уровни нейтральных: `primary`, `secondary`, `tertiary`
- Тинт статусных bg: `-subtle` (слабый, 50-100 из палитры)
- Заливка статусных bg: `-solid` (насыщенный, 500 из палитры)
- **Дефолтное состояние — без суффикса** (`action-primary`, не `action-primary-default`)
- Состояния: `-hover`, `-active` (active покрывает и pressed, и selected)
- Subtle состояния: `-subtle`, `-subtle-hover`, `-subtle-active`
- Только тире, никаких слэшей или точек
- Имя = документация: `action-primary-subtle-hover` → action, primary тип, subtle вариант, hover состояние

> ⚠️ **О суффиксе default/normal:** решено не добавлять сейчас. Если в Figma окажется неудобно читать без явного дефолтного суффикса — добавить `-default` позже. CSS системы (Radix, shadcn, GitHub Primer) не используют суффикс для дефолтного состояния.

---

## Text

| Токен | Light | Dark | Применение |
|-------|-------|------|------------|
| `text-primary` | neutral-800 `#444445` | neutral-100 | Заголовки, основной текст |
| `text-secondary` | neutral-600 `#8C8C8E` | neutral-400 | Подписи, вторичный текст |
| `text-tertiary` | neutral-500 `#A1A1A4` | neutral-500 | Placeholder, hints |
| `text-disabled` | neutral-400 `#D7D5D5` | neutral-700 | Disabled состояния |
| `text-inverse` | white | neutral-900 | Текст на тёмном фоне |
| `text-brand` | brand-600 | brand-400 | Брендовые акценты |
| `text-success` | green-600 | green-400 | Success сообщения |
| `text-warning` | yellow-600 | yellow-400 | Warning сообщения |
| `text-error` | red-600 | red-400 | Error сообщения |
| `text-info` | blue-600 | blue-400 | Info сообщения |

## Background

| Токен | Light | Dark | Применение |
|-------|-------|------|------------|
| `bg-primary` | neutral-50 `#F5F6FA` | neutral-950 | Фон страницы |
| `bg-secondary` | neutral-25 `#FCFCFC` | neutral-900 | Карточки, панели |
| `bg-tertiary` | neutral-100 `#F4F3F3` | neutral-800 | Вложенные секции |
| `bg-disabled` | neutral-100 | neutral-800 | Disabled поля |
| `bg-overlay` | alpha-black-50 | alpha-black-70 | Оверлей модалок |
| `bg-inverse` | neutral-950 `#1B1A1A` | neutral-950 | Инвертированные секции (навбар и др.) |
| `bg-brand-subtle` | brand-50 | brand-950 | Лёгкий brand тинт |
| `bg-brand` | brand-100 | brand-900 | Brand фон секции, карточки |
| `bg-brand-solid` | brand-500 `#31e5c2` | brand-500 | Filled brand бейджи |
| `bg-success-subtle` | green-50 | green-950 | Success banner фон |
| `bg-success-solid` | green-500 | green-500 | Success badge |
| `bg-warning-subtle` | yellow-50 | yellow-950 | Warning banner фон |
| `bg-warning-solid` | yellow-500 | yellow-500 | Warning badge |
| `bg-error-subtle` | red-50 | red-950 | Error banner фон |
| `bg-error-solid` | red-500 | red-500 | Error badge |
| `bg-info-subtle` | blue-50 | blue-950 | Info banner фон |
| `bg-info-solid` | blue-500 | blue-500 | Info badge |

## Border

| Токен | Light | Dark | Применение |
|-------|-------|------|------------|
| `border-primary` | neutral-300 `#E4E4E4` | neutral-700 | Основные рамки |
| `border-secondary` | neutral-400 `#D7D5D5` | neutral-800 | Тонкие делители |
| `border-disabled` | neutral-200 | neutral-800 | Disabled поля |
| `border-focus` | blue-500 | blue-400 | Focus ring |
| `border-brand` | brand-500 | brand-400 | Brand outlined элементы |
| `border-error` | red-500 | red-400 | Error поля |

## Action

Паттерн: 6 типов × 6 состояний = **36 токенов**

```
action-{type}                  ← дефолт (без суффикса)
action-{type}-hover
action-{type}-active           ← покрывает pressed + selected

action-{type}-subtle           ← лёгкий тинт, дефолт
action-{type}-subtle-hover
action-{type}-subtle-active
```

| Тип | Цвет | Solid применение | Subtle применение |
|-----|------|-----------------|------------------|
| `primary` | blue | Primary кнопки, ссылки | Row hover/selected, активный item |
| `brand` | teal | Brand кнопки | Brand hover area |
| `positive` | green | Success кнопки | Success row, active filter |
| `negative` | red | Danger кнопки | Error row, delete confirm |
| `warning` | yellow | Warning кнопки | Warning row |
| `neutral` | neutral | Secondary кнопки | Нейтральный hover |

### Action / Primary (blue)

| Токен | Light | Dark |
|-------|-------|------|
| `action-primary` | blue-500 `#0576DA` | blue-400 |
| `action-primary-hover` | blue-600 `#0464BE` | blue-300 |
| `action-primary-active` | blue-700 `#0353A0` | blue-200 |
| `action-primary-subtle` | blue-50 | blue-950 |
| `action-primary-subtle-hover` | blue-50 | blue-950 |
| `action-primary-subtle-active` | blue-100 | blue-900 |

### Action / Brand (teal)

| Токен | Light | Dark |
|-------|-------|------|
| `action-brand` | brand-500 `#31e5c2` | brand-500 |
| `action-brand-hover` | brand-600 `#15cba8` | brand-400 |
| `action-brand-active` | brand-700 | brand-300 |
| `action-brand-subtle` | brand-50 | brand-950 |
| `action-brand-subtle-hover` | brand-50 | brand-950 |
| `action-brand-subtle-active` | brand-100 | brand-900 |

### Action / Positive, Negative, Warning, Neutral
Тот же паттерн — green/red/yellow/neutral шкалы соответственно.

---

## Что убрано из старой системы (Color Semantic в Figma)

| Убрано | Причина |
|--------|---------|
| `Action/Inverted` | Стиль кнопки, не цвет — компонентный уровень |
| `Action/Ghost` | Стиль кнопки — компонентный уровень |
| `Action/Outline` | Стиль кнопки — компонентный уровень |
| `Action/Reverse Inverted` | Стиль кнопки — компонентный уровень |
| `selected` состояние | = `active` визуально, `active` покрывает оба случая |
| `bg-nav` | Компонентный токен → заменён на `bg-inverse` |
| `interactive-*` группа | Переименована в `action-*` (точнее и понятнее) |

---

## Primitives структура (Colors / Primitives коллекция)

```
Colors/
  Base/          → white, black, transparent
  Neutral/       → 25, 50–950 (= Tailwind neutral, главная серая шкала)
  Alpha/
    white/       → alpha-white-10 … alpha-white-100
    black/       → alpha-black-10 … alpha-black-100
  Brand/         → 50–950 (#31e5c2 = 500, #15cba8 = 600)

  Tailwind palette (neutral не повторяется):
  Slate, Gray, Zinc, Stone,
  Red, Orange, Amber, Yellow, Lime, Green,
  Emerald, Teal, Cyan, Sky, Blue, Indigo,
  Violet, Purple, Fuchsia, Pink, Rose
```

### Neutral scale (= Tailwind neutral)
| Stop | Hex | В системе |
|------|-----|-----------|
| 25 | `#FCFCFC` | bg-secondary |
| 50 | `#F5F6FA` | bg-primary |
| 100 | `#F4F3F3` | bg-tertiary, bg-disabled |
| 200 | `#E9EAEF` | — |
| 300 | `#E4E4E4` | border-primary |
| 400 | `#D7D5D5` | border-secondary |
| 500 | `#A1A1A4` | text-tertiary |
| 600 | `#8C8C8E` | text-secondary |
| 700 | `#6B6B6D` | — |
| 800 | `#444445` | text-primary |
| 900 | `#2A2A2B` | — |
| 950 | `#1B1A1A` | bg-inverse |

### Brand scale
| Stop | Hex | В системе |
|------|-----|-----------|
| 50 | `#f0fdfb` | bg-brand-subtle, action-brand-subtle |
| 100 | `#ccfbf4` | bg-brand |
| 500 | `#31e5c2` | bg-brand-solid, action-brand |
| 600 | `#15cba8` | action-brand-hover, text-brand (light) |
| 950 | `#053d34` | bg-brand-subtle (dark) |

---

## Архитектурные решения

**Tailwind не в отдельной коллекции** — MAXA Design System-first, не Tailwind-first.  
**Tailwind neutral не дублируется** — наш `Neutral` = Tailwind neutral.  
**`bg-nav` убран из семантики** — компонентный токен, навбар использует `bg-inverse`.  
**`action-` вместо `interactive-`** — точнее описывает назначение токена.
