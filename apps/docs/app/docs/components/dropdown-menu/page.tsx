import type { Metadata } from "next"
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Dropdown Menu - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#item-variants", label: "Item variants" },
  { href: "#state-matrix", label: "State matrix" },
  { href: "#groups", label: "Groups" },
  { href: "#checked-items", label: "Checked items" },
  { href: "#submenus", label: "Submenus" },
  { href: "#api-reference", label: "API reference" },
]

const DROPDOWN_MENU_PROPS = [
  { name: "DropdownMenu", type: "Radix Root", default: undefined, description: "Root state container. Accepts open, defaultOpen, modal, and onOpenChange." },
  { name: "DropdownMenuTrigger", type: "Radix Trigger", default: undefined, description: "Trigger element. Use asChild with Button or IconButton." },
  { name: "DropdownMenuContent", type: "Component", default: undefined, description: "Styled floating action menu. Portaled by default." },
  { name: "side", type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: "Preferred side of the trigger to render against." },
  { name: "align", type: "'start' | 'center' | 'end'", default: "'center'", description: "Alignment along the chosen side." },
  { name: "sideOffset", type: "number", default: "6", description: "Distance in px between the trigger and content." },
  { name: "DropdownMenuItem", type: "Component", default: undefined, description: "Action row. Supports disabled, inset, onSelect, and variant='destructive'." },
  { name: "DropdownMenuCheckboxItem", type: "Component", default: undefined, description: "Menu item with checked state for toggled options." },
  { name: "DropdownMenuRadioGroup / RadioItem", type: "Component", default: undefined, description: "Single-choice group inside a menu." },
  { name: "DropdownMenuSub", type: "Radix Sub", default: undefined, description: "Nested menu for secondary action groups." },
  { name: "DropdownMenuShortcut", type: "span", default: undefined, description: "Right-aligned keyboard shortcut text inside an item." },
]

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
}

const matrix: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
  width: "100%",
  padding: "28px",
}

const matrixCell: React.CSSProperties = {
  display: "grid",
  gap: "8px",
}

const matrixTitle: React.CSSProperties = {
  margin: 0,
  color: "var(--color-text-tertiary)",
  fontSize: "var(--text-caption-sm)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "0.06em",
  lineHeight: "var(--text-caption-sm--line-height)",
  textTransform: "uppercase",
}

const staticMenuStyle: React.CSSProperties = {
  position: "relative",
}

const stateGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "88px repeat(4, minmax(150px, 1fr))",
  gap: "8px",
  width: "100%",
  minWidth: "840px",
  padding: "28px",
}

const stateLabel: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  color: "var(--color-text-secondary)",
  fontSize: "var(--text-caption-sm)",
  lineHeight: "var(--text-caption-sm--line-height)",
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  )
}

function UserRow({ name, detail }: { name: string; detail: string }) {
  return (
    <>
      <span className="maxa-dropdown-menu__avatar" aria-hidden="true">
        AV
      </span>
      <span className="maxa-dropdown-menu__item-content">
        <span className="maxa-dropdown-menu__item-title">{name}</span>
        <span className="maxa-dropdown-menu__item-meta">{detail}</span>
      </span>
    </>
  )
}

