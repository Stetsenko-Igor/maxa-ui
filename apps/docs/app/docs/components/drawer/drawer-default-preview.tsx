"use client"

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type DrawerSide = "left" | "right" | "top" | "bottom"
type DrawerSize = "sm" | "md" | "lg"

const DRAWER_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "side",
      options: [
        { label: "right", value: "right" },
        { label: "left", value: "left" },
        { label: "top", value: "top" },
        { label: "bottom", value: "bottom" },
      ],
      default: "right",
    },
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
    { type: "text", name: "trigger", default: "Edit package" },
    { type: "text", name: "title", default: "Package Settings" },
  ],
  render: (v: PlaygroundValues) => (
    <Drawer>
      <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">
        {v.trigger as string}
      </DrawerTrigger>
      <DrawerContent side={v.side as DrawerSide} size={v.size as DrawerSize}>
        <DrawerHeader>
          <DrawerTitle>{v.title as string}</DrawerTitle>
          <DrawerDescription>Update metadata and visibility.</DrawerDescription>
          <DrawerClose aria-label="Close" />
        </DrawerHeader>
        <DrawerBody>
          <Input label="Package name" defaultValue="Listing Package" />
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose inline className="maxa-button maxa-button--secondary maxa-button--md">
            Cancel
          </DrawerClose>
          <Button>Save Changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  code: (v: PlaygroundValues) =>
    [
      `<Drawer>`,
      `  <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">${v.trigger}</DrawerTrigger>`,
      `  <DrawerContent side="${v.side}" size="${v.size}">`,
      `    <DrawerHeader>`,
      `      <DrawerTitle>${v.title}</DrawerTitle>`,
      `      <DrawerDescription>Update metadata and visibility.</DrawerDescription>`,
      `      <DrawerClose aria-label="Close" />`,
      `    </DrawerHeader>`,
      `    <DrawerBody>`,
      `      <Input label="Package name" defaultValue="Listing Package" />`,
      `    </DrawerBody>`,
      `    <DrawerFooter>`,
      `      <DrawerClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DrawerClose>`,
      `      <Button>Save Changes</Button>`,
      `    </DrawerFooter>`,
      `  </DrawerContent>`,
      `</Drawer>`,
    ].join("\n"),
}

export function DrawerDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Drawer>\n  <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">Edit package</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Package Settings</DrawerTitle>\n      <DrawerDescription>Update metadata and visibility.</DrawerDescription>\n      <DrawerClose aria-label="Close" />\n    </DrawerHeader>\n    <DrawerBody>\n      <Input label="Package name" defaultValue="Listing Package" />\n    </DrawerBody>\n    <DrawerFooter>\n      <DrawerClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DrawerClose>\n      <Button>Save Changes</Button>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>`}
      playground={DRAWER_PLAYGROUND}
    >
      <div style={{ padding: "32px" }}>
        <Drawer>
          <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">Edit package</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Package Settings</DrawerTitle>
              <DrawerDescription>Update metadata and visibility.</DrawerDescription>
              <DrawerClose aria-label="Close" />
            </DrawerHeader>
            <DrawerBody>
              <Input label="Package name" defaultValue="Listing Package" />
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DrawerClose>
              <Button>Save Changes</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </ComponentPreview>
  )
}
