"use client"

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type DialogSize = "sm" | "md" | "lg"

const DIALOG_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "size",
      options: [
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
        { label: "lg", value: "lg" },
      ],
      default: "lg",
    },
    { type: "text", name: "trigger", default: "Edit list settings" },
    { type: "text", name: "title", default: "Edit List Settings" },
    { type: "boolean", name: "description", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <Dialog>
      <DialogTrigger className="maxa-button maxa-button--outline maxa-button--md">
        {v.trigger as string}
      </DialogTrigger>
      <DialogContent size={v.size as DialogSize}>
        <DialogHeader>
          <DialogTitle>{v.title as string}</DialogTitle>
          {v.description ? (
            <DialogDescription>Update the settings for this list.</DialogDescription>
          ) : null}
          <DialogClose aria-label="Close" />
        </DialogHeader>
        <DialogBody>
          <Input label="List name" defaultValue="Interested homeowners" />
        </DialogBody>
        <DialogFooter>
          <DialogClose inline className="maxa-button maxa-button--secondary maxa-button--md">
            Cancel
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  code: (v: PlaygroundValues) => {
    const lines = [
      `<Dialog>`,
      `  <DialogTrigger className="maxa-button maxa-button--outline maxa-button--md">${v.trigger}</DialogTrigger>`,
      `  <DialogContent size="${v.size}">`,
      `    <DialogHeader>`,
      `      <DialogTitle>${v.title}</DialogTitle>`,
    ]
    if (v.description) lines.push(`      <DialogDescription>Update the settings for this list.</DialogDescription>`)
    lines.push(
      `      <DialogClose aria-label="Close" />`,
      `    </DialogHeader>`,
      `    <DialogBody>`,
      `      <Input label="List name" defaultValue="Interested homeowners" />`,
      `    </DialogBody>`,
      `    <DialogFooter>`,
      `      <DialogClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DialogClose>`,
      `      <Button>Save Changes</Button>`,
      `    </DialogFooter>`,
      `  </DialogContent>`,
      `</Dialog>`,
    )
    return lines.join("\n")
  },
}

export function DialogDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Dialog>\n  <DialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Edit list settings</DialogTrigger>\n  <DialogContent size="lg">\n    <DialogHeader>\n      <DialogTitle>Edit List Settings</DialogTitle>\n      <DialogClose aria-label="Close" />\n    </DialogHeader>\n    <DialogBody>\n      <Input label="List name" defaultValue="Interested homeowners" />\n    </DialogBody>\n    <DialogFooter>\n      <DialogClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DialogClose>\n      <Button>Save Changes</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`}
      playground={DIALOG_PLAYGROUND}
    >
      <div style={{ padding: "32px" }}>
        <Dialog>
          <DialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Edit list settings</DialogTrigger>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle>Edit List Settings</DialogTitle>
              <DialogClose aria-label="Close" />
            </DialogHeader>
            <DialogBody>
              <Input label="List name" defaultValue="Interested homeowners" />
            </DialogBody>
            <DialogFooter>
              <DialogClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DialogClose>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ComponentPreview>
  )
}
