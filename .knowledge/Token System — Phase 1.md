# Token System — Phase 1: Foundation Variables

> **Статус:** ✅ Завершено (апрель 2026)  
> **Репозиторий:** `AI/Design System` → `packages/tokens/`  
> **Figma файл:** Foundation Variables (beta) — `fGGIAUszvDV6QYHh0xXI7H`

---

## Что сделано

### 1. `@maxa/tokens` пакет (CSS + TypeScript)

Трёхслойная архитектура CSS токенов (`@theme {}` → Tailwind v4):

| Файл | Содержимое |
|------|-----------|
| `src/primitives.css` | Цвета-примитивы (палитра) |
| `src/themes/maxa.css` | Brand-цвета |
| `src/semantic.css` | Семантические цвета (surface, text, border…) |
| `src/dimensions.css` | Spacing (1–32), border-radius, width |
| `src/typography.css` | Font-family, font-size + line-height пары, font-weight |
| `src/theme.css` | Главный импорт всех файлов |

**Именование типографики** — стандарт Untitled UI (размерное, не HTML):
- `text-xs` / `text-sm` / `text-md` / `text-lg` / `text-xl`
- `text-display-xs` → `text-display-2xl`

**Font-weight токены:** `regular` (400) / `medium` (500) / `semibold` (600) / `bold` (700)

**Tailwind v4 double-dash синтаксис:**
```css
--text-display-2xl: 72px;
--text-display-2xl--line-height: 90px;
```

### 2. Figma Variables — импортировано через Microsoft Variables Import plugin

**Файлы:** `packages/tokens/figma/` (8 файлов)

| Коллекция | Моды | Файлы |
|-----------|------|-------|
| Breakpoints | Value | `breakpoints.json` |
| Typography | Desktop / Tablet / Mobile | `typography-desktop/tablet/mobile.json` |
| Layout | Desktop / Tablet / Mobile | `layout-desktop/tablet/mobile.json` |

**Формат:** W3C DTCG — `{"$value": 72, "$type": "number"}`  
**Manifest:** `manifest.json` — связывает коллекции/моды с файлами

**Breakpoints:**

| Token | Value |
|-------|-------|
| sm | 375px |
| md | 768px |
| lg | 1280px |
| xl | 1440px |
| 2xl | 1920px |

**Layout токены (responsive):**

| Token | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| outer-margin | 32 | 24 | 16 |
| section-gap | 80 | 64 | 48 |
| component-gap | 24 | 20 | 16 |
| grid.columns | 12 | 8 | 4 |
| grid.gutter | 24 | 16 | 12 |
| grid.margin | 32 | 24 | 16 |

---

## Текущее состояние в Figma

✅ Коллекция **Breakpoints** — 1 мод, 5 переменных  
✅ Коллекция **Typography** — 3 мода (Desktop/Tablet/Mobile), font-size + line-height + font-weight + font-family  
✅ Коллекция **Layout** — 3 мода (Desktop/Tablet/Mobile), layout + grid переменные  

❌ **Цвета** — ещё не импортированы в Variables  
❌ **Семантические токены** — ещё не импортированы  
❌ **Связи между коллекциями** (aliases) — не настроены  

---

## Следующие шаги

### Шаг 1 — Цвета в Figma Variables
Структура и именование согласованы — см. [[Token Structure — Semantic Colors]] и [[Token Naming — Research]].

Создать JSON файлы для импорта:
- `colors-primitives.json` — Base + Neutral + Alpha + Brand + полный Tailwind спектр (21 семейство × 11 стопов)
- `colors-semantic-light.json` — ~45 токенов, Light мод
- `colors-semantic-dark.json` — те же токены, Dark мод

> ⚠️ **Именования:**
> - Brand: `brand-500` (НЕ `brand-teal-500`) — без цвета в названии
> - Semantic: только тире — `bg-error-subtle`, `text-primary` (НЕ `bg/error/subtle`)
> - Tailwind `neutral` не дублируется — он = наш `Neutral` в primitives

Добавить в `manifest.json` новую коллекцию `Colors`.

### Шаг 2 — Связи (aliases)
После импорта всех коллекций настроить в Figma:
- Semantic токены → ссылаются на Primitive токены
- Typography styles → используют Typography Variables
- Компоненты → используют Semantic Variables

### Шаг 3 — Тест: применить Variables в компоненте
Взять один компонент (кнопка или инпут) и связать со всеми переменными. Проверить что responsive modes работают.

### Шаг 4 — Документация для разработчиков
Обновить `docs/figma-token-component-reference.md` с полной картой CSS → Figma Variables.

---

## Инструменты

| Инструмент | Назначение |
|------------|-----------|
| **Microsoft Variables Import** (Figma plugin) | Импорт JSON в Variables с модами |
| **Token Studio** | ❌ Free plan не поддерживает Variables+Modes (Pro only) |
| Tailwind v4 `@theme {}` | CSS токены становятся utilities автоматически |

---

## Принципы (зафиксированные в процессе)

- **Всегда стандартизировать** — не копировать то что есть в Figma как есть, использовать лучший отраслевой стандарт
- **Font-weight в Figma** — строки (`"Regular"`, `"SemiBold"`), в CSS — числа (400, 600)
- **Примитивный spacing** — абсолютные значения (--spacing-*); Layout токены — семантические и mode-зависимые
- **Типографика** — размерное именование (Untitled UI), не HTML (не h1/h2/p)
