"use client"

import { FormField, Input } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type Size = "sm" | "md" | "lg"
type Status = "default" | "success" | "error"

const FORM_FIELD_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "size",
      options: [
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
        { label: "lg", value: "lg" },
      ],
      default: "md",
    },
    {
      type: "select",
      name: "status",
      options: [
        { label: "default", value: "default" },
        { label: "success", value: "success" },
        { label: "error", value: "error" },
      ],
      default: "default",
    },
    { type: "text", name: "hint", default: "We will never share your email." },
    { type: "boolean", name: "required", default: false },
    { type: "boolean", name: "withFooter", label: "footer end", default: false },
  ],
  render: (v: PlaygroundValues) => {
    const isError = v.status === "error"
    return (
      <div style={{ width: "360px" }}>
        <FormField
          label="Email"
          htmlFor="pg-email"
          size={v.size as Size}
          status={v.status as Status}
          hint={v.hint as string}
          required={v.required as boolean}
          {...(isError ? { error: "Enter a valid email address." } : {})}
          {...(v.withFooter ? { footerEnd: <span>0 / 80</span> } : {})}
        >
          <Input id="pg-email" type="email" placeholder="you@example.com" size={v.size as Size} />
        </FormField>
      </div>
    )
  },
  code: (v: PlaygroundValues) => {
    const attrs = [`label="Email"`, `htmlFor="email"`, `size="${v.size}"`]
    if (v.status === "error") {
      attrs.push(`error="Enter a valid email address."`)
    } else {
      if (v.status !== "default") attrs.push(`status="${v.status}"`)
      if (v.hint) attrs.push(`hint="${v.hint}"`)
    }
    if (v.required) attrs.push("required")
    if (v.withFooter) attrs.push(`footerEnd={<span>0 / 80</span>}`)
    return `<FormField ${attrs.join(" ")}>
  <Input id="email" type="email" size="${v.size}" />
</FormField>`
  },
}

export function FormFieldDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { FormField, Input } from "@maxa/ui"

<FormField label="Email" htmlFor="email" hint="We will never share your email.">
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>`}
      playground={FORM_FIELD_PLAYGROUND}
    >
      <div style={{ maxWidth: "420px" }}>
        <FormField label="Email" htmlFor="email" hint="We will never share your email.">
          <Input id="email" type="email" placeholder="you@example.com" />
        </FormField>
      </div>
    </ComponentPreview>
  )
}
