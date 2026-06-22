# Token Reference — Master CSS Variable Index

<!-- AUTO-GENERATED FILE — DO NOT EDIT BY HAND. -->
<!-- Regenerate with: node scripts/generate-tokens-reference.mjs -->

Complete index of every CSS variable in the design system, generated
from `packages/tokens/src`. Values shown are light mode; tokens with a
`[data-theme="dark"]` override carry a `dark:` note. For usage rules,
see the foundation specs in `specs/foundations/` and component specs
in `specs/components/`.

Total tokens: 1633

## Primitives

Source: `packages/tokens/src/primitives.css`

```css
/* ── Base — Figma: Colors/Base/* ── */
--color-base-white: #ffffff;
--color-base-black: #000000;
--color-transparent: transparent;
--color-white: var(--color-base-white);
--color-black: var(--color-base-black);

/* ── Gray — Figma: Colors/Neutral/25..950 ── */
--color-neutral-0: var(--color-base-white);
--color-neutral-25: #F8F8F8;
--color-neutral-50: #F5F6FA;
--color-neutral-100: #F4F3F3;
--color-neutral-200: #E9EAEF;
--color-neutral-300: #E4E4E4;
--color-neutral-400: #D7D5D5;
--color-neutral-500: #A1A1A4;
--color-neutral-600: #8C8C8E;
--color-neutral-700: #6B6B6D;
--color-neutral-800: #444445;
--color-neutral-900: #2A2A2B;
--color-neutral-950: #1B1A1A;
--color-neutral-975: #161616;
--color-neutral-1000: #0D0D0D;

/* ── Status palettes — Figma: Colors/{Blue,Green,Red,Yellow,Orange}/* ── */
--color-blue-50: #E0F2FF;
--color-blue-100: #DBEAFE;
--color-blue-200: #96CEFD;
--color-blue-300: #59A7F6;
--color-blue-400: #147AF3;
--color-blue-500: #0265DC;
--color-blue-600: #0054B6;
--color-blue-700: #00408A;
--color-blue-800: #003073;
--color-blue-900: #00235C;
--color-blue-950: #001845;
--color-green-50: #f0fdf4;
--color-green-100: #dcfce7;
--color-green-200: #bbf7d0;
--color-green-300: #86efac;
--color-green-400: #4ade80;
--color-green-500: #22c55e;
--color-green-600: #16a34a;
--color-green-700: #15803d;
--color-green-800: #166534;
--color-green-900: #14532d;
--color-green-950: #052e16;
--color-red-50: #fef2f2;
--color-red-100: #fee2e2;
--color-red-200: #fecaca;
--color-red-300: #fca5a5;
--color-red-400: #f87171;
--color-red-500: #ef4444;
--color-red-600: #dc2626;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;
--color-red-900: #7f1d1d;
--color-red-950: #450a0a;
--color-yellow-50: #fefce8;
--color-yellow-100: #fef9c3;
--color-yellow-200: #fef08a;
--color-yellow-300: #fde047;
--color-yellow-400: #facc15;
--color-yellow-500: #eab308;
--color-yellow-600: #ca8a04;
--color-yellow-700: #a16207;
--color-yellow-800: #854d0e;
--color-yellow-900: #713f12;
--color-yellow-950: #422006;
--color-orange-50: #fff7ed;
--color-orange-100: #ffedd5;
--color-orange-200: #fed7aa;
--color-orange-300: #fdba74;
--color-orange-400: #fb923c;
--color-orange-500: #f97316;
--color-orange-600: #ea580c;
--color-orange-700: #c2410c;
--color-orange-800: #9a3412;
--color-orange-900: #7c2d12;
--color-orange-950: #431407;

/* ── Extended decorative palette — Tailwind v4 defaults ── */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
--color-gray-950: #030712;
--color-amber-50: #fffbeb;
--color-amber-100: #fef3c7;
--color-amber-200: #fde68a;
--color-amber-300: #fcd34d;
--color-amber-400: #fbbf24;
--color-amber-500: #f59e0b;
--color-amber-600: #d97706;
--color-amber-700: #b45309;
--color-amber-800: #92400e;
--color-amber-900: #78350f;
--color-amber-950: #451a03;
--color-lime-50: #f7fee7;
--color-lime-100: #ecfccb;
--color-lime-200: #d9f99d;
--color-lime-300: #bef264;
--color-lime-400: #a3e635;
--color-lime-500: #84cc16;
--color-lime-600: #65a30d;
--color-lime-700: #4d7c0f;
--color-lime-800: #3f6212;
--color-lime-900: #365314;
--color-lime-950: #1a2e05;
--color-sky-50: #f0f9ff;
--color-sky-100: #e0f2fe;
--color-sky-200: #bae6fd;
--color-sky-300: #7dd3fc;
--color-sky-400: #38bdf8;
--color-sky-500: #0ea5e9;
--color-sky-600: #0284c7;
--color-sky-700: #0369a1;
--color-sky-800: #075985;
--color-sky-900: #0c4a6e;
--color-sky-950: #082f49;
--color-indigo-50: #eef2ff;
--color-indigo-100: #e0e7ff;
--color-indigo-200: #c7d2fe;
--color-indigo-300: #a5b4fc;
--color-indigo-400: #818cf8;
--color-indigo-500: #6366f1;
--color-indigo-600: #4f46e5;
--color-indigo-700: #4338ca;
--color-indigo-800: #3730a3;
--color-indigo-900: #312e81;
--color-indigo-950: #1e1b4b;
--color-rose-50: #fff1f2;
--color-rose-100: #ffe4e6;
--color-rose-200: #fecdd3;
--color-rose-300: #fda4af;
--color-rose-400: #fb7185;
--color-rose-500: #f43f5e;
--color-rose-600: #e11d48;
--color-rose-700: #be123c;
--color-rose-800: #9f1239;
--color-rose-900: #881337;
--color-rose-950: #4c0519;
--color-pink-50: #fdf2f8;
--color-pink-100: #fce7f3;
--color-pink-200: #fbcfe8;
--color-pink-300: #f9a8d4;
--color-pink-400: #f472b6;
--color-pink-500: #ec4899;
--color-pink-600: #db2777;
--color-pink-700: #be185d;
--color-pink-800: #9d174d;
--color-pink-900: #831843;
--color-pink-950: #500724;
--color-fuchsia-50: #fdf4ff;
--color-fuchsia-100: #fae8ff;
--color-fuchsia-200: #f5d0fe;
--color-fuchsia-300: #f0abfc;
--color-fuchsia-400: #e879f9;
--color-fuchsia-500: #d946ef;
--color-fuchsia-600: #c026d3;
--color-fuchsia-700: #a21caf;
--color-fuchsia-800: #86198f;
--color-fuchsia-900: #701a75;
--color-fuchsia-950: #4a044e;
--color-purple-50: #faf5ff;
--color-purple-100: #f3e8ff;
--color-purple-200: #e9d5ff;
--color-purple-300: #d8b4fe;
--color-purple-400: #c084fc;
--color-purple-500: #a855f7;
--color-purple-600: #9333ea;
--color-purple-700: #7e22ce;
--color-purple-800: #6b21a8;
--color-purple-900: #581c87;
--color-purple-950: #3b0764;
--color-violet-50: #f5f3ff;
--color-violet-100: #ede9fe;
--color-violet-200: #ddd6fe;
--color-violet-300: #c4b5fd;
--color-violet-400: #a78bfa;
--color-violet-500: #8b5cf6;
--color-violet-600: #7c3aed;
--color-violet-700: #6d28d9;
--color-violet-800: #5b21b6;
--color-violet-900: #4c1d95;
--color-violet-950: #2e1065;
--color-teal-50: #f0fdfa;
--color-teal-100: #ccfbf1;
--color-teal-200: #99f6e4;
--color-teal-300: #5eead4;
--color-teal-400: #2dd4bf;
--color-teal-500: #14b8a6;
--color-teal-600: #0d9488;
--color-teal-700: #0f766e;
--color-teal-800: #115e59;
--color-teal-900: #134e4a;
--color-teal-950: #042f2e;
--color-cyan-50: #ecfeff;
--color-cyan-100: #cffafe;
--color-cyan-200: #a5f3fc;
--color-cyan-300: #67e8f9;
--color-cyan-400: #22d3ee;
--color-cyan-500: #06b6d4;
--color-cyan-600: #0891b2;
--color-cyan-700: #0e7490;
--color-cyan-800: #155e75;
--color-cyan-900: #164e63;
--color-cyan-950: #083344;
--color-emerald-50: #ecfdf5;
--color-emerald-100: #d1fae5;
--color-emerald-200: #a7f3d0;
--color-emerald-300: #6ee7b7;
--color-emerald-400: #34d399;
--color-emerald-500: #10b981;
--color-emerald-600: #059669;
--color-emerald-700: #047857;
--color-emerald-800: #065f46;
--color-emerald-900: #064e3b;
--color-emerald-950: #022c22;
```

## Brand Theme (Maxa)

Source: `packages/tokens/src/themes/maxa.css`

```css
--color-brand-50: #E9FCF8;   /* dark: #09483C */
--color-brand-100: #D2F9F2;  /* dark: #0C5A4C */
--color-brand-200: #A8F3E5;  /* dark: #107864 */
--color-brand-300: #81EED9;  /* dark: #15A287 */
--color-brand-400: #59EACE;  /* dark: #1ACCAA */
--color-brand-500: #45E7C8;  /* dark: #1DE2BC */
--color-brand-600: #31E5C2;  /* dark: #31E5C2 */
--color-brand-700: #28C6A8;  /* dark: #59DEC4 */
--color-brand-800: #2C9A85;  /* dark: #7EDAC8 */
--color-brand-900: #2C7365;  /* dark: #9FDACF */
--color-brand-950: #284F48;  /* dark: #BDDED7 */
```

## Semantic Colors

Source: `packages/tokens/src/semantic.css`