function InteractiveVariantMenus() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", padding: "28px 28px 0" }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Selectable</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuCheckboxItem>Text</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Selected</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Radiobutton</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup value="png">
            <DropdownMenuRadioItem value="pdf">PDF</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="png">PNG</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem><FileIcon />Export PDF</DropdownMenuItem>
          <DropdownMenuItem><CheckIcon />Mark complete</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Cancel request</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Select user</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuCheckboxItem>
            <UserRow name="Ava Wilson" detail="Design lead" />
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>
            <UserRow name="Mia Chen" detail="Concierge" />
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default function DropdownMenuPage() {
  return (
    <ComponentPage
      title="Dropdown Menu"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/dropdown-menu"
      markdown=""
      previous={{ href: "/docs/components/divider", label: "Divider" }}
      next={{ href: "/docs/components/icon-button", label: "Icon Button" }}
      lead={
        <>
          A triggered action menu for commands, grouped actions, shortcuts,
          checked menu items, and nested submenus. Use Select when the user is
          choosing a form value; use Dropdown Menu when the user is choosing an action.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@maxa/ui"\n\n<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Actions</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent align="end">\n    <DropdownMenuItem>Request design</DropdownMenuItem>\n    <DropdownMenuItem>Duplicate</DropdownMenuItem>\n    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`}>
            <div style={row}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Request design</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Actions</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Request design</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`}
        />
      </DocsSection>

      <DocsSection
        id="item-variants"
        title="Item Variants"
        description="The menu family includes plain text, icon rows, selectable rows, radio rows, submenus, metadata rows, title rows, and user rows."
      >
        <DocsExample title="Interactive variant sheet">
          <ComponentPreview
            layout="block"
            code={`<DropdownMenuCheckboxItem checked>Selectable</DropdownMenuCheckboxItem>\n<DropdownMenuRadioItem value="pdf">PDF</DropdownMenuRadioItem>\n<DropdownMenuItem><FileIcon /> With icon</DropdownMenuItem>\n<DropdownMenuSubTrigger>With dropdown</DropdownMenuSubTrigger>`}
          >
            <InteractiveVariantMenus />
            <div style={matrix}>
              <div style={matrixCell}>
                <p style={matrixTitle}>Selectable</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="unchecked">
                    <span className="maxa-dropdown-menu__indicator" aria-hidden="true"><CheckIcon /></span>
                    Text
                  </div>
                  <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="checked">
                    <span className="maxa-dropdown-menu__indicator" aria-hidden="true"><CheckIcon /></span>
                    Selected
                  </div>
                </div>
              </div>

              <div style={matrixCell}>
                <p style={matrixTitle}>Radiobutton</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--radio" data-state="unchecked">
                    <span className="maxa-dropdown-menu__indicator" aria-hidden="true" />
                    PDF
                  </div>
                  <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--radio" data-state="checked">
                    <span className="maxa-dropdown-menu__indicator" aria-hidden="true">
                      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4" /></svg>
                    </span>
                    PNG
                  </div>
                </div>
              </div>

              <div style={matrixCell}>
                <p style={matrixTitle}>Text</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__item">Request design</div>
                  <div className="maxa-dropdown-menu__item" data-disabled="">Template requests</div>
                  <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--destructive">Cancel request</div>
                </div>
              </div>

              <div style={matrixCell}>
                <p style={matrixTitle}>With icon</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__item"><FileIcon /> Export PDF</div>
                  <div className="maxa-dropdown-menu__item"><CheckIcon /> Mark complete</div>
                </div>
              </div>

              <div style={matrixCell}>
                <p style={matrixTitle}>With icon and dropdown</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__item"><FileIcon /> Share <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut></div>
                  <div className="maxa-dropdown-menu__item">More actions <ChevronDownIcon /></div>
                </div>
              </div>

              <div style={matrixCell}>
                <p style={matrixTitle}>Text + Text</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__item">
                    <span className="maxa-dropdown-menu__item-content">
                      <span className="maxa-dropdown-menu__item-title">Request design</span>
                      <span className="maxa-dropdown-menu__item-meta">Assigned to studio</span>
                    </span>
                  </div>
                </div>
              </div>

              <div style={matrixCell}>
                <p style={matrixTitle}>Title</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__label">Title</div>
                  <div className="maxa-dropdown-menu__item">Menu item</div>
                </div>
              </div>

              <div style={matrixCell}>
                <p style={matrixTitle}>Title + Links</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__label">Title</div>
                  <div className="maxa-dropdown-menu__item">Text <DropdownMenuShortcut>Link</DropdownMenuShortcut></div>
                  <div className="maxa-dropdown-menu__item">Text <DropdownMenuShortcut>Link</DropdownMenuShortcut></div>
                </div>
              </div>

              <div style={matrixCell}>
                <p style={matrixTitle}>Select User</p>
                <div className="maxa-dropdown-menu maxa-dropdown-menu--static-demo" style={staticMenuStyle}>
                  <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="unchecked">
                    <span className="maxa-dropdown-menu__indicator" aria-hidden="true"><CheckIcon /></span>
                    <UserRow name="Ava Wilson" detail="Design lead" />
                  </div>
                  <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="checked">
                    <span className="maxa-dropdown-menu__indicator" aria-hidden="true"><CheckIcon /></span>
                    <UserRow name="Mia Chen" detail="Concierge" />
                  </div>
                </div>
              </div>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="state-matrix"
        title="State Matrix"
        description="The visible states match the Figma dropdown reference: default, hover, pressed, disabled, error, and selected."
      >
        <DocsExample title="Default, hover, pressed, disabled, error, selected">
          <ComponentPreview
            layout="block"
            code={`Default: <DropdownMenuItem>Text</DropdownMenuItem>\nHover: data-highlighted\nPressed: data-state="open"\nDisabled: disabled\nError: variant="destructive"\nSelected: checked checkbox/radio item`}
          >
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div className="maxa-dropdown-menu--compact-demo" style={stateGrid}>
                <span />
                <p style={matrixTitle}>Selectable</p>
                <p style={matrixTitle}>Radiobutton</p>
                <p style={matrixTitle}>Text</p>
                <p style={matrixTitle}>With icon</p>

                <span style={stateLabel}>Default</span>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="unchecked"><span className="maxa-dropdown-menu__indicator"><CheckIcon /></span>Text</div>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--radio" data-state="unchecked"><span className="maxa-dropdown-menu__indicator" />Text</div>
                <div className="maxa-dropdown-menu__item">Text</div>
                <div className="maxa-dropdown-menu__item"><CheckIcon />Text</div>

                <span style={stateLabel}>Hover</span>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="unchecked" data-highlighted=""><span className="maxa-dropdown-menu__indicator"><CheckIcon /></span>Text</div>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--radio" data-state="unchecked" data-highlighted=""><span className="maxa-dropdown-menu__indicator" />Text</div>
                <div className="maxa-dropdown-menu__item" data-highlighted="">Text</div>
                <div className="maxa-dropdown-menu__item" data-highlighted=""><CheckIcon />Text</div>

                <span style={stateLabel}>Pressed</span>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="open"><span className="maxa-dropdown-menu__indicator"><CheckIcon /></span>Text</div>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--radio" data-state="open"><span className="maxa-dropdown-menu__indicator" />Text</div>
                <div className="maxa-dropdown-menu__item" data-state="open">Text</div>
                <div className="maxa-dropdown-menu__item" data-state="open"><CheckIcon />Text</div>

                <span style={stateLabel}>Disabled</span>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="unchecked" data-disabled=""><span className="maxa-dropdown-menu__indicator"><CheckIcon /></span>Text</div>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--radio" data-state="unchecked" data-disabled=""><span className="maxa-dropdown-menu__indicator" />Text</div>
                <div className="maxa-dropdown-menu__item" data-disabled="">Text</div>
                <div className="maxa-dropdown-menu__item" data-disabled=""><CheckIcon />Text</div>

                <span style={stateLabel}>Error</span>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox maxa-dropdown-menu__item--destructive" data-state="unchecked"><span className="maxa-dropdown-menu__indicator"><CheckIcon /></span>Text</div>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--radio maxa-dropdown-menu__item--destructive" data-state="unchecked"><span className="maxa-dropdown-menu__indicator" />Text</div>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--destructive">Text</div>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--destructive"><CheckIcon />Text</div>

                <span style={stateLabel}>Selected</span>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--checkbox" data-state="checked"><span className="maxa-dropdown-menu__indicator"><CheckIcon /></span>Text</div>
                <div className="maxa-dropdown-menu__item maxa-dropdown-menu__item--radio" data-state="checked"><span className="maxa-dropdown-menu__indicator"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4" /></svg></span>Text</div>
                <div className="maxa-dropdown-menu__item" data-highlighted="">Text</div>
                <div className="maxa-dropdown-menu__item" data-highlighted=""><CheckIcon />Text</div>
              </div>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="groups"
        title="Groups"
        description="Use labels, groups, separators, and shortcuts to structure action sets."
      >
        <DocsExample title="Labeled action groups">
          <ComponentPreview code={`<DropdownMenuContent align="end">\n  <DropdownMenuLabel>Requests</DropdownMenuLabel>\n  <DropdownMenuGroup>\n    <DropdownMenuItem>Request design <DropdownMenuShortcut>Cmd+R</DropdownMenuShortcut></DropdownMenuItem>\n    <DropdownMenuItem>Assign owner</DropdownMenuItem>\n  </DropdownMenuGroup>\n  <DropdownMenuSeparator />\n  <DropdownMenuItem variant="destructive">Cancel request</DropdownMenuItem>\n</DropdownMenuContent>`}>
            <div style={row}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Request menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Requests</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Request design
                      <DropdownMenuShortcut>Cmd+R</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Assign owner</DropdownMenuItem>
                    <DropdownMenuItem disabled>Template requests</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Cancel request</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="checked-items"
        title="Checked Items"
        description="Checkbox and radio items support lightweight view preferences inside a menu."
      >
        <DocsExample title="Checkbox and radio">
          <ComponentPreview code={`<DropdownMenuCheckboxItem checked>Show archived</DropdownMenuCheckboxItem>\n<DropdownMenuRadioGroup value="pdf">\n  <DropdownMenuRadioItem value="pdf">PDF</DropdownMenuRadioItem>\n  <DropdownMenuRadioItem value="png">PNG</DropdownMenuRadioItem>\n</DropdownMenuRadioGroup>`}>
            <div style={row}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Export options</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>
                    Include comments
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value="pdf">
                    <DropdownMenuRadioItem value="pdf">PDF</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="png">PNG</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="submenus"
        title="Submenus"
        description="Use submenus for secondary groups that should not crowd the first-level menu."
      >
        <DocsExample title="Nested actions">
          <ComponentPreview code={`<DropdownMenuSub>\n  <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>\n  <DropdownMenuSubContent>\n    <DropdownMenuItem>Email link</DropdownMenuItem>\n    <DropdownMenuItem>Copy link</DropdownMenuItem>\n  </DropdownMenuSubContent>\n</DropdownMenuSub>`}>
            <div style={row}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" iconTrailing={<ChevronDownIcon />}>More</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Open</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email link</DropdownMenuItem>
                      <DropdownMenuItem>Copy link</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={DROPDOWN_MENU_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
