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

**Файлы:** `packages/tokens/figma/`

| Коллекция | Моды | Файлы |
|-----------|------|-------|
| Breakpoints | Value | `breakpoints.json` |
| Primitives | Value | `primitives.json` |
| Spacing | Value | `spacing.json` |
| Radius | Value | `radius.json` |
| Color modes | Light / Dark | `colors-semantic-light.json`, `colors-semantic-dark.json` |
| Typography | Desktop / Tablet / Mobile | `typography.json`, `typography-tablet.json`, `typography-mobile.json` |
| Layout | Desktop / Tablet / Mobile | `layout-desktop/tablet/mobile.json` |

**Формат:** W3C DTCG — `{"$value": 72, "$type": "number"}`  
**Manifest:** `manifest.json` — связывает коллекции/моды с файлами

**Breakpoints:**

| Token | Value |
|-------|-------|
| mobile | 375px |
| tablet | 768px |
| laptop | 1024px |
| desktop | 1280px |
| wide | 1440px |
| ultra | 1680px |
| max | 1920px |

**Layout methodology:**

- `Primitives -> Spacing -> Layout`
- `Spacing` = universal semantic spacing aliases
- `Layout` = designer-facing usage layer
- group-based naming in Figma:
  - `Stack/*`
  - `Inline/*`
  - `Container/*`
  - `Grid/*`

**Layout токены (responsive, current agreed working state):**

| Token | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
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

---

## Текущее состояние в Figma

✅ Коллекция **Breakpoints** — 1 мод, viewport references  
✅ Коллекция **Primitives** — colors + spacing primitives  
✅ Коллекция **Spacing** — semantic spacing aliases  
✅ Коллекция **Radius** — radius scale  
✅ Коллекция **Color modes** — Light / Dark semantic colors  
✅ Коллекция **Typography** — 3 мода (Desktop/Tablet/Mobile), font-size + line-height + font-weight + font-family  
✅ Коллекция **Layout** — 3 мода (Desktop/Tablet/Mobile), grouped designer-facing layout variables  

✅ Связи aliases между `Primitives`, `Spacing`, `Color modes` и `Layout` настроены через import files  

---

## Следующие шаги

### Шаг 1 — Калибровка Layout на реальных макетах

Текущие значения `Layout` приняты как рабочая стартовая версия.

Следующий практический шаг:
- пройтись по реальным макетам
- проверить `Stack/tight`, `Stack/group`, `Grid/gutter`
- при необходимости скорректировать alias mapping, не ломая саму архитектуру

### Шаг 2 — Тест: применить Variables в компоненте
Взять один компонент (кнопка или инпут) и связать со всеми переменными. Проверить что responsive modes работают.

### Шаг 3 — Документация для разработчиков
Обновить `docs/figma-token-component-reference.md` с полной картой CSS → Figma Variables.

---

## Инструменты

| Инструмент | Назначение |
|------------|-----------|
| **Microsoft Variables Import** (Figma plugin) | Импорт JSON в Variables с модами |
| **MAXA Token Importer v5** | Локальный dev plugin, может загрузить свежий `import-bundle.json` из GitHub Raw |
| **Token Studio** | ❌ Free plan не поддерживает Variables+Modes (Pro only) |
| Tailwind v4 `@theme {}` | CSS токены становятся utilities автоматически |

---

## Принципы (зафиксированные в процессе)

- **Всегда стандартизировать** — не копировать то что есть в Figma как есть, использовать лучший отраслевой стандарт
- **Font-weight в Figma** — строки (`"Regular"`, `"SemiBold"`), в CSS — числа (400, 600)
- **Примитивный spacing** — абсолютные значения; `Spacing` — semantic aliases; `Layout` — designer-facing usage layer
- **Layout naming** — только через grouped path names (`Stack/*`, `Inline/*`, `Container/*`, `Grid/*`), чтобы Figma сохранял рабочие группы
- **Grid/margin** и **Container/padding** — разные по смыслу токены, даже если временно совпадают по значению
- **Brand surface foreground** — использовать `text/on-brand` поверх `bg/brand-solid`, не белый текст по умолчанию
- **Figma import workflow** — после push в `main` можно обновить plugin через `Load latest from GitHub`, без copy-paste из `import-bundle.json`
- **Типографика** — размерное именование (Untitled UI), не HTML (не h1/h2/p)
