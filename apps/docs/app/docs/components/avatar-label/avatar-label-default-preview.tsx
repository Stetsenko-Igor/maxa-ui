import { Avatar, AvatarFallback, AvatarLabel } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"

export function AvatarLabelDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Avatar, AvatarFallback, AvatarLabel } from "@maxa/ui"

<AvatarLabel
  avatar={
    <Avatar>
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  }
  label="Maxa Design"
  description="Product designer"
/>

<AvatarLabel
  avatar={
    <Avatar appearance="violet" emphasis="medium">
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  }
  label="Maxa Design"
  description="Product designer"
  href="/profile"
  aria-label="Open Maxa Design profile"
/>`}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          padding: "24px",
        }}
      >
        <AvatarLabel
          avatar={
            <Avatar>
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
          }
          label="Maxa Design"
          description="Product designer"
        />
        <AvatarLabel
          avatar={
            <Avatar appearance="violet" emphasis="medium">
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
          }
          label="Maxa Design"
          description="Product designer"
          href="/profile"
          aria-label="Open Maxa Design profile"
        />
      </div>
    </ComponentPreview>
  )
}
