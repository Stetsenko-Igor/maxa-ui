/** Build-time projection; logical source/Figma names stay unchanged. */
export function namespaceVariable(name) {
  return name.startsWith('--radix-') ? name : `--maxa-${name.slice(2)}`
}

export function namespaceCss(css) {
  // Strings/comments are opaque: don't rewrite content, URLs or quoted examples.
  const opaque = /\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g
  const code = css.replace(opaque, ' ')
  const animations = new Map([...code.matchAll(/@(?:-webkit-)?keyframes\s+([\w-]+)/g)]
    .map(([, name]) => [name, name.startsWith('maxa-') ? name : `maxa-${name}`]))
  const transform = text => text.replace(/(?<![\w-])(?:--[\w-]+|[a-zA-Z_][\w-]*)/g, name => {
    if (name.startsWith('--')) return namespaceVariable(name)
    if (name === 'data-theme') return 'data-maxa-theme'
    return animations.get(name) ?? name
  })
  let result = '', start = 0
  for (const match of css.matchAll(opaque)) {
    result += transform(css.slice(start, match.index)) + match[0]
    start = match.index + match[0].length
  }
  return result + transform(css.slice(start))
}

export function namespaceJs(js) {
  // Includes template prefixes such as var(--spacing-${token}), unlike an ID map.
  // External Radix properties belong to Radix, not to this distribution.
  return js.replace(/\bvar\(\s*(--[\w-]+)/g, (expression, name) =>
    expression.replace(name, namespaceVariable(name)))
    .replace(/^\/\/[#@] sourceMappingURL=.*$/gm, '')
}