```css
/* ── Text — typography-only fill roles ── */
--color-text-primary: var(--color-neutral-950);/* dark: var(--color-neutral-100) */
--color-text-secondary: var(--color-neutral-800);/* dark: var(--color-neutral-200) */
--color-text-tertiary: var(--color-neutral-600);/* dark: var(--color-neutral-500) */
--color-text-disabled: var(--color-neutral-400);/* dark: var(--color-neutral-700) */
--color-text-inverse: var(--color-base-white);/* dark: var(--color-neutral-900) */
--color-text-on-brand: var(--color-neutral-950);/* dark: var(--color-neutral-950) */
--color-text-brand: var(--color-brand-600);/* dark: var(--color-brand-400) */
--color-text-info: var(--color-blue-600);/* dark: var(--color-blue-300) */
--color-text-success: var(--color-green-800);/* dark: var(--color-green-400) */
--color-text-error: var(--color-red-700);/* dark: var(--color-red-300) */
--color-text-warning: var(--color-orange-700);/* dark: var(--color-yellow-400) */

/* ── Foreground — icons and non-text foreground elements ── */
--color-fg-primary: var(--color-neutral-950);/* dark: var(--color-neutral-100) */
--color-fg-secondary: var(--color-neutral-800);/* dark: var(--color-neutral-200) */
--color-fg-tertiary: var(--color-neutral-600);/* dark: var(--color-neutral-500) */
--color-fg-disabled: var(--color-neutral-400);/* dark: var(--color-neutral-700) */
--color-fg-inverse: var(--color-base-white);/* dark: var(--color-neutral-900) */
--color-fg-on-brand: var(--color-neutral-950);/* dark: var(--color-neutral-950) */
--color-fg-brand: var(--color-brand-600);/* dark: var(--color-brand-400) */
--color-fg-info: var(--color-blue-600); /* dark: var(--color-blue-300) */
--color-fg-positive: var(--color-green-800);/* dark: var(--color-green-400) */
--color-fg-negative: var(--color-red-700);/* dark: var(--color-red-300) */
--color-fg-warning: var(--color-orange-700);/* dark: var(--color-yellow-400) */

/* ── Border ── */
--color-border-primary: var(--color-neutral-300);/* dark: var(--color-neutral-700) */
--color-border-secondary: var(--color-neutral-200);/* dark: var(--color-neutral-800) */
--color-border-tertiary: var(--color-neutral-100);/* dark: var(--color-neutral-900) */
--color-border-focus: var(--color-blue-500);/* dark: var(--color-blue-400) */
--color-border-brand: var(--color-brand-500);/* dark: var(--color-brand-400) */
--color-border-error: var(--color-red-500);/* dark: var(--color-red-500) */
--color-border-info-strong: var(--color-blue-700);/* dark: var(--color-blue-500) */
--color-border-info-subtle: var(--color-blue-200);
--color-border-success-strong: var(--color-green-700);/* dark: var(--color-green-500) */
--color-border-success-subtle: var(--color-green-300);
--color-border-warning-strong: var(--color-orange-600);/* dark: var(--color-orange-500) */
--color-border-warning-subtle: var(--color-orange-200);
--color-border-danger-subtle: var(--color-red-200);
--color-border-neutral-strong: var(--color-neutral-700);/* dark: var(--color-neutral-500) */
--color-border-neutral-subtle: var(--color-neutral-300);/* dark: var(--color-neutral-700) */

/* ── Background — surface elevation ── */
--color-bg-page: var(--color-neutral-50);/* #F5F6FA — gray canvas | dark: var(--color-neutral-1000) */
--color-bg-surface: var(--color-base-white);/* #FFFFFF — raised surfaces | dark: var(--color-neutral-900) */
--color-bg-float: var(--color-base-white);/* #FFFFFF — floating surfaces | dark: var(--color-neutral-800) */
--color-bg-muted: var(--color-neutral-25);/* #F8F8F8 — recessed zones | dark: var(--color-neutral-975) */
--color-bg-overlay: rgba(0, 0, 0, 0.5); /* dark: rgba(0, 0, 0, 0.7) */
--color-bg-inverse: var(--color-neutral-950);/* dark: var(--color-neutral-950) */
--color-bg-disabled: var(--color-neutral-100);/* dark: var(--color-neutral-800) */

/* ── Background — status/intent (orthogonal to elevation) ── */
--color-bg-neutral-subtle: var(--color-neutral-100);/* dark: var(--color-neutral-800) */
--color-bg-neutral-on-subtle: var(--color-neutral-200);/* dark: var(--color-neutral-700) */
--color-bg-neutral-strong: var(--color-neutral-800);/* dark: var(--color-neutral-400) */
--color-bg-brand-subtle: var(--color-brand-50);/* dark: var(--color-brand-950) */
--color-bg-brand-surface: var(--color-brand-100);/* dark: var(--color-brand-900) */
--color-bg-brand-muted: var(--color-brand-200);/* dark: var(--color-brand-800) */
--color-bg-brand-strong: var(--color-brand-500);/* dark: var(--color-brand-600) */
--color-bg-info-subtle: var(--color-blue-50);/* dark: var(--color-blue-950) */
--color-bg-info-surface: var(--color-blue-50);/* dark: var(--color-blue-950) */
--color-bg-info-strong: var(--color-blue-700);/* dark: var(--color-blue-500) */
--color-bg-success-subtle: var(--color-green-50);/* dark: var(--color-green-950) */
--color-bg-success-surface: var(--color-green-50);/* dark: var(--color-green-950) */
--color-bg-success-strong: var(--color-green-700);/* dark: var(--color-green-500) */
--color-bg-error-subtle: var(--color-red-50);/* dark: var(--color-red-950) */
--color-bg-error-surface: var(--color-red-50);/* dark: var(--color-red-950) */
--color-bg-error-strong: var(--color-red-700);/* dark: var(--color-red-500) */
--color-bg-warning-subtle: var(--color-orange-50);/* dark: var(--color-yellow-950) */
--color-bg-warning-surface: var(--color-orange-50);/* dark: var(--color-yellow-950) */
--color-bg-warning-strong: var(--color-orange-600);/* dark: var(--color-orange-500) */

/* ── Background — status/intent muted (medium emphasis: badge/tag) ── */
--color-bg-neutral-muted: var(--color-neutral-200);/* dark: var(--color-neutral-700) */
--color-bg-info-muted: var(--color-blue-100);/* dark: var(--color-blue-900) */
--color-bg-success-muted: var(--color-green-100);/* dark: var(--color-green-900) */
--color-bg-warning-muted: var(--color-orange-100);/* dark: var(--color-orange-900) */
--color-bg-error-muted: var(--color-red-100);/* dark: var(--color-red-900) */

/* ── Action — interactive element backgrounds ── */
--color-action-primary: var(--color-blue-500);/* dark: var(--color-blue-300) */
--color-action-primary-hover: var(--color-blue-600);/* dark: var(--color-blue-200) */
--color-action-primary-active: var(--color-blue-700);/* dark: var(--color-blue-100) */
--color-action-primary-subtle: var(--color-blue-50);/* dark: var(--color-blue-950) */
--color-action-primary-subtle-hover: var(--color-blue-50);/* dark: var(--color-blue-950) */
--color-action-primary-subtle-active: var(--color-blue-200);/* dark: var(--color-blue-900) */
--color-action-neutral: var(--color-neutral-300);/* dark: var(--color-neutral-800) */
--color-action-neutral-hover: var(--color-neutral-400);/* dark: var(--color-neutral-700) */
--color-action-neutral-active: var(--color-neutral-500);/* dark: var(--color-neutral-700) */
--color-action-neutral-subtle: var(--color-neutral-100);/* dark: var(--color-neutral-900) */
--color-action-neutral-subtle-hover: var(--color-neutral-200);/* dark: var(--color-neutral-800) */
--color-action-neutral-subtle-active: var(--color-neutral-300);/* dark: var(--color-neutral-800) */
--color-action-brand: var(--color-brand-500);/* dark: var(--color-brand-600) */
--color-action-brand-hover: var(--color-brand-600);/* dark: var(--color-brand-500) */
--color-action-brand-active: var(--color-brand-700);/* dark: var(--color-brand-400) */
--color-action-brand-subtle: var(--color-brand-50);/* dark: var(--color-brand-950) */
--color-action-brand-subtle-hover: var(--color-brand-50);/* dark: var(--color-brand-950) */
--color-action-brand-subtle-active: var(--color-brand-200);/* dark: var(--color-brand-900) */
--color-action-positive: var(--color-green-700);/* dark: var(--color-green-400) */
--color-action-positive-hover: var(--color-green-800);/* dark: var(--color-green-300) */
--color-action-positive-active: var(--color-green-900);/* dark: var(--color-green-200) */
--color-action-positive-subtle: var(--color-green-50);/* dark: var(--color-green-950) */
--color-action-positive-subtle-hover: var(--color-green-50);/* dark: var(--color-green-950) */
--color-action-positive-subtle-active: var(--color-green-100);/* dark: var(--color-green-900) */
--color-action-negative: var(--color-red-600);/* dark: var(--color-red-400) */
--color-action-negative-hover: var(--color-red-700);/* dark: var(--color-red-300) */
--color-action-negative-active: var(--color-red-800);/* dark: var(--color-red-200) */
--color-action-negative-subtle: var(--color-red-50);/* dark: var(--color-red-950) */
--color-action-negative-subtle-hover: var(--color-red-50);/* dark: var(--color-red-950) */
--color-action-negative-subtle-active: var(--color-red-100);/* dark: var(--color-red-900) */
--color-action-warning: var(--color-yellow-500);/* dark: var(--color-yellow-400) */
--color-action-warning-hover: var(--color-yellow-600);/* dark: var(--color-yellow-300) */
--color-action-warning-active: var(--color-yellow-700);/* dark: var(--color-yellow-200) */
--color-action-warning-subtle: var(--color-yellow-50);/* dark: var(--color-yellow-950) */
--color-action-warning-subtle-hover: var(--color-yellow-50);/* dark: var(--color-yellow-950) */
--color-action-warning-subtle-active: var(--color-yellow-100);/* dark: var(--color-yellow-900) */
--color-border-default: var(--color-border-primary);/* dark: var(--color-border-primary) */
--color-border-brand-strong: var(--color-border-brand);/* dark: var(--color-border-brand) */
--color-border-error-strong: var(--color-border-error);/* dark: var(--color-border-error) */

/* ── Non-semantic appearance palette — light ── */
--color-bg-gray-subtle: var(--color-gray-50);/* dark: var(--color-gray-950) */
--color-bg-gray-muted: var(--color-gray-100);/* dark: var(--color-gray-900) */
--color-bg-gray-strong: var(--color-gray-700);
--color-text-gray: var(--color-gray-900);/* dark: var(--color-gray-300) */
--color-bg-red-subtle: var(--color-red-50);/* dark: var(--color-red-950) */
--color-bg-red-muted: var(--color-red-100);/* dark: var(--color-red-900) */
--color-bg-red-strong: var(--color-red-700);
--color-text-red: var(--color-red-900); /* dark: var(--color-red-300) */
--color-bg-orange-subtle: var(--color-orange-50);/* dark: var(--color-orange-950) */
--color-bg-orange-muted: var(--color-orange-100);/* dark: var(--color-orange-900) */
--color-bg-orange-strong: var(--color-orange-700);
--color-text-orange: var(--color-orange-900);/* dark: var(--color-orange-300) */
--color-bg-amber-subtle: var(--color-amber-50);/* dark: var(--color-amber-950) */
--color-bg-amber-muted: var(--color-amber-100);/* dark: var(--color-amber-900) */
--color-bg-amber-strong: var(--color-amber-700);
--color-text-amber: var(--color-amber-900);/* dark: var(--color-amber-300) */
--color-bg-yellow-subtle: var(--color-yellow-50);/* dark: var(--color-yellow-950) */
--color-bg-yellow-muted: var(--color-yellow-100);/* dark: var(--color-yellow-900) */
--color-bg-yellow-strong: var(--color-yellow-700);
--color-text-yellow: var(--color-yellow-900);/* dark: var(--color-yellow-300) */
--color-bg-lime-subtle: var(--color-lime-50);/* dark: var(--color-lime-950) */
--color-bg-lime-muted: var(--color-lime-100);/* dark: var(--color-lime-900) */
--color-bg-lime-strong: var(--color-lime-700);
--color-text-lime: var(--color-lime-900);/* dark: var(--color-lime-300) */
--color-bg-green-subtle: var(--color-green-50);/* dark: var(--color-green-950) */
--color-bg-green-muted: var(--color-green-100);/* dark: var(--color-green-900) */
--color-bg-green-strong: var(--color-green-700);
--color-text-green: var(--color-green-900);/* dark: var(--color-green-300) */
--color-bg-emerald-subtle: var(--color-emerald-50);/* dark: var(--color-emerald-950) */
--color-bg-emerald-muted: var(--color-emerald-100);/* dark: var(--color-emerald-900) */
--color-bg-emerald-strong: var(--color-emerald-700);
--color-text-emerald: var(--color-emerald-900);/* dark: var(--color-emerald-300) */
--color-bg-teal-subtle: var(--color-teal-50);/* dark: var(--color-teal-950) */
--color-bg-teal-muted: var(--color-teal-100);/* dark: var(--color-teal-900) */
--color-bg-teal-strong: var(--color-teal-700);
--color-text-teal: var(--color-teal-900);/* dark: var(--color-teal-300) */
--color-bg-cyan-subtle: var(--color-cyan-50);/* dark: var(--color-cyan-950) */
--color-bg-cyan-muted: var(--color-cyan-100);/* dark: var(--color-cyan-900) */
--color-bg-cyan-strong: var(--color-cyan-700);
--color-text-cyan: var(--color-cyan-900);/* dark: var(--color-cyan-300) */
--color-bg-sky-subtle: var(--color-sky-50);/* dark: var(--color-sky-950) */
--color-bg-sky-muted: var(--color-sky-100);/* dark: var(--color-sky-900) */
--color-bg-sky-strong: var(--color-sky-700);
--color-text-sky: var(--color-sky-900); /* dark: var(--color-sky-300) */
--color-bg-blue-subtle: var(--color-blue-50);/* dark: var(--color-blue-950) */
--color-bg-blue-muted: var(--color-blue-100);/* dark: var(--color-blue-900) */
--color-bg-blue-strong: var(--color-blue-700);
--color-text-blue: var(--color-blue-900);/* dark: var(--color-blue-300) */
--color-bg-indigo-subtle: var(--color-indigo-50);/* dark: var(--color-indigo-950) */
--color-bg-indigo-muted: var(--color-indigo-100);/* dark: var(--color-indigo-900) */
--color-bg-indigo-strong: var(--color-indigo-700);
--color-text-indigo: var(--color-indigo-900);/* dark: var(--color-indigo-300) */
--color-bg-violet-subtle: var(--color-violet-50);/* dark: var(--color-violet-950) */
--color-bg-violet-muted: var(--color-violet-100);/* dark: var(--color-violet-900) */
--color-bg-violet-strong: var(--color-violet-700);
--color-text-violet: var(--color-violet-900);/* dark: var(--color-violet-300) */
--color-bg-purple-subtle: var(--color-purple-50);/* dark: var(--color-purple-950) */
--color-bg-purple-muted: var(--color-purple-100);/* dark: var(--color-purple-900) */
--color-bg-purple-strong: var(--color-purple-700);
--color-text-purple: var(--color-purple-900);/* dark: var(--color-purple-300) */
--color-bg-fuchsia-subtle: var(--color-fuchsia-50);/* dark: var(--color-fuchsia-950) */
--color-bg-fuchsia-muted: var(--color-fuchsia-100);/* dark: var(--color-fuchsia-900) */
--color-bg-fuchsia-strong: var(--color-fuchsia-700);
--color-text-fuchsia: var(--color-fuchsia-900);/* dark: var(--color-fuchsia-300) */
--color-bg-pink-subtle: var(--color-pink-50);/* dark: var(--color-pink-950) */
--color-bg-pink-muted: var(--color-pink-100);/* dark: var(--color-pink-900) */
--color-bg-pink-strong: var(--color-pink-700);
--color-text-pink: var(--color-pink-900);/* dark: var(--color-pink-300) */
--color-bg-rose-subtle: var(--color-rose-50);/* dark: var(--color-rose-950) */
--color-bg-rose-muted: var(--color-rose-100);/* dark: var(--color-rose-900) */
--color-bg-rose-strong: var(--color-rose-700);
--color-text-rose: var(--color-rose-900);/* dark: var(--color-rose-300) */
```

