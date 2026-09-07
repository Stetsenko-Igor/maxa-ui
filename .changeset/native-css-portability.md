---
"@maxa/tokens": minor
"@maxa/ui": minor
---

Make token styles browser-native without requiring Tailwind. Add a complete `core.css` entry excluding the MAXA brand scale and an aggregate `@maxa/ui/styles.css` entry for HTML/ERB asset pipelines. Preserve token names, values, React APIs, and existing component styles. Add component-local border-box normalization to React and CSS-only entries so borders fit token dimensions without a global reset. Mark Breadcrumb as a client component because its icons use React client context.

Document whole-app custom themes, host reset/font responsibilities, React 17–19 support, and the limits of CSS-only behavior and accessibility. No registry publication, Tailwind adapter, or global reset is included.
