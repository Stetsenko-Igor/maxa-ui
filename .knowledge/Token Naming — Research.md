# Token Naming — Research & Decisions

> **Статус:** ✅ Исследование завершено (апрель 2026)  
> **Цель:** Выбрать лучшее именование семантических токенов для MAXA Design System

---

## Сравнение топовых дизайн-систем

### shadcn / Radix UI
- **Паттерн:** плоские имена — `background`, `foreground`, `card`, `muted`, `destructive`
- **Плюсы:** просто, читаемо для разработчика
- **Минусы:** слишком абстрактно — `muted`, `accent` не говорят WHERE использовать. AI агент не поймёт контекст применения.
- **Суффиксы:** `-foreground` (текст поверх), `-muted` (приглушённый)
- **Статусные:** `destructive` (для danger)

### GitHub Primer
- **Паттерн:** `{property}-{role}-{emphasis}` — например `bgColor-danger-emphasis`, `fgColor-success-muted`
- **Плюсы:** максимально самодокументируемо — идеально для AI агентов
- **Минусы:** длинно (`bgColor` лишний — группа уже задаёт контекст)
- **Суффиксы:** `-muted` (слабый тинт), `-emphasis` (насыщенный)
- **Статусные:** `danger`, `success`, `attention`, `done`, `open`, `closed`

### Atlassian Design System
- **Паттерн:** `color.text`, `color.bg`, `color.border` + модификаторы
- **Плюсы:** `color.text-subtle` — очень чётко
- **Минусы:** точечная нотация (`color.text.success`) плохо ложится в CSS variables

### Material Design 3
- **Паттерн:** `surface`, `on-surface`, `primary-container`, `on-error`
- **Плюсы:** паттерн `on-*` гениален — всегда есть пара фон/текст
- **Минусы:** непривычно для web-разработчиков, нет прямого маппинга на Tailwind

### Untitled UI (PRO VARIABLES v8.0)
- **Коллекции:** `_Primitives` (343), `1. Color modes` (273), `2. Radius`, `3. Spacing`, `4. Widths`, `5. Containers`, `6. Typography`
- **Группы в Color modes:** Text (21), Border (8), Foreground (19), Background (28), Effects, Component colors
- **Component colors:** Alpha (alpha-white-10...100, alpha-black-10...100), Utility (utility-neutral-50...900, utility-brand-50...)
- **Суффиксы:** `solid` (полностью непрозрачный, для filled бейджей/кнопок), `primary/secondary/tertiary` для уровней
- **НЕ используют:** `-subtle` (это Radix/shadcn), `-muted` (это GitHub Primer)

---

## Ключевые инсайты

### Что НЕ делать
- ❌ `-subtle` как единственный вариант (смешение Radix и Untitled UI)
- ❌ `content-` вместо `text-` (менее интуитивно для разработчиков и AI)
- ❌ `bg/overlay` со слэшом — только тире `bg-overlay`
- ❌ Копировать Tailwind-first структуру (Shadcn делает это потому что они Tailwind-first; MAXA — Design System-first)
- ❌ Хранить Tailwind цвета в отдельной коллекции — они просто часть палитры примитивов

### Что ДЕЛАТЬ
- ✅ `text-` prefix — ближе к CSS `color:`, понятнее AI агенту чем `content-`
- ✅ `primary / secondary / tertiary` — для нейтральных уровней (Untitled UI стандарт)
- ✅ `-subtle` — для слабого тинта (Radix, широко известен среди разработчиков)
- ✅ `-solid` — для насыщенного заливного цвета (Untitled UI — кнопки, бейджи)
- ✅ Никаких `-alt`, `_alt` — добавляют путаницу
- ✅ Каждый токен должен читаться как документация — `bg-error-subtle` сразу говорит: фон, ошибка, слабый тинт

### Почему `-subtle` и `-solid` вместе — правильно
| Суффикс | Значение | Пример использования |
|---------|----------|---------------------|
| `-subtle` | Слабый цветной тинт (обычно 50-100 из палитры) | Banner фон, hover подсветка |
| *(нет суффикса)* | Основной цвет | Текст, иконки |
| `-solid` | Полная заливка насыщенным цветом | Filled badge, filled кнопка |

### Почему Tailwind цвета НЕ в отдельной коллекции
Shadcn делает отдельную "TailwindCSS" коллекцию потому что они **Tailwind-first** — их система буквально зеркало всех Tailwind значений. MAXA — **Design System-first**, Tailwind это просто инструмент рендера. Tailwind цвета — просто часть палитры примитивов, не отдельный слой.

---

## Источники
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- [GitHub Primer Color Overview](https://primer.style/foundations/color/overview/)
- [Atlassian Design Tokens](https://atlassian.design/foundations/design-tokens/)
- [Material Design 3 Color Roles](https://m3.material.io/styles/color/roles)
- Untitled UI PRO VARIABLES v8.0 — скриншоты Figma Variables (апрель 2026)