## Dimensions (Spacing, Radius, Z-index, Breakpoints)

Source: `packages/tokens/src/dimensions.css`

```css
/* ── Breakpoints ── */
--breakpoint-mobile: 375px;
--breakpoint-tablet: 768px;
--breakpoint-laptop: 1024px;
--breakpoint-desktop: 1280px;
--breakpoint-wide: 1440px;
--breakpoint-ultra: 1680px;
--breakpoint-max: 1920px;

/* ── Spacing — numeric (4px grid) ── */
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-7: 28px;
--spacing-8: 32px;
--spacing-9: 36px;
--spacing-10: 40px;
--spacing-11: 44px;
--spacing-12: 48px;
--spacing-14: 56px;
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
--spacing-32: 128px;

/* ── Spacing — semantic aliases (match Figma + spec) ── */
--spacing-none: 0px;
--spacing-xxs: 2px;
--spacing-xs: var(--spacing-1);         /* 4px */
--spacing-sm: 6px;
--spacing-md: var(--spacing-2);         /* 8px */
--spacing-lg: var(--spacing-3);         /* 12px */
--spacing-xl: var(--spacing-4);         /* 16px */
--spacing-2xl: var(--spacing-5);        /* 20px */
--spacing-3xl: var(--spacing-6);        /* 24px */
--spacing-4xl: var(--spacing-8);        /* 32px */
--spacing-5xl: var(--spacing-10);       /* 40px */
--spacing-6xl: var(--spacing-12);       /* 48px */
--spacing-7xl: var(--spacing-16);       /* 64px */
--spacing-8xl: var(--spacing-20);       /* 80px */
--spacing-9xl: var(--spacing-24);       /* 96px */
--spacing-10xl: var(--spacing-32);      /* 128px */
--spacing-11xl: 160px;

/* ── Border Radius ── */
--radius-none: 0px;
--radius-xxs: 2px;
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 10px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-3xl: 20px;
--radius-4xl: 24px;
--radius-full: 9999px;

/* ── Width — border widths ── */
--width-1: 1px;
--width-2: 2px;
--width-4: 4px;

/* ── Interaction — minimum touch-target hit area ── */
--touch-target-size: 44px;

/* ── Motion — durations + easings ── */
--duration-instant: 50ms;
--duration-fast: 100ms;
--duration-base: 150ms;
--duration-slow: 250ms;
--duration-slower: 400ms;
--easing-standard: cubic-bezier(0.2, 0, 0, 1);
--easing-emphasized: cubic-bezier(0.3, 0, 0, 1);
--easing-decelerate: cubic-bezier(0, 0, 0, 1);

/* ── Z-index scale — stacking order for overlays ── */
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-overlay: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
--z-toast: 1700;

/* ── Opacity scale ── */
--opacity-disabled: 0.5;
--opacity-muted: 0.65;
--opacity-backdrop: 0.4;

/* ── Blur ── */
--blur-sm: 4px;
--blur-md: 8px;
--blur-lg: 16px;
```

## Typography

Source: `packages/tokens/src/typography.css`

```css
/* ── Font families ── */
--font-body: "Montserrat", ui-sans-serif, system-ui, sans-serif;
--font-mono: ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

/* ── Font sizes + line-heights ── */
--text-heading-2xl: 40px;
--text-heading-xl: 32px;
--text-heading-lg: 26px;
--text-heading-md: 22px;
--text-heading-sm: 18px;
--text-heading-xs: 16px;
--text-lg: 16px;
--text-md: 14px;
--text-sm: 12px;
--text-caption-sm: 10px;
--text-caption-xs: 8px;

/* ── Font weights ── */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--text-heading-2xl--line-height: 48px;
--text-heading-xl--line-height: 40px;
--text-heading-lg--line-height: 34px;
--text-heading-md--line-height: 30px;
--text-heading-sm--line-height: 26px;
--text-heading-xs--line-height: 24px;
--text-lg--line-height: 24px;
--text-md--line-height: 20px;
--text-sm--line-height: 18px;
--text-caption-sm--line-height: 16px;
--text-caption-xs--line-height: 12px;
```

## Shadows

Source: `packages/tokens/src/shadows.css`

```css
/* ── Shadow scale — light mode ── */
--shadow-xs: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);/* dark: 0px 1px 2px 0px rgba(0, 0, 0, 0.20) */
--shadow-sm: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px -1px rgba(0, 0, 0, 0.10);/* dark: 0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 1px 2px -1px rgba(0, 0, 0, 0.30) */
--shadow-md: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(0, 0, 0, 0.06);/* dark: 0px 4px 6px -1px rgba(0, 0, 0, 0.30), 0px 2px 4px -2px rgba(0, 0, 0, 0.20) */
--shadow-lg: 0px 12px 16px -4px rgba(0, 0, 0, 0.08), 0px 4px 6px -2px rgba(0, 0, 0, 0.03), 0px 2px 2px -1px rgba(0, 0, 0, 0.04);/* dark: 0px 12px 16px -4px rgba(0, 0, 0, 0.25), 0px 4px 6px -2px rgba(0, 0, 0, 0.15), 0px 2px 2px -1px rgba(0, 0, 0, 0.15) */
--shadow-xl: 0px 20px 24px -4px rgba(0, 0, 0, 0.08), 0px 8px 8px -4px rgba(0, 0, 0, 0.03), 0px 3px 3px -1.5px rgba(0, 0, 0, 0.04);/* dark: 0px 20px 24px -4px rgba(0, 0, 0, 0.25), 0px 8px 8px -4px rgba(0, 0, 0, 0.15), 0px 3px 3px -1.5px rgba(0, 0, 0, 0.15) */
--shadow-2xl: 0px 24px 48px -12px rgba(0, 0, 0, 0.18), 0px 4px 4px -2px rgba(0, 0, 0, 0.04);/* dark: 0px 24px 48px -12px rgba(0, 0, 0, 0.40), 0px 4px 4px -2px rgba(0, 0, 0, 0.15) */
--shadow-3xl: 0px 32px 64px -12px rgba(0, 0, 0, 0.14), 0px 5px 5px -2.5px rgba(0, 0, 0, 0.04);/* dark: 0px 32px 64px -12px rgba(0, 0, 0, 0.35), 0px 5px 5px -2.5px rgba(0, 0, 0, 0.15) */
```

## Button Component Tokens

Source: `packages/tokens/src/component-button.css`

```css
/* ── Variants ── */
--button-primary-bg: var(--color-action-primary);
--button-primary-bg-hover: var(--color-action-primary-hover);
--button-primary-bg-active: var(--color-action-primary-active);
--button-primary-text: var(--color-text-inverse);
--button-primary-border: var(--color-action-primary);
--button-primary-border-hover: var(--color-action-primary-hover);
--button-primary-border-focus: var(--color-border-focus);
--button-secondary-bg: var(--color-action-neutral);
--button-secondary-bg-hover: var(--color-action-neutral-hover);
--button-secondary-bg-active: var(--color-action-neutral-active);
--button-secondary-text: var(--color-text-primary);
--button-secondary-border: var(--color-action-neutral);
--button-secondary-border-hover: var(--color-action-neutral-hover);
--button-secondary-border-focus: var(--color-border-focus);
--button-outline-bg: var(--color-bg-surface);
--button-outline-bg-hover: var(--color-action-neutral-subtle-hover);
--button-outline-bg-active: var(--color-action-neutral-subtle-active);
--button-outline-text: var(--color-text-primary);
--button-outline-border: var(--color-border-primary);
--button-outline-border-hover: var(--color-border-secondary);
--button-outline-border-focus: var(--color-border-focus);
--button-ghost-bg: transparent;
--button-ghost-bg-hover: var(--color-action-neutral-subtle-hover);
--button-ghost-bg-active: var(--color-action-neutral-subtle-active);
--button-ghost-text: var(--color-text-secondary);
--button-ghost-border: transparent;
--button-ghost-border-hover: transparent;
--button-ghost-border-focus: var(--color-border-focus);
--button-link-bg: transparent;
--button-link-bg-hover: transparent;
--button-link-bg-active: transparent;
--button-link-text: var(--color-action-primary);
--button-link-text-hover: var(--color-action-primary-hover);
--button-link-text-active: var(--color-action-primary-active);
--button-link-border: transparent;
--button-link-border-hover: transparent;
--button-link-border-focus: var(--color-border-focus);
--button-success-bg: var(--color-action-positive);
--button-success-bg-hover: var(--color-action-positive-hover);
--button-success-bg-active: var(--color-action-positive-active);
--button-success-text: var(--color-text-inverse);
--button-success-border: var(--color-action-positive);
--button-success-border-hover: var(--color-action-positive-hover);
--button-success-border-focus: var(--color-border-focus);
--button-danger-bg: var(--color-action-negative);
--button-danger-bg-hover: var(--color-action-negative-hover);
--button-danger-bg-active: var(--color-action-negative-active);
--button-danger-text: var(--color-text-inverse);
--button-danger-border: var(--color-action-negative);
--button-danger-border-hover: var(--color-action-negative-hover);
--button-danger-border-focus: var(--color-border-focus);

/* ── Sizes ── */
--button-size-xs-height: 24px;
--button-size-xs-padding-x: 6px;
--button-size-xs-gap: 2px;
--button-size-xs-radius: var(--radius-xs);
--button-size-xs-text: var(--text-sm);
--button-size-xs-line-height: 14px;
--button-size-xs-weight: var(--font-weight-medium);
--button-size-xs-icon-size: 12px;
--button-size-sm-height: 28px;
--button-size-sm-padding-x: 10px;
--button-size-sm-gap: 4px;
--button-size-sm-radius: var(--radius-xs);
--button-size-sm-text: var(--text-sm);
--button-size-sm-line-height: 14px;
--button-size-sm-weight: var(--font-weight-semibold);
--button-size-sm-icon-size: 16px;
--button-size-md-height: 36px;
--button-size-md-padding-x: 16px;
--button-size-md-gap: 6px;
--button-size-md-radius: var(--radius-xs);
--button-size-md-text: var(--text-sm);
--button-size-md-line-height: 14px;
--button-size-md-weight: var(--font-weight-semibold);
--button-size-md-icon-size: 16px;
--button-size-lg-height: 48px;
--button-size-lg-padding-x: 24px;
--button-size-lg-gap: 8px;
--button-size-lg-radius: var(--radius-sm);
--button-size-lg-text: var(--text-md);
--button-size-lg-line-height: 20px;
--button-size-lg-weight: var(--font-weight-semibold);
--button-size-lg-icon-size: 20px;

/* ── Icon-only square sizes ── */
--button-icon-only-xs-size: 24px;
--button-icon-only-sm-size: 28px;
--button-icon-only-md-size: 36px;
--button-icon-only-lg-size: 48px;

/* ── Shared ── */
--button-disabled-opacity: 0.5;
--button-font-family: var(--font-body);
```

## Checkbox Component Tokens

Source: `packages/tokens/src/component-checkbox.css`

