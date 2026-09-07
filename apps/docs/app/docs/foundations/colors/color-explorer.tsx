"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { Alert, Button, Input } from "@maxa/ui"
import type { ColorExplorerData, ColorExplorerToken, ColorMode } from "./explorer-types"
import "./color-explorer.css"

const PARTS = [
  { component: "Button", label: "Background", token: "--button-primary-bg" },
  { component: "Button", label: "Text", token: "--button-primary-text" },
  { component: "Button", label: "Focus ring", token: "--color-focus-ring" },
  { component: "Input", label: "Background", token: "--input-bg" },
  { component: "Input", label: "Border", token: "--input-border" },
  { component: "Input", label: "Text", token: "--input-text" },
  { component: "Alert", label: "Background", token: "--alert-success-bg" },
  { component: "Alert", label: "Text", token: "--alert-success-text" },
  { component: "Alert", label: "Title", token: "--alert-success-title" },
]
const ROLE_COPY: Record<string, [string, string]> = {
  "--color-action-primary": [
    "Primary action",
    "The main action color for primary buttons and links. Its component recipes also define hover, active, and focus states.",
  ],
  "--color-text-primary": [
    "Main text",
    "The default color for essential content, headings, and field text. It changes with the theme to stay readable.",
  ],
  "--color-text-secondary": [
    "Supporting text",
    "Secondary content that supports the main message without competing with it.",
  ],
  "--color-text-tertiary": [
    "Subtle text",
    "Lower-emphasis labels and supporting details. Check contrast in the intended context.",
  ],
  "--color-bg-page": [
    "Page background",
    "The base canvas behind application surfaces. Component surfaces may use a different role.",
  ],
  "--color-bg-surface": [
    "Surface background",
    "The default surface color used by fields and other component containers.",
  ],
  "--color-focus-ring": [
    "Keyboard focus ring",
    "Marks the active keyboard target. Focus a preview control to see this color in use.",
  ],
  "--input-bg": ["Field background", "The fill behind text inside a standard input field."],
  "--input-border": [
    "Field border",
    "The resting input outline. Hover and focus have separate token recipes.",
  ],
  "--input-text": [
    "Field text",
    "The color of entered input text. Type in the preview to compare it with the separate placeholder treatment.",
  ],
  "--button-primary-bg": [
    "Primary button background",
    "The resting fill of the primary button. Hover and active states use separate tokens.",
  ],
  "--button-primary-text": ["Primary button text", "The foreground label inside a primary button."],
  "--alert-success-bg": [
    "Success message background",
    "The subtle fill behind a successful outcome message.",
  ],
  "--alert-success-text": [
    "Success message text",
    "The body text of a success alert. Its heading and icon have separate component tokens.",
  ],
}
const human = (name: string) =>
  ROLE_COPY[name]?.[0] ??
  name
    .replace(/^--(?:color-)?/, "")
    .replace(/\bbg\b/g, "background")
    .replace(/\bfg\b/g, "foreground")
    .replace(/-/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
const isHex = (value: string) => /^#[\da-f]{6}$/i.test(value)

export function ColorExplorer({ data }: { data: ColorExplorerData }) {
  const [selectedName, setSelectedName] = useState("--color-action-primary")
  const [mode, setMode] = useState<ColorMode>("light")
  const [search, setSearch] = useState("")
  const [layer, setLayer] = useState("semantic")
  const [group, setGroup] = useState("all")
  const [trial, setTrial] = useState<string | null>(null)
  const [draft, setDraft] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const index = useMemo(() => new Map(data.tokens.map((token) => [token.name, token])), [data])
  const selected = index.get(selectedName) ?? data.tokens.find((token) => token.color)
  const colors = useMemo(() => data.tokens.filter((token) => token.color), [data])
  const groups = useMemo(
    () =>
      [
        ...new Set(
          colors
            .filter((token) => layer === "all" || token.layer === layer)
            .map((token) => token.group),
        ),
      ].sort(),
    [colors, layer],
  )
  const visible = useMemo(
    () =>
      colors
        .filter(
          (token) =>
            (layer === "all" || token.layer === layer) &&
            (group === "all" || token.group === group) &&
            `${token.name} ${human(token.name)}`.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [colors, layer, group, search],
  )
  useEffect(() => {
    const list = listRef.current
    const row = list?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
    if (list && row) {
      const top = row.offsetTop
      if (top < list.scrollTop || top + row.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = Math.max(0, top - list.clientHeight / 2 + row.offsetHeight / 2)
      }
    }
  }, [selectedName, visible])
  const dependencies = useMemo(() => {
    const walk = (name: string, visited = new Set<string>()) => {
      for (const reference of index.get(name)?.[mode].references ?? []) {
        if (!visited.has(reference)) {
          visited.add(reference)
          walk(reference, visited)
        }
      }
      return visited
    }
    return new Map(data.tokens.map((token) => [token.name, walk(token.name)]))
  }, [data, index, mode])
  const scope = useMemo(() => {
    const values: Record<string, string> = {}
    for (const token of data.tokens) values[token.name] = token[mode].raw
    if (trial && selected) values[selected.name] = trial
    return values as CSSProperties
  }, [data, mode, selected, trial])
  if (!selected) return <p>No color tokens are available.</p>
  const choose = (name: string) => {
    const target = index.get(name)
    if (target && !visible.some((token) => token.name === name)) {
      setLayer(target.layer)
      setGroup("all")
      setSearch("")
    }
    setSelectedName(name)
    setTrial(null)
    setDraft(null)
    setCopied(false)
  }
  const affected = (name: string) =>
    name === selected.name || dependencies.get(name)?.has(selected.name)
  const dependents = data.tokens.filter(
    (token) => token.name !== selected.name && dependencies.get(token.name)?.has(selected.name),
  )
  const direct = dependents.filter((token) => token[mode].references.includes(selected.name))
  const upstream = selected[mode].references
    .map((name) => index.get(name))
    .filter((token): token is ColorExplorerToken => Boolean(token))
  const usages = [selected, ...dependents].flatMap((token) =>
    token.consumers.map((consumer) => ({ ...consumer, token: token.name })),
  )
  const usageComponents = [...new Set(usages.map((usage) => usage.component))].sort()
  const impact = PARTS.filter((part) => affected(part.token))
  const value = trial ?? selected[mode].resolved ?? selected[mode].raw
  const inputValue = draft ?? (isHex(value) ? value : "")
  const changeTrial = (next: string) => {
    setDraft(next)
    if (isHex(next)) setTrial(next)
  }
  const tokenButton = (token: ColorExplorerToken) => (
    <button
      type="button"
      className="color-explorer__token-link"
      aria-label={`Follow ${token.name}`}
      key={token.name}
      onClick={() => choose(token.name)}
    >
      {human(token.name)}
      <code>{token.name}</code>
    </button>
  )

  return (
    <div className="color-explorer">
      <div className="color-explorer__main">
        <header className="color-explorer__heading">
          <span className="color-explorer__eyebrow">
            {selected.layer} · {selected.group}
          </span>
          <h2>{human(selected.name)}</h2>
          <p>
            {ROLE_COPY[selected.name]?.[1] ??
              (selected.layer === "primitive"
                ? "A palette value that feeds named roles. Use semantic or component tokens when building UI."
                : selected.layer === "component"
                  ? "A component recipe: this value connects a specific part of the interface to the shared color system."
                  : "A named color role. Follow its dependencies to see where the value comes from and which components use it.")}
          </p>
          <div className="color-explorer__technical">
            <code data-selected-token>{selected.name}</code>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(selected.name)
                  setCopied(true)
                } catch {
                  setCopied(false)
                }
              }}
            >
              {copied ? "Copied" : "Copy name"}
            </Button>
          </div>
          <dl className="color-explorer__values">
            {(["light", "dark"] as const).map((theme) => (
              <div key={theme}>
                <dt>{theme === "light" ? "Light source" : "Dark source"}</dt>
                <dd>
                  <span
                    className="color-explorer__swatch"
                    style={{ background: selected[theme].resolved ?? "transparent" }}
                  />
                  <code>{selected[theme].resolved ?? selected[theme].raw}</code>
                  {selected[theme].resolved === null && (
                    <small>Expression retained; no resolved value in the source index.</small>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <details className="color-explorer__source">
            <summary>Source details</summary>
            <code>{selected.source}</code>
            <p>
              Current {mode} expression: <code>{selected[mode].raw}</code>
            </p>
          </details>
        </header>

        <section className="color-explorer__section" aria-label="Live color preview">
          <div className="color-explorer__section-heading">
            <h3>Try it in context</h3>
            <div className="color-explorer__modes" aria-label="Preview theme">
              {(["light", "dark"] as const).map((theme) => (
                <Button
                  key={theme}
                  size="sm"
                  variant={mode === theme ? "secondary" : "ghost"}
                  aria-label={`${theme === "light" ? "Light" : "Dark"} preview`}
                  aria-pressed={mode === theme}
                  onClick={() => {
                    setMode(theme)
                    setTrial(null)
                    setDraft(null)
                  }}
                >
                  {theme === "light" ? "Light" : "Dark"}
                </Button>
              ))}
            </div>
          </div>
          <div className="color-explorer__trial">
            <label className="color-explorer__picker-label">
              Trial color
              <input
                aria-label="Trial color picker"
                type="color"
                value={isHex(value) ? value : "#000000"}
                onChange={(event) => changeTrial(event.target.value)}
              />
            </label>
            <label className="color-explorer__hex-label">
              Hex value
              <input
                aria-label="Trial color"
                value={inputValue}
                placeholder="#RRGGBB"
                maxLength={7}
                onChange={(event) => changeTrial(event.target.value)}
                aria-invalid={draft !== null && !isHex(draft)}
              />
            </label>
            <Button
              aria-label="Reset color"
              size="sm"
              variant="ghost"
              disabled={!trial && draft === null}
              onClick={() => {
                setTrial(null)
                setDraft(null)
              }}
            >
              Reset
            </Button>
          </div>
          <p className="color-explorer__muted">
            {draft !== null && !isHex(draft)
              ? `Enter a six-digit hex color, including #. Preview still uses ${trial ?? selected[mode].resolved ?? selected[mode].raw}.`
              : "Temporary preview only. Source tokens and the site theme stay unchanged."}
          </p>
          <div
            className="color-explorer__preview"
            data-color-preview
            data-theme={mode}
            style={scope}
          >
            {(["Button", "Input", "Alert"] as const).map((component) => (
              <div
                className="color-explorer__demo"
                key={component}
                data-affected={
                  PARTS.some((part) => part.component === component && affected(part.token)) ||
                  undefined
                }
              >
                <div className="color-explorer__demo-heading">
                  <strong>{component}</strong>
                  <span>
                    {PARTS.some((part) => part.component === component && affected(part.token))
                      ? "Illustrated part uses token"
                      : "No listed part uses token"}
                  </span>
                </div>
                <div className="color-explorer__example">
                  {component === "Button" && (
                    <Button variant="primary" onClick={() => choose("--button-primary-bg")}>
                      Save changes
                    </Button>
                  )}
                  {component === "Input" && (
                    <Input label="Project name" placeholder="Untitled project" />
                  )}
                  {component === "Alert" && (
                    <Alert intent="success" title="Changes saved">
                      Your project is up to date.
                    </Alert>
                  )}
                </div>
                <div className="color-explorer__parts" aria-label={`Inspect ${component} parts`}>
                  {PARTS.filter((part) => part.component === component).map((part) => (
                    <button
                      type="button"
                      key={part.token}
                      aria-pressed={selected.name === part.token}
                      data-affected={affected(part.token) || undefined}
                      onClick={() => choose(part.token)}
                      data-preview-part={`${component.toLowerCase()}-${part.label === "Background" ? "bg" : part.label === "Focus ring" ? "focus" : part.label.toLowerCase()}`}
                      aria-label={`Inspect ${component} ${part.label.toLowerCase()}`}
                    >
                      {part.label}
                      {affected(part.token) && <span aria-label="affected"> ·</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="color-explorer__muted" role="status">
            {impact.length
              ? `${impact.length} illustrated ${impact.length === 1 ? "part uses" : "parts use"} this token. Select a part to inspect its recipe.`
              : "No illustrated component part uses this token. It may affect the preview canvas or surrounding surfaces; actual CSS consumers are listed below."}
          </p>
        </section>

        <section aria-label="Token dependency chain" className="color-explorer__section">
          <h3>Where this color comes from</h3>
          <div className="color-explorer__chain">
            {upstream.length > 0 ? (
              upstream.map(tokenButton)
            ) : (
              <span className="color-explorer__raw">{selected[mode].raw}</span>
            )}
            <span aria-hidden="true">→</span>
            <span className="color-explorer__chain-current">{human(selected.name)}</span>
            {direct.length > 0 && (
              <>
                <span aria-hidden="true">→</span>
                {direct.slice(0, 3).map(tokenButton)}
                {direct.length > 3 && (
                  <span className="color-explorer__muted">+{direct.length - 3} more below</span>
                )}
              </>
            )}
          </div>
          <p className="color-explorer__muted">Click a source to follow its next dependency.</p>
        </section>

        <section className="color-explorer__section">
          <h3>Used by</h3>
          <p className="color-explorer__muted">
            Library CSS references, not a list of product screens.
          </p>
          {usageComponents.length ? (
            <div className="color-explorer__usage-links">
              {usageComponents.map((component) => (
                <Link key={component} href={`/docs/components/${component}`}>
                  {human(component)}
                </Link>
              ))}
            </div>
          ) : (
            <p className="color-explorer__muted">
              No component stylesheet currently references this token or its dependents.
            </p>
          )}
          <details>
            <summary>
              {usages.length} CSS references · {direct.length} direct token dependents ·{" "}
              {dependents.length - direct.length} indirect
            </summary>
            <div className="color-explorer__references">
              {usages.map((usage, i) => (
                <p key={`${usage.token}-${i}`}>
                  <strong>{human(usage.component)}</strong>
                  <code>
                    {usage.selector} · {usage.property}
                  </code>
                  <code>{usage.token}</code>
                </p>
              ))}
            </div>
          </details>
          {dependents.length > 0 && (
            <details>
              <summary>Explore dependent tokens</summary>
              <div className="color-explorer__dependencies">{dependents.map(tokenButton)}</div>
            </details>
          )}
        </section>
      </div>

      <aside className="color-explorer__inspector" aria-label="Color token inspector">
        <h3>Find a color token</h3>
        <Input
          aria-label="Search color tokens"
          placeholder="Search name or role…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="color-explorer__filters">
          <label>
            Layer
            <select
              aria-label="Token layer"
              value={layer}
              onChange={(event) => {
                setLayer(event.target.value)
                setGroup("all")
              }}
            >
              <option value="semantic">Semantic</option>
              <option value="component">Component</option>
              <option value="primitive">Primitive</option>
              <option value="foundation">Foundation</option>
              <option value="all">All layers</option>
            </select>
          </label>
          <label>
            Group
            <select
              aria-label="Token group"
              value={group}
              onChange={(event) => setGroup(event.target.value)}
            >
              <option value="all">All groups</option>
              {groups.map((item) => (
                <option key={item} value={item}>
                  {human(item)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="color-explorer__count">
          {visible.length} tokens · {mode} values
        </p>
        <div className="color-explorer__list" ref={listRef}>
          {visible.length ? (
            visible.map((token) => (
              <button
                type="button"
                className="color-explorer__row"
                aria-label={`Select ${token.name}`}
                key={token.name}
                aria-pressed={selected.name === token.name}
                onClick={() => choose(token.name)}
              >
                <span
                  className="color-explorer__swatch"
                  style={{ background: token[mode].resolved ?? "transparent" }}
                />
                <span>
                  <strong>{human(token.name)}</strong>
                  <code>{token.name}</code>
                </span>
              </button>
            ))
          ) : (
            <p className="color-explorer__muted">
              No matching tokens. Try another name, layer, or group.
            </p>
          )}
        </div>
      </aside>
    </div>
  )
}
