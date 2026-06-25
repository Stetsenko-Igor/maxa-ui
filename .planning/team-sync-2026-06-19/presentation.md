# maxa-ui — сценарий выступления (созвон 2026-06-19)

Аудитория: дизайн + разработка. Тон: не «смотрите что я сделал», а «вот общая
инфраструктура, давайте не делать её дважды». ~10 мин + демо.

Из 3 тем Ани две — это про нас: **обновления компонентов** и **Storybook**. С этого
и заходи.

---

## RU — что говорить

**1. Зачем (1 мин)**
Одни и те же вещи — отступы, цвета, типографика, компоненты — дизайн, код и AI
понимают по-разному. Решаем это заново на каждом экране. maxa-ui делает один общий
язык: токены + готовые React-компоненты + спеки + доки.

**2. Что уже есть (2 мин)**
- 40 React-компонентов (React + TS + Radix + токены на CSS-переменных)
- Спека на каждый компонент (`specs/components/*.md`) = контракт по API, ровно то
  что просили разработчики
- Токены в 3 слоя + dark mode + Figma-плагин импорта
- Живая витрина: https://maxa-ui.netlify.app

**3. Демо (3-4 мин)**
Витрина вживую: foundations (цвета, типографика, dark toggle), пара компонентов
(Button, Dialog/Drawer, DataTable, Toast) с Preview/Code/Copy. Подчеркни: у каждого
компонента уже есть страница = наш Storybook уже работает.

**4. Что стабильно, что меняется (2 мин)**
Отдай Stability Sheet: 🟢23 стабильны (стройте сейчас) / 🟡7 мелкие правки / 🔴10
в работе (variant glossary + MultiSelect). Прямо снимает страх «сделаем — переделают».

**5. Storybook (1 мин)**
Наша витрина = живой каталог. Вопрос в зал: сводим — кладём наши компоненты в ваш
Storybook, или витрина = общий каталог? Выбираем одно.

**6. Интеграция — мы уже посмотрели (2 мин)**
Стек подходит: токены = CSS-переменные (живут с Bootstrap), компоненты без Tailwind,
падают в `shared/ui`, FSD = постранично, ставится приватным пакетом. Один блокер
честно: React 17 (наш `useId` под 18) — чиним на нашей стороне, ~день, не редизайн.
Dark mode: у вас класс, у нас атрибут — мост в одну строку.

**7. Честно про статус (30 сек)**
Готово: 40 компонентов + токены + доки. Черновик: Basic Tokens, Component-based
Tokens. Code Connect — только если апнут Figma до Organization, не обещаю.

**8. Ask (1 мин)**
1) Стройте на 🟢 сейчас, скажите если нужен какой-то 🔴.
2) Пришлите ваш список `shared/ui` + что пилите — наложим на наши 40, уберём двойную
   работу.
3) Договоримся кто владеет API дальше.
4) Выберем пилот: один компонент или экран.

**Каверзные вопросы:**
- «Bootstrap выкидывать?» — нет, токены живут рядом.
- «Размер бандла?» — именованные импорты, тянется только нужное.
- «React 17?» — чиним до вашей интеграции.
- «Наши нестандартные пропсы?» — сверяем с вашими, не ломаем; они под реальные кейсы.

---

## EN — talk track

**1. Why (1m)** Design, code, and AI read the same things — spacing, color, type,
components — differently, and we re-solve them every screen. maxa-ui is one shared
language: tokens + approved React components + specs + docs.

**2. What exists (2m)** 40 React components (React + TS + Radix + CSS-variable
tokens); an API spec per component (`specs/components/*.md` — the contract you asked
for); 3-layer tokens + dark mode + Figma import; live showcase
https://maxa-ui.netlify.app

**3. Demo (3-4m)** Walk the showcase: foundations + dark toggle, a few components
(Button, Dialog/Drawer, DataTable, Toast) with Preview/Code/Copy. Each has a docs
page = our Storybook already running.

**4. Stable vs changing (2m)** Hand over the Stability Sheet: 🟢23 stable (build
now) / 🟡7 minor churn / 🔴10 in-flight (variant glossary + MultiSelect rebuild).
Kills the "we build it, it gets redesigned" fear.

**5. Storybook (1m)** Our docs site is the live catalog. Question for the room:
feed maxa-ui into your Storybook, or treat the docs site as the shared catalog? Pick one.

**6. Integration — we already looked (2m)** Stack fits: CSS-variable tokens coexist
with Bootstrap, no Tailwind dependency, components drop into `shared/ui`, FSD =
page-by-page, private-package install. One blocker, owned: React 17 vs our `useId`
— small fix our side (~a day), not a redesign. Dark mode: you use a class, we use a
data attribute — one-line bridge.

**7. Honest status (30s)** Production-ready: 40 components + tokens + docs. Draft:
Basic Tokens, Component-based Tokens. Code Connect depends on the Figma
Organization upgrade — promising, not confirmed.

**8. Ask (1m)** (1) Build on 🟢 now, flag any 🔴 you need. (2) Send your `shared/ui`
list + what's in active dev → we map onto our 40, kill double work. (3) Agree API
ownership. (4) Pick a pilot — one component or one screen.

**Likely questions:** Drop Bootstrap? — no, tokens coexist. Bundle size? — named
imports, only what you use. React 17? — fixed before you integrate. Your non-standard
props? — we reconcile, not overwrite.