```css
/* ── Field layout ── */
--checkbox-label-gap: 8px;
--checkbox-content-gap: 4px;
--checkbox-row-gap: 8px;
--checkbox-text-padding-y: 3px;

/* ── Size: md only ── */
--checkbox-size-md: 20px;
--checkbox-radius: var(--radius-xs);
--checkbox-border-width: 1px;
--checkbox-focus-ring-width: 3.75px;
--checkbox-focus-ring-inner-width: 1.25px;
--checkbox-focus-ring-offset: 0;
--checkbox-mark-width-md: 10px;
--checkbox-mark-height-md: 8px;
--checkbox-dash-height: 1.75px;
--checkbox-dash-radius: 1px;

/* ── Colors — default state ── */
--checkbox-bg: var(--color-bg-surface);
--checkbox-border: #a1a1a4;
--checkbox-border-hover: #c9c9c9;
--checkbox-border-focus: #0b73cb;
--checkbox-focus-ring-inner-color: var(--color-bg-surface);
--checkbox-mark-color: #ffffff;

/* ── Colors — checked / indeterminate ── */
--checkbox-bg-checked: #2d2d2e;
--checkbox-bg-checked-hover: #5e5e5f;
--checkbox-border-checked: #2d2d2e;
--checkbox-border-checked-hover: #5e5e5f;

/* ── Colors — error ── */
--checkbox-border-error: var(--color-border-error);
--checkbox-bg-error-checked: #2d2d2e;

/* ── Colors — disabled ── */
--checkbox-bg-disabled: transparent;
--checkbox-bg-disabled-checked: #c9c9c9;
--checkbox-border-disabled: #c9c9c9;
--checkbox-mark-disabled: #ffffff;

/* ── Label / helper ── */
--checkbox-font-family: var(--font-body);
--checkbox-top-label-text: var(--color-text-primary);
--checkbox-top-label-disabled: var(--color-text-disabled);
--checkbox-side-label-text: var(--color-text-primary);
--checkbox-description-text: var(--color-text-secondary);
--checkbox-text-disabled: var(--color-text-disabled);
--checkbox-helper-error: var(--color-text-error);
--checkbox-label-font-size: var(--text-sm);
--checkbox-label-line-height: 14px;
--checkbox-label-font-weight: var(--font-weight-medium);
--checkbox-top-label-font-weight: var(--font-weight-semibold);
--checkbox-description-font-size: var(--text-caption-sm);
--checkbox-description-line-height: 16px;
--checkbox-description-font-weight: var(--font-weight-medium);
```

## Input Component Tokens

Source: `packages/tokens/src/component-input.css`

```css
/* ── Default state ── */
--input-bg: var(--color-bg-surface);
--input-text: var(--color-text-primary);
--input-placeholder: var(--color-text-tertiary);
--input-border: var(--color-border-primary);
--input-border-hover: var(--color-border-secondary);
--input-border-focus: var(--color-border-focus);
--input-focus-ring: var(--color-action-primary);
--input-focus-ring-offset: 1px;
--input-focus-ring-width: 3px;
--input-filled-text: var(--color-text-primary);

/* ── Status: error ── */
--input-error-border: var(--color-border-error);
--input-error-border-focus: var(--color-border-error);
--input-error-hint: var(--color-text-error);
--input-error-text: var(--color-text-error);

/* ── Status: success ── */
--input-success-border: var(--color-border-success-strong);
--input-success-border-focus: var(--color-border-success-strong);
--input-success-hint: var(--color-text-success);

/* ── Disabled ── */
--input-disabled-bg: var(--color-bg-disabled);
--input-disabled-text: var(--color-text-tertiary);
--input-disabled-placeholder: var(--color-text-secondary);
--input-disabled-opacity: 1;

/* ── Not editable ── */
--input-readonly-bg: var(--color-bg-muted);
--input-readonly-text: var(--color-text-secondary);

/* ── Label / hint ── */
--input-label-text: var(--color-text-secondary);
--input-hint-text: var(--color-text-tertiary);
--input-label-gap: var(--spacing-xs);

/* ── Sizes ── */
--input-size-sm-height: 28px;
--input-size-sm-padding-x: 10px;
--input-size-sm-text: var(--text-sm);
--input-size-sm-radius: var(--radius-xs);
--input-size-sm-gap: 4px;
--input-size-md-height: 36px;
--input-size-md-padding-x: 12px;
--input-size-md-text: var(--text-sm);
--input-size-md-radius: var(--radius-xs);
--input-size-md-gap: 6px;
--input-size-lg-height: 48px;
--input-size-lg-padding-x: 16px;
--input-size-lg-text: var(--text-md);
--input-size-lg-radius: var(--radius-sm);
--input-size-lg-gap: 8px;

/* ── Icon sizes ── */
--input-icon-sm-size: 14px;
--input-icon-md-size: 16px;
--input-icon-lg-size: 20px;

/* ── Text area ── */
--input-textarea-sm-min-height: 88px;
--input-textarea-md-min-height: 108px;
--input-textarea-lg-min-height: 128px;
--input-textarea-padding-y: 10px;
--input-textarea-line-height: 14px;

/* ── Shared ── */
--input-font-family: var(--font-body);
--input-font-weight: var(--font-weight-regular);
--input-label-font-weight: var(--font-weight-semibold);
```

## File Input Component Tokens

Source: `packages/tokens/src/component-file-input.css`

```css
/* ── Shared ── */
--file-input-font-family: var(--font-body);
--file-input-row-gap: var(--spacing-2); /* label row ↔ input row */
--file-input-label-gap: var(--spacing-1);/* label ↔ info icon */

/* ── Label ── */
--file-input-label-text: var(--color-text-secondary);
--file-input-label-font-size: var(--text-sm);
--file-input-label-line-height: var(--text-sm--line-height);
--file-input-label-font-weight: var(--font-weight-semibold);
--file-input-required-text: var(--color-text-error);
--file-input-info-color: var(--color-text-tertiary);

/* ── Button ("Choose File") ── */
--file-input-button-bg: var(--color-action-primary);
--file-input-button-bg-hover: var(--color-action-primary-hover);
--file-input-button-bg-active: var(--color-action-primary-active);
--file-input-button-bg-disabled: var(--color-bg-disabled);
--file-input-button-text: var(--color-text-inverse);
--file-input-button-text-disabled: var(--color-text-disabled);

/* ── Field (file-name display) ── */
--file-input-field-bg: var(--color-bg-surface);
--file-input-field-bg-disabled: var(--color-bg-disabled);
--file-input-field-border: var(--color-border-primary);
--file-input-field-border-hover: var(--color-border-secondary);
--file-input-field-border-focus: var(--color-border-focus);
--file-input-field-border-error: var(--color-border-error);
--file-input-field-border-disabled: var(--color-border-tertiary);
--file-input-placeholder-text: var(--color-text-tertiary);
--file-input-filename-text: var(--color-text-primary);
--file-input-field-text-disabled: var(--color-text-disabled);
--file-input-lock-color: var(--color-text-tertiary);
--file-input-clear-color: var(--color-text-tertiary);
--file-input-clear-color-hover: var(--color-text-secondary);

/* ── Focus ring ── */
--file-input-focus-ring: var(--color-action-primary);
--file-input-focus-ring-width: 3px;
--file-input-focus-ring-offset: 1px;

/* ── Error message ── */
--file-input-error-text: var(--color-text-error);
--file-input-error-font-size: var(--text-sm);
--file-input-error-line-height: var(--text-sm--line-height);

/* ── Sizes (mirror Input/Button heights for form alignment) ── */
--file-input-sm-height: 28px;
--file-input-sm-field-padding-x: 10px;
--file-input-sm-button-padding-x: 8px;
--file-input-sm-gap: 6px;
--file-input-sm-radius: var(--radius-xs);
--file-input-sm-text: var(--text-sm);
--file-input-sm-icon: 14px;
--file-input-md-height: 36px;
--file-input-md-field-padding-x: 12px;
--file-input-md-button-padding-x: 14px;
--file-input-md-gap: 8px;
--file-input-md-radius: var(--radius-xs);
--file-input-md-text: var(--text-sm);
--file-input-md-icon: 16px;
--file-input-lg-height: 48px;
--file-input-lg-field-padding-x: 16px;
--file-input-lg-button-padding-x: 16px;
--file-input-lg-gap: 8px;
--file-input-lg-radius: var(--radius-sm);
--file-input-lg-text: var(--text-md);
--file-input-lg-icon: 18px;
```

## Avatar Component Tokens

Source: `packages/tokens/src/component-avatar.css`

```css
/* ── Defaults ── */
--avatar-size: var(--avatar-size-md);
--avatar-bg: var(--color-bg-blue-strong);/* dark: var(--color-bg-blue-strong) */
--avatar-text: var(--color-neutral-0);  /* dark: var(--color-neutral-0) */
--avatar-border: color-mix(in srgb, var(--avatar-bg) 80%, var(--color-bg-surface));/* dark: color-mix(in srgb, var(--avatar-bg) 80%, var(--color-bg-page)) */
--avatar-border-width: 0;
--avatar-radius: var(--radius-full);
--avatar-radius-square: var(--radius-md);

/* ── Typography ── */
--avatar-font-family: var(--font-body);
--avatar-font-weight: var(--font-weight-semibold);
--avatar-font-size: var(--avatar-font-size-md);
--avatar-line-height: var(--avatar-line-height-md);

/* ── Sizes ── */
--avatar-size-xs: 24px;
--avatar-size-sm: 32px;
--avatar-size-md: 40px;
--avatar-size-lg: 48px;
--avatar-size-xl: 64px;
--avatar-font-size-xs: var(--text-caption-sm);
--avatar-font-size-sm: var(--text-sm);
--avatar-font-size-md: var(--text-md);
--avatar-font-size-lg: var(--text-lg);
--avatar-font-size-xl: var(--text-heading-xs);
--avatar-line-height-xs: var(--text-caption-sm--line-height);
--avatar-line-height-sm: var(--text-sm--line-height);
--avatar-line-height-md: var(--text-md--line-height);
--avatar-line-height-lg: var(--text-lg--line-height);
--avatar-line-height-xl: var(--text-heading-xs--line-height);

/* ── Status ── */
--avatar-status-size: var(--avatar-status-size-md);
--avatar-status-size-xs: 6px;
--avatar-status-size-sm: 8px;
--avatar-status-size-md: 10px;
--avatar-status-size-lg: 12px;
--avatar-status-size-xl: 14px;
--avatar-status-offset: 0px;
--avatar-status-border: var(--color-bg-surface);/* dark: var(--color-bg-page) */
--avatar-status-border-width: 2px;
--avatar-status-bg: var(--avatar-status-offline);
--avatar-status-online: var(--color-bg-success-strong);
--avatar-status-offline: var(--color-bg-neutral-strong);
--avatar-status-busy: var(--color-bg-error-strong);
--avatar-status-away: var(--color-bg-warning-strong);

/* ── Group ── */
--avatar-group-overlap: 10px;
--avatar-group-ring: var(--color-bg-surface);/* dark: var(--color-bg-page) */
--avatar-group-ring-width: 2px;
```

## Spinner Component Tokens

Source: `packages/tokens/src/component-spinner.css`

```css
--spinner-color: var(--spinner-primary-color);/* dark: var(--spinner-primary-color) */
--spinner-track-color: var(--color-border-secondary);/* dark: var(--color-border-secondary) */
--spinner-white-color: var(--color-neutral-0);
--spinner-white-track-color: color-mix(in srgb, var(--color-neutral-0) 45%, transparent);
--spinner-primary-color: var(--color-action-primary);/* dark: var(--color-action-primary) */
--spinner-greyscale-color: var(--color-fg-secondary);/* dark: var(--color-fg-secondary) */
--spinner-inverted-color: var(--color-text-primary);
--spinner-inverted-track-color: var(--color-border-secondary);
--spinner-stroke-width: 2px;
--spinner-duration: 0.7s;
--spinner-size-sm: 16px;
--spinner-size-md: 20px;
--spinner-size-lg: 28px;
```

## Skeleton Component Tokens

Source: `packages/tokens/src/component-skeleton.css`

```css
--skeleton-bg: var(--color-bg-neutral-subtle);/* dark: var(--color-bg-neutral-subtle) */
--skeleton-highlight: var(--color-bg-surface);/* dark: var(--color-bg-muted) */
--skeleton-radius: var(--radius-sm);
--skeleton-text-height: 14px;
--skeleton-duration: 1.4s;
```

## Progress Component Tokens

Source: `packages/tokens/src/component-progress.css`

