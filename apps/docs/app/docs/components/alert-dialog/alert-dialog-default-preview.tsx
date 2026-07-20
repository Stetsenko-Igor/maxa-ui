"use client"

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type AlertDialogSize = "sm" | "md" | "lg"

const ALERT_DIALOG_PLAYGROUND: PlaygroundConfig = {
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
    { type: "text", name: "trigger", default: "Delete list" },
    { type: "text", name: "title", default: "Delete List" },
    { type: "text", name: "confirm", default: "Delete List" },
  ],
  render: (v: PlaygroundValues) => (
    <AlertDialog>
      <AlertDialogTrigger className="maxa-button maxa-button--outline maxa-button--md">
        {v.trigger as string}
      </AlertDialogTrigger>
      <AlertDialogContent size={v.size as AlertDialogSize}>
        <AlertDialogHeader>
          <AlertDialogTitle>{v.title as string}</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          <AlertDialogCancel aria-label="Close" />
        </AlertDialogHeader>
        <AlertDialogBody>
          You are about to delete <strong>Interested homeowners</strong>. All audience rules and saved recipients will be removed.
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel inline className="maxa-button maxa-button--secondary maxa-button--md">
            Cancel
          </AlertDialogCancel>
          <Button variant="destructive">{v.confirm as string}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  code: (v: PlaygroundValues) =>
    [
      `<AlertDialog>`,
      `  <AlertDialogTrigger className="maxa-button maxa-button--outline maxa-button--md">${v.trigger}</AlertDialogTrigger>`,
      `  <AlertDialogContent size="${v.size}">`,
      `    <AlertDialogHeader>`,
      `      <AlertDialogTitle>${v.title}</AlertDialogTitle>`,
      `      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>`,
      `      <AlertDialogCancel aria-label="Close" />`,
      `    </AlertDialogHeader>`,
      `    <AlertDialogBody>Destructive confirmation copy goes here.</AlertDialogBody>`,
      `    <AlertDialogFooter>`,
      `      <AlertDialogCancel inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</AlertDialogCancel>`,
      `      <Button variant="destructive">${v.confirm}</Button>`,
      `    </AlertDialogFooter>`,
      `  </AlertDialogContent>`,
      `</AlertDialog>`,
    ].join("\n"),
}

export function AlertDialogDefaultPreview() {
  return (
    <ComponentPreview
      code={`<AlertDialog>\n  <AlertDialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Delete list</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete List</AlertDialogTitle>\n      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>\n      <AlertDialogCancel aria-label="Close" />\n    </AlertDialogHeader>\n    <AlertDialogBody>\n      You are about to delete <strong>Interested homeowners</strong>. All audience rules and saved recipients will be removed.\n    </AlertDialogBody>\n    <AlertDialogFooter>\n      <AlertDialogCancel inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</AlertDialogCancel>\n      <Button variant="destructive">Delete List</Button>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`}
      playground={ALERT_DIALOG_PLAYGROUND}
    >
      <div style={{ padding: "32px" }}>
        <AlertDialog>
          <AlertDialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Delete list</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete List</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
              <AlertDialogCancel aria-label="Close" />
            </AlertDialogHeader>
            <AlertDialogBody>
              You are about to delete <strong>Interested homeowners</strong>. All audience rules and saved recipients will be removed.
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogCancel inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</AlertDialogCancel>
              <Button variant="destructive">Delete List</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ComponentPreview>
  )
}
