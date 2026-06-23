"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "18px",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
}

const AVATAR_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "size",
      options: [
        { label: "xs", value: "xs" },
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
        { label: "lg", value: "lg" },
        { label: "xl", value: "xl" },
      ],
      default: "md",
    },
    {
      type: "select",
      name: "color",
      options: [
        { label: "blue", value: "blue" },
        { label: "green", value: "green" },
        { label: "teal", value: "teal" },
        { label: "yellow", value: "yellow" },
        { label: "orange", value: "orange" },
        { label: "red", value: "red" },
        { label: "rose", value: "rose" },
        { label: "violet", value: "violet" },
        { label: "purple", value: "purple" },
      ],
      default: "blue",
    },
    {
      type: "select",
      name: "tone",
      options: [
        { label: "strong", value: "strong" },
        { label: "medium", value: "medium" },
        { label: "neutral", value: "neutral" },
      ],
      default: "strong",
    },
    {
      type: "select",
      name: "shape",
      options: [
        { label: "circle", value: "circle" },
        { label: "square", value: "square" },
      ],
      default: "circle",
    },
    {
      type: "select",
      name: "status",
      options: [
        { label: "none", value: "none" },
        { label: "online", value: "online" },
        { label: "offline", value: "offline" },
        { label: "busy", value: "busy" },
        { label: "away", value: "away" },
      ],
      default: "none",
    },
    { type: "text", name: "initials", default: "IS" },
  ],
  render: (v: PlaygroundValues) => {
    const statusProps =
      v.status === "none"
        ? {}
        : { status: v.status as "online" | "offline" | "busy" | "away" }
    return (
      <Avatar
        size={v.size as "xs" | "sm" | "md" | "lg" | "xl"}
        color={v.color as "blue" | "green" | "teal" | "yellow" | "orange" | "red" | "rose" | "violet" | "purple"}
        tone={v.tone as "strong" | "medium" | "neutral"}
        shape={v.shape as "circle" | "square"}
        {...statusProps}
      >
        <AvatarFallback>{v.initials as string}</AvatarFallback>
      </Avatar>
    )
  },
  code: (v: PlaygroundValues) => {
    const attrs = [`size="${v.size}"`, `color="${v.color}"`, `tone="${v.tone}"`, `shape="${v.shape}"`]
    if (v.status !== "none") attrs.push(`status="${v.status}"`)
    return `<Avatar ${attrs.join(" ")}>\n  <AvatarFallback>${v.initials}</AvatarFallback>\n</Avatar>`
  },
}

export function AvatarDefaultPreview({ imageSrc }: { imageSrc: string }) {
  return (
    <ComponentPreview
      code={`import {\n  Avatar,\n  AvatarFallback,\n  AvatarImage,\n} from "@maxa/ui"\n\n<Avatar color="blue">\n  <AvatarImage alt="Igor Stetsenko" src="/avatar.png" />\n  <AvatarFallback>IS</AvatarFallback>\n</Avatar>`}
      playground={AVATAR_PLAYGROUND}
    >
      <div style={row}>
        <Avatar color="blue">
          <AvatarImage alt="Igor Stetsenko" src={imageSrc} />
          <AvatarFallback>IS</AvatarFallback>
        </Avatar>
        <Avatar color="teal" shape="square">
          <AvatarFallback>MW</AvatarFallback>
        </Avatar>
      </div>
    </ComponentPreview>
  )
}