```css
--progress-bg: var(--color-bg-muted);   /* dark: var(--color-bg-neutral-subtle) */
--progress-radius: var(--radius-full);
--progress-height-sm: 6px;
--progress-height-md: 8px;
--progress-fill-brand: var(--color-action-primary);
--progress-fill-success: var(--color-action-positive);
--progress-fill-warning: var(--color-action-warning);
--progress-fill-error: var(--color-action-negative);
--progress-label-color: var(--color-text-secondary);
--progress-value-color: var(--color-text-primary);
--progress-font-size: var(--text-sm);
--progress-font-weight: var(--font-weight-medium);
```

## Slider Component Tokens

Source: `packages/tokens/src/component-slider.css`

```css
--slider-width: 100%;
--slider-track-height: 6px;
--slider-track-radius: var(--radius-full);
--slider-track-bg: var(--color-bg-neutral-subtle);/* dark: var(--color-bg-neutral-subtle) */
--slider-range-bg: var(--color-action-primary);
--slider-thumb-size: 20px;
--slider-thumb-hit-area: var(--touch-target-size);
--slider-thumb-bg: var(--color-bg-surface);/* dark: var(--color-bg-page) */
--slider-thumb-border: var(--color-action-primary);/* dark: var(--color-action-primary) */
--slider-thumb-border-width: 2px;
--slider-thumb-shadow: var(--shadow-sm);
--slider-thumb-shadow-hover: var(--shadow-md);
--slider-disabled-opacity: 0.5;
--slider-label-color: var(--color-text-primary);
--slider-value-color: var(--color-text-secondary);
--slider-mark-color: var(--color-text-tertiary);
--slider-mark-font-size: var(--text-caption-sm);
--slider-meta-font-size: var(--text-sm);
--slider-meta-font-weight: var(--font-weight-medium);
```

## Tabs Component Tokens

Source: `packages/tokens/src/component-tabs.css`

```css
--tabs-list-bg: var(--color-bg-surface);
--tabs-list-border: var(--color-border-secondary);
--tabs-list-radius: var(--radius-sm);
--tabs-trigger-bg: var(--color-action-neutral-subtle);/* dark: var(--color-action-neutral-subtle) */
--tabs-trigger-bg-hover: var(--color-action-neutral-subtle-hover);/* dark: var(--color-action-neutral-subtle-hover) */
--tabs-trigger-bg-active: var(--color-bg-neutral-strong);/* dark: var(--color-bg-neutral-strong) */
--tabs-trigger-text: var(--color-text-secondary);
--tabs-trigger-text-hover: var(--color-text-primary);/* dark: var(--color-text-primary) */
--tabs-trigger-text-active: var(--color-text-inverse);/* dark: var(--color-text-inverse) */
--tabs-trigger-border: var(--color-border-secondary);
--tabs-trigger-border-width: 1px;
--tabs-trigger-border-active: var(--color-bg-neutral-strong);/* dark: var(--color-bg-neutral-strong) */
--tabs-trigger-radius: var(--radius-sm);
--tabs-trigger-height: 38px;
--tabs-trigger-padding-x: var(--spacing-5);
--tabs-trigger-gap: var(--spacing-2);
--tabs-trigger-font-size: var(--text-sm);
--tabs-trigger-font-weight: var(--font-weight-medium);
```

## Segmented Control Component Tokens

Source: `packages/tokens/src/component-segmented-control.css`

```css
--segmented-control-bg: var(--color-bg-muted);/* dark: var(--color-bg-muted) */
--segmented-control-border: var(--color-border-secondary);
--segmented-control-radius: var(--radius-md);
--segmented-control-padding: var(--spacing-1);
--segmented-control-gap: var(--spacing-1);
--segmented-control-item-bg: transparent;
--segmented-control-item-bg-hover: var(--color-action-neutral-subtle-hover);
--segmented-control-item-bg-active: var(--color-bg-neutral-strong);/* dark: var(--color-bg-neutral-strong) */
--segmented-control-item-text: var(--color-text-secondary);
--segmented-control-item-text-active: var(--color-text-inverse);/* dark: var(--color-text-inverse) */
--segmented-control-item-radius: var(--radius-sm);
--segmented-control-item-height: var(--spacing-9);
--segmented-control-item-padding-x: var(--spacing-4);
--segmented-control-item-font-size: var(--text-sm);
--segmented-control-item-font-weight: var(--font-weight-medium);
```

## Table Component Tokens

Source: `packages/tokens/src/component-table.css`

```css
--table-bg: var(--color-bg-surface);
--table-border: var(--color-border-secondary);
--table-radius: var(--radius-md);
--table-min-width: 720px;
--table-text: var(--color-text-primary);
--table-font-family: var(--font-body);
--table-font-size: var(--text-sm);
--table-line-height: var(--text-sm--line-height);
--table-header-bg: var(--color-bg-muted);/* dark: var(--color-bg-muted) */
--table-header-text: var(--color-text-primary);
--table-header-font-size: var(--text-sm);
--table-header-line-height: var(--text-sm--line-height);
--table-header-font-weight: var(--font-weight-semibold);
--table-header-height: 40px;
--table-header-padding-x: var(--spacing-3);
--table-header-padding-y: var(--spacing-2);
--table-head-gap: var(--spacing-1);
--table-sort-icon: var(--color-fg-tertiary);
--table-sort-icon-size: 14px;
--table-sort-icon-font-size: var(--text-caption-sm);
--table-checkbox-cell-width: 44px;
--table-checkbox-control-size: 20px;
--table-row-height-sm: 40px;
--table-row-height: 40px;
--table-row-height-lg: 64px;
--table-row-bg-hover: var(--color-action-neutral-subtle-hover);
--table-row-bg-selected: var(--color-action-primary-subtle);/* dark: var(--color-action-primary-subtle) */
--table-row-bg-selected-hover: var(--color-action-primary-subtle-hover);/* dark: var(--color-action-primary-subtle-hover) */
--table-row-bg-subdued: var(--color-bg-muted);/* dark: var(--color-bg-muted) */
--table-cell-bg: var(--color-bg-surface);
--table-cell-text: var(--color-text-primary);
--table-cell-font-weight: var(--font-weight-medium);
--table-cell-title-font-weight: var(--font-weight-semibold);
--table-cell-subtitle-text: var(--color-text-tertiary);
--table-cell-subtitle-font-size: var(--text-caption-sm);
--table-cell-subtitle-line-height: var(--text-caption-sm--line-height);
--table-cell-subtitle-font-weight: var(--font-weight-regular);
--table-cell-numeric-font-weight: var(--font-weight-medium);
--table-cell-link-text: var(--color-action-primary);
--table-cell-link-font-weight: var(--font-weight-semibold);
--table-cell-content-gap: var(--spacing-2);
--table-cell-icon-size: 16px;
--table-cell-stack-gap: var(--spacing-1);
--table-cell-padding-x: var(--spacing-3);
--table-cell-padding-y-sm: var(--spacing-2);
--table-cell-padding-y: var(--spacing-2);
--table-cell-padding-y-lg: var(--spacing-4);
--table-row-actions-gap: var(--spacing-1);
--table-row-action-size: 28px;
--table-row-action-icon-size: 16px;
--table-row-action-radius: 3px;
--table-row-action-bg: var(--color-bg-surface);
--table-row-action-bg-hover: var(--color-action-neutral-subtle-hover);
--table-row-action-bg-active: var(--color-action-neutral-subtle-active);
--table-row-action-bg-disabled: var(--color-bg-surface);
--table-row-action-border: var(--color-border-primary);
--table-row-action-border-hover: var(--color-border-primary);
--table-row-action-border-active: var(--color-border-primary);
--table-row-action-text: var(--color-fg-secondary);
--table-row-action-text-hover: var(--color-fg-primary);
--table-row-action-text-active: var(--color-fg-primary);
--table-row-action-text-disabled: var(--color-text-disabled);
--table-thumbnail-size: 40px;
--table-thumbnail-radius: var(--radius-sm);
--table-thumbnail-bg: var(--color-bg-muted);
--table-thumbnail-accent: var(--color-action-primary-subtle);
--table-thumbnail-muted: var(--color-bg-surface);
--table-loader-height: 16px;
--table-loader-min-width: 96px;
--table-loader-radius: var(--radius-sm);
--table-loader-bg: var(--color-bg-neutral-subtle);
--table-footer-bg: var(--color-bg-muted);
--table-footer-text: var(--color-text-primary);
--table-footer-font-weight: var(--font-weight-semibold);
--table-caption-text: var(--color-text-tertiary);
--table-caption-font-size: var(--text-caption-sm);
--table-caption-line-height: var(--text-caption-sm--line-height);
--table-caption-font-weight: var(--font-weight-medium);
--table-caption-padding-y: var(--spacing-1);
```

## Breadcrumb Component Tokens

Source: `packages/tokens/src/component-breadcrumb.css`

```css
--breadcrumb-gap: var(--spacing-2);
--breadcrumb-text: var(--color-text-secondary);
--breadcrumb-text-hover: var(--color-text-primary);
--breadcrumb-current-text: var(--color-text-primary);
--breadcrumb-separator: var(--color-fg-tertiary);
--breadcrumb-ellipsis-bg-hover: var(--color-action-neutral-subtle-hover);
--breadcrumb-ellipsis-bg-active: var(--color-action-neutral-subtle-active);
--breadcrumb-ellipsis-radius: var(--radius-xs);
--breadcrumb-ellipsis-size: 28px;
--breadcrumb-font-size: var(--text-sm);
--breadcrumb-font-weight: var(--font-weight-medium);
```

## Pagination Component Tokens

Source: `packages/tokens/src/component-pagination.css`

```css
--pagination-gap: var(--spacing-1);
--pagination-item-size: 32px;
--pagination-item-padding-x: var(--spacing-3);
--pagination-item-radius: var(--radius-sm);
--pagination-item-bg: transparent;
--pagination-item-bg-hover: var(--color-action-neutral-subtle-hover);
--pagination-item-bg-active: var(--color-action-primary-subtle);
--pagination-item-text: var(--color-text-secondary);
--pagination-item-text-active: var(--color-action-primary);
--pagination-item-border: transparent;
--pagination-item-border-active: var(--color-border-focus);
--pagination-font-size: var(--text-sm);
--pagination-font-weight: var(--font-weight-medium);
```

## Empty Component Tokens

Source: `packages/tokens/src/component-empty.css`

```css
--empty-gap: var(--spacing-3);
--empty-padding-sm: var(--spacing-4);
--empty-padding-md: var(--spacing-6);
--empty-padding-lg: var(--spacing-8);
--empty-icon-size-sm: 32px;
--empty-icon-size-md: 40px;
--empty-icon-size-lg: 48px;
--empty-icon-glyph-size-sm: 16px;
--empty-icon-glyph-size-md: 20px;
--empty-icon-glyph-size-lg: 24px;
--empty-icon-bg: var(--color-bg-muted); /* dark: var(--color-bg-neutral-subtle) */
--empty-icon-color: var(--color-fg-tertiary);
--empty-title-color: var(--color-text-primary);
--empty-description-color: var(--color-text-secondary);
--empty-title-font-size: var(--text-md);
--empty-title-font-weight: var(--font-weight-semibold);
--empty-description-font-size: var(--text-sm);
```

## Badge Component Tokens

Source: `packages/tokens/src/component-badge.css`

```css
/* ── Defaults (neutral / low emphasis) ── */
--badge-bg: var(--color-bg-neutral-subtle);/* dark: var(--color-bg-error-strong) */
--badge-text: var(--color-gray-900);    /* dark: var(--color-base-white) */
--badge-icon: var(--color-gray-900);    /* dark: var(--color-base-white) */
--badge-border: transparent;

/* ── Shared ── */
--badge-radius: var(--radius-full);
--badge-font-family: var(--font-body);
--badge-font-weight: var(--font-weight-medium);

/* ── Sizes ── */
--badge-size-sm-height: 20px;
--badge-size-sm-padding-x: var(--spacing-sm);/* 6px */
--badge-size-sm-gap: var(--spacing-xs); /* 4px */
--badge-size-sm-font: var(--text-sm);   /* 12px */
--badge-size-sm-icon: 12px;
--badge-size-md-height: 24px;
--badge-size-md-padding-x: var(--spacing-md);/* 8px */
--badge-size-md-gap: var(--spacing-xs); /* 4px */
--badge-size-md-font: var(--text-sm);   /* 12px */
--badge-size-md-icon: 14px;
--badge-size-lg-height: 28px;
--badge-size-lg-padding-x: 10px;
--badge-size-lg-gap: var(--spacing-sm); /* 6px */
--badge-size-lg-font: var(--text-md);   /* 14px */
--badge-size-lg-icon: 16px;
```

## Tag Component Tokens

Source: `packages/tokens/src/component-tag.css`

```css
/* ── Defaults (gray / low) ── */
--tag-bg: var(--color-neutral-100);
--tag-text: var(--color-neutral-900);
--tag-icon: var(--color-neutral-900);
--tag-border: transparent;

/* ── Remove button ── */
--tag-remove-opacity: 0.65;

/* ── Shared ── */
--tag-radius: var(--radius-sm);
--tag-font-family: var(--font-body);
--tag-font-weight: var(--font-weight-medium);

/* ── Sizes ── */
--tag-size-sm-height: 20px;
--tag-size-sm-padding-x: var(--spacing-sm);/* 6px */
--tag-size-sm-gap: var(--spacing-xs);   /* 4px */
--tag-size-sm-font: var(--text-sm);     /* 12px */
--tag-size-sm-icon: 12px;
--tag-size-sm-remove: 12px;
--tag-size-md-height: 24px;
--tag-size-md-padding-x: var(--spacing-md);/* 8px */
--tag-size-md-gap: var(--spacing-xs);   /* 4px */
--tag-size-md-font: var(--text-sm);     /* 12px */
--tag-size-md-icon: 14px;
--tag-size-md-remove: 14px;
--tag-size-lg-height: 28px;
--tag-size-lg-padding-x: 10px;
--tag-size-lg-gap: var(--spacing-sm);   /* 6px */
--tag-size-lg-font: var(--text-md);     /* 14px */
--tag-size-lg-icon: 16px;
--tag-size-lg-remove: 16px;
```

## Nav Component Tokens

Source: `packages/tokens/src/component-nav.css`

```css
--nav-bg: var(--color-neutral-950);  /* always dark — never overridden in dark mode */
```

## Radio Component Tokens

Source: `packages/tokens/src/component-radio.css`

```css
/* ── Field layout ── */
--radio-label-gap: 8px;
--radio-content-gap: 4px;
--radio-row-gap: 8px;
--radio-text-padding-y: 3px;

/* ── Size: md only ── */
--radio-size-md: 20px;
--radio-dot-size-md: 8px;
--radio-border-width: 1px;
--radio-focus-ring-width: 3.75px;
--radio-focus-ring-inner-width: 1.25px;
--radio-focus-ring-offset: 0;

/* ── Colors — default state ── */
--radio-bg: var(--color-bg-surface);
--radio-border: #a1a1a4;
--radio-border-hover: #c9c9c9;
--radio-border-focus: #0b73cb;
--radio-focus-ring-inner-color: var(--color-bg-surface);

/* ── Colors — checked ── */
--radio-bg-checked: transparent;
--radio-border-checked: #0576da;
--radio-border-checked-hover: #04549b;
--radio-dot-color: #0576da;
--radio-dot-color-hover: #04549b;

/* ── Colors — error ── */
--radio-border-error: var(--color-border-error);
--radio-bg-error-checked: transparent;

/* ── Colors — disabled ── */
--radio-bg-disabled: transparent;
--radio-border-disabled: #c9c9c9;
--radio-dot-disabled: #c9c9c9;

/* ── Label / helper ── */
--radio-font-family: var(--font-body);
--radio-top-label-text: var(--color-text-primary);
--radio-top-label-disabled: var(--color-text-disabled);
--radio-side-label-text: var(--color-text-primary);
--radio-description-text: var(--color-text-secondary);
--radio-text-disabled: var(--color-text-disabled);
--radio-helper-error: var(--color-text-error);
--radio-label-font-size: var(--text-sm);
--radio-label-line-height: 14px;
--radio-label-font-weight: var(--font-weight-medium);
--radio-top-label-font-weight: var(--font-weight-semibold);
--radio-description-font-size: var(--text-caption-sm);
--radio-description-line-height: 16px;
--radio-description-font-weight: var(--font-weight-medium);
```

## Select Component Tokens

Source: `packages/tokens/src/component-select.css`

```css
--select-bg: var(--input-bg);
--select-border: var(--input-border);
--select-border-hover: var(--input-border-hover);
--select-border-focus: var(--input-border-focus);
--select-error-border: var(--input-error-border);
--select-focus-ring: var(--input-focus-ring);
--select-focus-ring-offset: var(--input-focus-ring-offset);
--select-focus-ring-width: var(--input-focus-ring-width);
--select-text: var(--input-text);
--select-placeholder: var(--input-placeholder);
--select-icon: var(--color-fg-secondary);
--select-disabled-bg: var(--input-disabled-bg);
--select-disabled-text: var(--input-disabled-text);
--select-disabled-opacity: var(--input-disabled-opacity);
--select-font-family: var(--input-font-family);
--select-font-weight: var(--input-font-weight);
--select-size-sm-height: var(--input-size-sm-height);
--select-size-sm-padding-x: var(--input-size-sm-padding-x);
--select-size-sm-gap: var(--input-size-sm-gap);
--select-size-sm-radius: var(--input-size-sm-radius);
--select-size-sm-text: var(--input-size-sm-text);
--select-size-sm-line-height: var(--text-sm--line-height);
--select-icon-sm-size: var(--input-icon-sm-size);
--select-size-md-height: var(--input-size-md-height);
--select-size-md-padding-x: var(--input-size-md-padding-x);
--select-size-md-gap: var(--input-size-md-gap);
--select-size-md-radius: var(--input-size-md-radius);
--select-size-md-text: var(--input-size-md-text);
--select-size-md-line-height: var(--text-sm--line-height);
--select-icon-md-size: var(--input-icon-md-size);
--select-size-lg-height: var(--input-size-lg-height);
--select-size-lg-padding-x: var(--input-size-lg-padding-x);
--select-size-lg-gap: var(--input-size-lg-gap);
--select-size-lg-radius: var(--input-size-lg-radius);
--select-size-lg-text: var(--input-size-lg-text);
--select-size-lg-line-height: var(--text-md--line-height);
--select-icon-lg-size: var(--input-icon-lg-size);
--select-listbox-bg: var(--dropdown-menu-bg);
--select-listbox-border: var(--dropdown-menu-border);
--select-listbox-radius: var(--dropdown-menu-radius);
--select-listbox-shadow: var(--dropdown-menu-shadow);
--select-listbox-offset: 4px;
--select-listbox-padding-y: var(--dropdown-menu-padding-y);
--select-listbox-min-width: var(--dropdown-menu-min-width);
--select-listbox-max-height: 240px;
--select-listbox-z: var(--z-popover);
--select-option-height: var(--dropdown-menu-item-height);
--select-option-padding-x: var(--dropdown-menu-item-padding-x);
--select-option-gap: var(--dropdown-menu-item-gap);
--select-option-font-size: var(--dropdown-menu-font-size);
--select-option-font-weight: var(--font-weight-medium);
--select-option-line-height: var(--dropdown-menu-line-height);
--select-option-text: var(--dropdown-menu-item-text);
--select-option-text-hover: var(--dropdown-menu-item-text-hover);
--select-option-text-selected: var(--dropdown-menu-item-text-active);
--select-option-text-disabled: var(--dropdown-menu-item-text-disabled);
--select-option-bg-hover: var(--dropdown-menu-item-bg-hover);
--select-option-bg-selected: var(--dropdown-menu-item-bg-active);
--select-option-bg-selected-hover: var(--dropdown-menu-item-bg-active);
--select-option-check: var(--color-fg-primary);
--select-option-check-size: 16px;
```

## Toggle Component Tokens

Source: `packages/tokens/src/component-toggle.css`

```css
/* ── Field layout ── */
--toggle-field-max-width: 160px;
--toggle-content-max-width: 117px;
--toggle-content-gap: 8px;
--toggle-label-gap: 8px;
--toggle-label-icon-gap: 4px;
--toggle-description-gap: 2px;
--toggle-content-padding-y: 3px;

/* ── Track ── */
--toggle-track-width: 36px;
--toggle-track-height: 20px;
--toggle-track-radius: var(--radius-full);

/* ── Thumb ── */
--toggle-thumb-size: 16px;
--toggle-thumb-inset: 2px;
--toggle-thumb-radius: var(--radius-full);

/* ── Focus ring ── */
--toggle-focus-ring-width: 3px;
--toggle-focus-ring-inner-width: 1px;
--toggle-focus-ring-offset: 0;
--toggle-focus-ring-color: var(--color-border-focus);
--toggle-focus-ring-inner-color: var(--color-bg-surface);

/* ── Colors — track ── */
--toggle-track-bg-off: #c9c9c9;
--toggle-track-bg-off-hover: #a1a1a4;
--toggle-track-bg-on: #0576da;
--toggle-track-bg-on-hover: #04549b;
--toggle-track-bg-disabled: #e4e4e4;

/* ── Colors — thumb ── */
--toggle-thumb-bg: var(--color-bg-surface);
--toggle-thumb-bg-disabled: #c9c9c9;

/* ── Text ── */
--toggle-font-family: var(--font-body);
--toggle-label-font-size: var(--text-sm);
--toggle-label-line-height: var(--text-sm--line-height);
--toggle-label-font-weight: var(--font-weight-semibold);
--toggle-side-label-font-size: var(--text-sm);
--toggle-side-label-line-height: var(--text-sm--line-height);
--toggle-side-label-font-weight: var(--font-weight-medium);
--toggle-description-font-size: var(--text-caption-sm);
--toggle-description-line-height: var(--text-caption-sm--line-height);
--toggle-description-font-weight: var(--font-weight-medium);
--toggle-label-color: var(--color-text-primary);
--toggle-text-color: var(--color-text-primary);
--toggle-description-color: var(--color-text-secondary);
--toggle-label-color-disabled: var(--color-text-disabled);
--toggle-text-color-disabled: var(--color-text-disabled);

/* ── Colors — error ── */
--toggle-track-border-error: var(--color-border-error);
--toggle-error-border-width: 1.5px;
```

## Divider Component Tokens

Source: `packages/tokens/src/component-divider.css`

```css
--divider-color: var(--color-border-primary);
--divider-size: var(--width-1);
```

## Separator Component Tokens

Source: `packages/tokens/src/component-separator.css`

```css
--separator-color: var(--divider-color);
--separator-size: var(--divider-size);
```

## Alert Component Tokens

Source: `packages/tokens/src/component-alert.css`

```css
/* ── Shared layout ── */
--alert-radius: var(--radius-md);
--alert-strip-width: var(--width-4);
--alert-padding-x: var(--spacing-xl);   /* 16px */
--alert-padding-y: var(--spacing-xl);   /* 16px */
--alert-gap: var(--spacing-md);         /* 8px */
--alert-content-gap: var(--spacing-1);  /* 4px */
--alert-action-gap: var(--spacing-md);  /* 8px — space above action in stacked */
--alert-icon-size: var(--spacing-5);    /* 20px */
--alert-icon-offset: 0px;
--alert-dismiss-size: var(--spacing-8); /* 32px */
--alert-dismiss-opacity: 0.65;
--alert-font-family: var(--font-body);
--alert-font-size: var(--text-md);
--alert-line-height: var(--text-md--line-height);
--alert-font-weight: var(--font-weight-medium);
--alert-title-size: var(--text-lg);
--alert-title-line-height: var(--text-lg--line-height);
--alert-title-weight: var(--font-weight-bold);

/* ── Info ── */
--alert-info-bg: var(--color-bg-info-subtle);/* dark: #003877 */
--alert-info-border: var(--color-border-info-subtle);/* dark: #0059c2 */
--alert-info-text: var(--color-text-primary);/* dark: #f4f3f3 */
--alert-info-title: var(--color-text-primary);/* dark: #f4f3f3 */
--alert-info-icon: var(--color-fg-info);/* dark: #54a3f6 */
--alert-info-strip: var(--color-fg-info);/* dark: #54a3f6 */
--alert-info-action: var(--color-action-primary);/* dark: #54a3f6 */
--alert-info-action-hover: var(--color-action-primary-hover);/* dark: #8bc4ff */

/* ── Success ── */
--alert-success-bg: var(--color-bg-success-subtle);/* dark: #044329 */
--alert-success-border: var(--color-border-success-subtle);/* dark: #006d0f */
--alert-success-text: var(--color-text-primary);/* dark: #f4f3f3 */
--alert-success-title: var(--color-text-primary);/* dark: #f4f3f3 */
--alert-success-icon: var(--color-fg-positive);/* dark: #2bb47d */
--alert-success-strip: var(--color-fg-positive);/* dark: #2bb47d */
--alert-success-action: var(--color-fg-positive);/* dark: #2bb47d */
--alert-success-action-hover: var(--color-text-success);/* dark: #62d6a2 */

/* ── Warning ── */
--alert-warning-bg: var(--color-bg-warning-subtle);/* dark: #521d00 */
--alert-warning-border: var(--color-border-warning-subtle);/* dark: #b44e00 */
--alert-warning-text: var(--color-text-primary);/* dark: #f4f3f3 */
--alert-warning-title: var(--color-text-primary);/* dark: #f4f3f3 */
--alert-warning-icon: var(--color-fg-warning);/* dark: #e16d00 */
--alert-warning-strip: var(--color-fg-warning);/* dark: #e16d00 */
--alert-warning-action: var(--color-fg-warning);/* dark: #e16d00 */
--alert-warning-action-hover: var(--color-text-warning);/* dark: #ff9a3c */

/* ── Danger ── */
--alert-danger-bg: var(--color-bg-error-subtle);/* dark: #7b0000 */
--alert-danger-border: var(--color-border-danger-subtle);/* dark: #d71913 */
--alert-danger-text: var(--color-text-primary);/* dark: #f4f3f3 */
--alert-danger-title: var(--color-text-primary);/* dark: #f4f3f3 */
--alert-danger-icon: var(--color-fg-negative);/* dark: #ff755e */
--alert-danger-strip: var(--color-fg-negative);/* dark: #ff755e */
--alert-danger-action: var(--color-fg-negative);/* dark: #ff755e */
--alert-danger-action-hover: var(--color-text-error);/* dark: #ffa193 */
```

## Tooltip Component Tokens

Source: `packages/tokens/src/component-tooltip.css`

```css
/* ── Surface ── */
--tooltip-bg: var(--color-bg-inverse);
--tooltip-text: var(--color-text-inverse);

/* ── Shape ── */
--tooltip-radius: var(--radius-sm);     /* 6px */
--tooltip-max-width: 240px;

/* ── Spacing ── */
--tooltip-padding-x: var(--spacing-md); /* 8px */
--tooltip-padding-y: var(--spacing-xs); /* 4px */

/* ── Typography ── */
--tooltip-font-family: var(--font-body);
--tooltip-font-size: var(--text-sm);    /* 12px */
--tooltip-font-weight: var(--font-weight-medium);
--tooltip-line-height: 16px;
```

## Popover Component Tokens

Source: `packages/tokens/src/component-popover.css`

```css
/* ── Surface ── */
--popover-bg: var(--color-bg-float);
--popover-text: var(--color-text-primary);
--popover-border: var(--color-border-primary);
--popover-shadow: var(--shadow-md);
--popover-z: var(--z-popover);

/* ── Shape ── */
--popover-radius: var(--radius-lg);
--popover-width: 320px;
--popover-max-width: calc(100vw - 32px);

/* ── Spacing ── */
--popover-padding-x: var(--spacing-lg);
--popover-padding-y: var(--spacing-lg);
--popover-gap: var(--spacing-md);

/* ── Typography ── */
--popover-font-family: var(--font-body);
--popover-font-size: var(--text-sm);
--popover-line-height: var(--text-sm--line-height);
```

## Dropdown Menu Component Tokens

Source: `packages/tokens/src/component-dropdown-menu.css`

```css
/* ── Surface ── */
--dropdown-menu-bg: var(--color-bg-float);
--dropdown-menu-border: var(--color-border-primary);
--dropdown-menu-shadow: var(--shadow-sm);
--dropdown-menu-z: var(--z-dropdown);

/* ── Shape ── */
--dropdown-menu-radius: var(--radius-md);
--dropdown-menu-min-width: 180px;
--dropdown-menu-max-width: calc(100vw - 32px);

/* ── Spacing ── */
--dropdown-menu-padding-y: var(--spacing-1);
--dropdown-menu-item-height: 32px;
--dropdown-menu-item-padding-x: var(--spacing-3);
--dropdown-menu-item-gap: var(--spacing-2);
--dropdown-menu-item-content-gap: 2px;
--dropdown-menu-indicator-size: var(--checkbox-size-md);
--dropdown-menu-indicator-mark-width: var(--checkbox-mark-width-md);
--dropdown-menu-indicator-mark-height: var(--checkbox-mark-height-md);
--dropdown-menu-indicator-border-width: 1px;
--dropdown-menu-indicator-radius: var(--checkbox-radius);
--dropdown-menu-separator-margin-y: var(--spacing-1);
--dropdown-menu-avatar-size: 24px;

/* ── Typography ── */
--dropdown-menu-font-family: var(--font-body);
--dropdown-menu-font-size: var(--text-sm);
--dropdown-menu-line-height: var(--text-sm--line-height);
--dropdown-menu-label-font-size: var(--text-caption-sm);
--dropdown-menu-label-line-height: var(--text-caption-sm--line-height);
--dropdown-menu-label-font-weight: var(--font-weight-semibold);

/* ── Item color ── */
--dropdown-menu-item-text: var(--color-text-primary);
--dropdown-menu-item-text-hover: var(--color-text-primary);
--dropdown-menu-item-text-active: var(--color-text-primary);
--dropdown-menu-item-icon: var(--color-fg-secondary);
--dropdown-menu-item-bg-hover: var(--color-action-neutral-subtle-hover);/* dark: var(--color-action-neutral-hover) */
--dropdown-menu-item-bg-active: var(--color-action-neutral-subtle-active);/* dark: var(--color-action-neutral-active) */
--dropdown-menu-item-meta-text: var(--color-text-tertiary);
--dropdown-menu-item-text-disabled: var(--color-text-disabled);
--dropdown-menu-item-text-destructive: var(--color-text-error);
--dropdown-menu-item-bg-destructive-hover: var(--color-bg-error-surface);
--dropdown-menu-indicator-bg: var(--color-bg-surface);
--dropdown-menu-indicator-bg-checked: var(--checkbox-bg-checked);
--dropdown-menu-indicator-border: var(--color-border-secondary);
--dropdown-menu-indicator-border-checked: var(--checkbox-border-checked);
--dropdown-menu-indicator-mark: var(--checkbox-mark-color);
--dropdown-menu-avatar-bg: var(--color-bg-error-surface);
--dropdown-menu-avatar-text: var(--color-text-error);

/* ── Support color ── */
--dropdown-menu-label-text: var(--color-text-tertiary);
--dropdown-menu-shortcut-text: var(--color-text-tertiary);
--dropdown-menu-separator: var(--color-border-secondary);
--dropdown-menu-focus-ring: var(--color-border-focus);
```

## Dialog Component Tokens

Source: `packages/tokens/src/component-dialog.css`

```css
--dialog-overlay-bg: rgba(27, 26, 26, 0.5);/* dark: rgba(0, 0, 0, 0.72) */
--dialog-content-bg: var(--color-bg-float);
--dialog-content-border: var(--color-border-primary);
--dialog-content-radius: var(--radius-md);
--dialog-content-shadow: 4px 4px 8px rgba(106, 106, 106, 0.1);
--dialog-content-width-sm: 360px;
--dialog-content-width-md: 500px;
--dialog-content-width-lg: 604px;
--dialog-header-padding-x: var(--spacing-6);
--dialog-header-padding-top: var(--spacing-6);
--dialog-header-padding-bottom: var(--spacing-6);
--dialog-header-gap: var(--spacing-2);
--dialog-header-border: var(--color-border-primary);
--dialog-body-padding-x: var(--spacing-6);
--dialog-body-padding-y: var(--spacing-6);
--dialog-body-font-size: var(--text-md);
--dialog-body-line-height: var(--text-md--line-height);
--dialog-body-font-weight: var(--font-weight-regular);
--dialog-body-color: var(--color-text-primary);
--dialog-footer-padding-x: var(--spacing-6);
--dialog-footer-padding-top: var(--spacing-3);
--dialog-footer-padding-bottom: var(--spacing-4);
--dialog-title-color: var(--color-text-primary);
--dialog-title-font-size: var(--text-heading-xs);
--dialog-title-line-height: 20px;
--dialog-title-font-weight: var(--font-weight-bold);
--dialog-description-color: var(--color-text-secondary);
--dialog-description-font-size: var(--text-sm);
--dialog-description-line-height: var(--text-sm--line-height);
--dialog-description-font-weight: var(--font-weight-medium);
--dialog-close-size: 48px;
--dialog-close-icon-size: 20px;
--dialog-close-offset: var(--spacing-3);
--dialog-close-bg-hover: var(--color-action-neutral-subtle-hover);
--dialog-close-bg-active: var(--color-action-neutral-subtle-active);
--dialog-close-color: var(--color-fg-secondary);
--dialog-footer-gap: var(--spacing-2);
--dialog-z: var(--z-modal);
```

## Drawer Component Tokens

Source: `packages/tokens/src/component-drawer.css`

```css
--drawer-overlay-bg: var(--dialog-overlay-bg);
--drawer-content-bg: var(--color-bg-float);
--drawer-content-border: var(--color-border-primary);
--drawer-content-shadow: var(--shadow-lg);
--drawer-content-width-sm: 320px;
--drawer-content-width-md: 400px;
--drawer-content-width-lg: 520px;
--drawer-content-height-sm: 280px;
--drawer-content-height-md: 360px;
--drawer-content-height-lg: 480px;
--drawer-header-padding-x: var(--spacing-6);
--drawer-header-padding-top: var(--spacing-6);
--drawer-header-padding-bottom: var(--spacing-6);
--drawer-header-gap: var(--spacing-2);
--drawer-header-border: var(--color-border-primary);
--drawer-body-padding-x: var(--spacing-6);
--drawer-body-padding-y: var(--spacing-6);
--drawer-body-font-size: var(--text-md);
--drawer-body-line-height: var(--text-md--line-height);
--drawer-body-font-weight: var(--font-weight-regular);
--drawer-body-color: var(--color-text-primary);
--drawer-footer-padding-x: var(--spacing-6);
--drawer-footer-padding-top: var(--spacing-3);
--drawer-footer-padding-bottom: var(--spacing-4);
--drawer-footer-gap: var(--spacing-2);
--drawer-title-color: var(--color-text-primary);
--drawer-title-font-size: var(--text-heading-xs);
--drawer-title-line-height: 20px;
--drawer-title-font-weight: var(--font-weight-bold);
--drawer-description-color: var(--color-text-secondary);
--drawer-description-font-size: var(--text-sm);
--drawer-description-line-height: var(--text-sm--line-height);
--drawer-description-font-weight: var(--font-weight-medium);
--drawer-close-size: 48px;
--drawer-close-icon-size: 20px;
--drawer-close-offset: var(--spacing-3);
--drawer-close-bg-hover: var(--color-action-neutral-subtle-hover);
--drawer-close-bg-active: var(--color-action-neutral-subtle-active);
--drawer-close-color: var(--color-fg-secondary);
--drawer-z: var(--z-modal);
```

## Context Menu Component Tokens

Source: `packages/tokens/src/component-context-menu.css`

```css
--context-menu-bg: var(--dropdown-menu-bg);
--context-menu-border: var(--dropdown-menu-border);
--context-menu-radius: var(--dropdown-menu-radius);
--context-menu-shadow: var(--dropdown-menu-shadow);
--context-menu-min-width: 200px;
--context-menu-max-width: calc(100vw - 32px);
--context-menu-padding-y: var(--dropdown-menu-padding-y);
--context-menu-item-height: var(--dropdown-menu-item-height);
--context-menu-item-padding-x: var(--dropdown-menu-item-padding-x);
--context-menu-item-gap: var(--dropdown-menu-item-gap);
--context-menu-item-text: var(--dropdown-menu-item-text);
--context-menu-item-text-hover: var(--dropdown-menu-item-text-hover);
--context-menu-item-text-disabled: var(--dropdown-menu-item-text-disabled);
--context-menu-item-text-destructive: var(--dropdown-menu-item-text-destructive);
--context-menu-item-bg-hover: var(--dropdown-menu-item-bg-hover);
--context-menu-item-bg-active: var(--dropdown-menu-item-bg-active);
--context-menu-separator: var(--dropdown-menu-separator);
--context-menu-label-text: var(--dropdown-menu-label-text);
--context-menu-shortcut-text: var(--dropdown-menu-shortcut-text);
--context-menu-font-family: var(--dropdown-menu-font-family);
--context-menu-font-size: var(--dropdown-menu-font-size);
--context-menu-line-height: var(--dropdown-menu-line-height);
--context-menu-z: var(--z-dropdown);
```

## Calendar Component Tokens

Source: `packages/tokens/src/component-calendar.css`

```css
--calendar-bg: var(--color-bg-surface);
--calendar-border: var(--color-border-secondary);
--calendar-radius: var(--radius-md);
--calendar-padding: var(--spacing-4);
--calendar-gap: var(--spacing-3);
--calendar-header-gap: var(--spacing-2);
--calendar-shadow: var(--shadow-sm);
--calendar-picker-min-height: 224px;
--calendar-title-color: var(--color-text-primary);
--calendar-title-font-size: var(--text-sm);
--calendar-title-font-weight: var(--font-weight-semibold);
--calendar-weekday-color: var(--color-text-tertiary);
--calendar-weekday-font-size: var(--text-caption-sm);
--calendar-weekday-height: var(--spacing-6);
--calendar-cell-gap: var(--spacing-1);
--calendar-nav-size: var(--spacing-8);
--calendar-nav-icon-size: 16px;
--calendar-title-icon-size: 14px;
--calendar-day-size: 32px;
--calendar-day-font-size: var(--text-sm);
--calendar-day-line-height: 14px;
--calendar-day-radius: var(--radius-xs);
--calendar-day-text: var(--color-text-secondary);
--calendar-day-bg-hover: var(--color-action-neutral-subtle-hover);
--calendar-day-bg-selected: var(--color-action-primary);
--calendar-day-bg-selected-hover: var(--color-action-primary-hover);
--calendar-day-text-selected: var(--color-neutral-0);
--calendar-day-text-outside: var(--color-text-disabled);
--calendar-day-text-disabled: var(--color-text-disabled);
--calendar-day-disabled-opacity: var(--opacity-disabled);
--calendar-day-bg-current: var(--color-bg-surface);
--calendar-day-border-current: var(--color-action-primary);
--calendar-day-text-current: var(--color-action-primary);
--calendar-day-bg-range: var(--color-action-primary-subtle);
--calendar-day-bg-range-hover: var(--color-action-primary-subtle-hover);
--calendar-focus-ring: var(--color-border-focus);
--calendar-focus-ring-width: 3px;
--calendar-focus-ring-offset-color: var(--color-bg-surface);
--calendar-picker-item-bg-hover: var(--color-action-neutral-subtle-hover);
--calendar-picker-item-bg-selected: var(--color-action-primary);
--calendar-picker-item-text-selected: var(--color-neutral-0);
--calendar-presets-width: 176px;
--calendar-range-width: 640px;
--calendar-range-footer-bg: var(--color-bg-muted);
--calendar-range-divider: var(--color-border-secondary);
```

## Multi Select Component Tokens

Source: `packages/tokens/src/component-multi-select.css`

```css
--multi-select-width: 320px;
--multi-select-trigger-min-height-sm: 36px;
--multi-select-trigger-min-height: 44px;
--multi-select-trigger-min-height-lg: 48px;
--multi-select-trigger-padding-x: var(--spacing-3);
--multi-select-trigger-padding-y: var(--spacing-2);
--multi-select-trigger-gap: var(--spacing-2);
--multi-select-trigger-radius: var(--input-size-md-radius);
--multi-select-trigger-border: var(--input-border);
--multi-select-trigger-border-hover: var(--input-border-hover);
--multi-select-trigger-border-focus: var(--input-focus-ring);
--multi-select-trigger-focus-ring-offset: var(--input-focus-ring-offset);
--multi-select-trigger-focus-ring-width: var(--input-focus-ring-width);
--multi-select-trigger-bg: var(--input-bg);
--multi-select-trigger-text: var(--input-text);
--multi-select-trigger-font-family: var(--input-font-family);
--multi-select-trigger-font-size: var(--input-size-md-text);
--multi-select-trigger-font-weight: var(--input-font-weight);
--multi-select-trigger-line-height: var(--text-sm--line-height);
--multi-select-placeholder: var(--input-placeholder);
--multi-select-chip-bg: var(--color-bg-gray-muted);
--multi-select-chip-text: var(--color-text-primary);
--multi-select-chip-radius: var(--radius-full);
--multi-select-chip-gap: var(--spacing-1);
--multi-select-chip-height: 28px;
--multi-select-chip-padding-x: 10px;
--multi-select-chip-font-size: var(--text-sm);
--multi-select-chip-font-weight: var(--font-weight-semibold);
--multi-select-chip-line-height: 14px;
--multi-select-chip-remove-size: 18px;
--multi-select-chip-remove-icon-size: 12px;
--multi-select-chip-remove-bg-hover: var(--color-action-neutral-subtle-hover);
--multi-select-chevron-size: 16px;
--multi-select-menu-max-height: 240px;
```

## Social Button Component Tokens

Source: `packages/tokens/src/component-social-button.css`

```css
--social-button-min-width: 198px;
--social-button-linkedin-min-width: 209px;
--social-button-height-sm: 32px;
--social-button-height: 40px;
--social-button-height-lg: var(--button-size-lg-height);
--social-button-padding-x-sm: var(--button-size-sm-padding-x);
--social-button-padding-x: var(--button-size-md-padding-x);
--social-button-padding-x-lg: var(--button-size-lg-padding-x);
--social-button-gap-sm: var(--spacing-2);
--social-button-gap: var(--spacing-2);
--social-button-gap-lg: var(--spacing-3);
--social-button-radius: var(--radius-md);
--social-button-border: var(--color-border-primary);
--social-button-border-hover: var(--color-border-secondary);
--social-button-border-active: var(--color-border-secondary);
--social-button-border-focus: #c7e5f0;
--social-button-bg: var(--button-outline-bg);
--social-button-bg-hover: var(--button-outline-bg);
--social-button-bg-active: var(--button-outline-bg);
--social-button-text: var(--color-text-primary);
--social-button-shadow: var(--shadow-sm);
--social-button-shadow-hover: var(--shadow-sm);
--social-button-shadow-focus: 0 0 0 3px var(--social-button-border-focus);
--social-button-font-size-sm: var(--button-size-sm-text);
--social-button-font-size: var(--button-size-md-text);
--social-button-font-size-lg: var(--button-size-lg-text);
--social-button-line-height-sm: var(--button-size-sm-line-height);
--social-button-line-height: var(--button-size-md-line-height);
--social-button-line-height-lg: var(--button-size-lg-line-height);
--social-button-font-weight: var(--button-size-md-weight);
--social-button-icon-size-sm: 16px;
--social-button-icon-size: 16px;
--social-button-icon-size-lg: 20px;
--social-button-disabled-opacity: var(--opacity-disabled);
```

## Utility Button Component Tokens

Source: `packages/tokens/src/component-utility-button.css`

```css
--utility-button-size-sm: 28px;
--utility-button-size-md: 36px;
--utility-button-size-lg: 44px;
--utility-button-radius: var(--radius-xs);
--utility-button-bg: transparent;
--utility-button-bg-hover: var(--color-action-neutral-subtle-hover);
--utility-button-bg-active: var(--color-action-neutral-subtle-active);
--utility-button-bg-disabled: transparent;
--utility-button-border: transparent;
--utility-button-border-hover: transparent;
--utility-button-border-active: var(--color-border-secondary);
--utility-button-text: var(--color-fg-secondary);
--utility-button-text-hover: var(--color-fg-primary);
--utility-button-text-active: var(--color-fg-primary);
--utility-button-text-disabled: var(--color-text-disabled);
--utility-button-icon-sm: 14px;
--utility-button-icon-md: 16px;
--utility-button-icon-lg: 20px;
--utility-button-disabled-opacity: 1;
```

## Toast Component Tokens

Source: `packages/tokens/src/component-toast.css`

```css
--toast-bg: var(--color-bg-float);
--toast-border: var(--color-border-primary);
--toast-radius: var(--radius-lg);
--toast-shadow: var(--shadow-lg);
--toast-padding-x: var(--spacing-4);    /* 16px */
--toast-padding-y: var(--spacing-3);    /* 12px */
--toast-gap: var(--spacing-2);          /* 8px — between icon/stripe and content */
--toast-content-gap: var(--spacing-1);  /* 4px — between title and description */
--toast-action-gap: var(--spacing-3);   /* 12px — between description and action */
--toast-width: 360px;
--toast-z: var(--z-toast);              /* 1700 */
--toast-stripe-width: var(--width-4);   /* 4px accent stripe */
--toast-title-color: var(--color-text-primary);
--toast-title-size: var(--text-md);
--toast-title-line-height: var(--text-md--line-height);
--toast-title-weight: var(--font-weight-semibold);
--toast-desc-color: var(--color-text-secondary);
--toast-desc-size: var(--text-sm);
--toast-desc-line-height: var(--text-sm--line-height);
--toast-close-size: var(--spacing-6);   /* 24px */
--toast-close-icon-size: 10px;          /* ✕ line length */
--toast-close-icon-height: 1.5px;       /* ✕ line thickness */
--toast-close-color: var(--color-fg-tertiary);

/* ── Viewport positioning ── */
--toast-viewport-bottom: var(--spacing-5);/* 20px */
--toast-viewport-right: var(--spacing-5);/* 20px */
--toast-viewport-gap: var(--spacing-2); /* 8px between stacked toasts */
--toast-viewport-width: min(360px, calc(100vw - 2 * var(--spacing-5)));

/* ── Intent stripe colors ── */
--toast-stripe-neutral: var(--color-border-primary);
--toast-stripe-info: var(--color-border-info-strong);
--toast-stripe-success: var(--color-border-success-strong);
--toast-stripe-warning: var(--color-border-warning-strong);
--toast-stripe-error: var(--color-border-error-strong);

/* ── Intent icon colors ── */
--toast-icon-neutral: var(--color-fg-secondary);
--toast-icon-info: var(--color-fg-info);
--toast-icon-success: var(--color-fg-positive);
--toast-icon-warning: var(--color-fg-warning);
--toast-icon-error: var(--color-fg-negative);
```

## Datatable Component Tokens

Source: `packages/tokens/src/component-datatable.css`

```css
--datatable-controls-gap: var(--spacing-3);/* 12px — between optional controls and table */
--datatable-footer-gap: var(--spacing-3);/* 12px — between table and pagination */
--datatable-empty-min-height: 220px;
--datatable-skeleton-line-height: 16px;
--datatable-skeleton-line-width: 120px;
--datatable-skeleton-title-width: 220px;
--datatable-skeleton-subtitle-width: 96px;
--datatable-skeleton-subtitle-height: 10px;
--datatable-skeleton-avatar-size: 32px;
--datatable-skeleton-badge-width: 72px;
--datatable-skeleton-badge-height: 24px;
--datatable-skeleton-action-size: 28px;
```

## Date Picker Component Tokens

Source: `packages/tokens/src/component-date-picker.css`

```css
--date-picker-popover-top: var(--spacing-2);
--date-picker-popover-z: var(--z-popover);
--date-picker-range-bg: var(--color-bg-float);
--date-picker-range-border: var(--color-border-secondary);
--date-picker-range-radius: var(--radius-md);
--date-picker-range-shadow: var(--shadow-sm);
--date-picker-range-divider: var(--color-border-secondary);
--date-picker-range-presets-width: 176px;
--date-picker-range-content-padding: var(--spacing-4);
--date-picker-range-footer-bg: var(--color-bg-muted);
--date-picker-range-footer-padding: var(--spacing-4);
--date-picker-range-footer-gap: var(--spacing-3);
--date-picker-range-input-width: 128px;
--date-picker-preset-height: var(--spacing-8);
--date-picker-preset-padding-x: var(--spacing-4);
--date-picker-preset-text: var(--color-text-secondary);
--date-picker-preset-bg-hover: var(--color-action-neutral-subtle-hover);
--date-picker-preset-font-size: var(--text-sm);
--date-picker-field-separator-color: var(--color-text-tertiary);
--date-picker-more-icon-size: 14px;
--date-picker-icon-hit-area: var(--touch-target-size);
--date-picker-more-menu-min-width: 132px;
--date-picker-quarter-icon-size: 16px;
--date-picker-quarter-popover-width: 360px;
--date-picker-quarter-header-height: 56px;
--date-picker-quarter-grid-padding: 20px 28px 28px;
--date-picker-quarter-grid-gap: var(--spacing-4);
--date-picker-quarter-item-height: 40px;
--date-picker-quarter-year-panel-width: 304px;
--date-picker-quarter-year-panel-padding: 24px;
```
