"use client"

import { Copy, DotsThreeVertical, PencilSimple } from "@maxa/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  UtilityButton,
} from "@maxa/ui"

interface TableRowActionsProps {
  menu?: boolean
}

export function TableRowActions({ menu = false }: TableRowActionsProps) {
  return (
    <span className="maxa-table__row-actions">
      <UtilityButton aria-label="Edit design" className="maxa-table__row-action" icon={<PencilSimple />} size="sm" />
      <UtilityButton aria-label="Copy design" className="maxa-table__row-action" icon={<Copy />} size="sm" />
      {menu ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UtilityButton aria-label="Open row actions" className="maxa-table__row-action" icon={<DotsThreeVertical />} size="sm" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Open design</DropdownMenuItem>
            <DropdownMenuItem>Edit design</DropdownMenuItem>
            <DropdownMenuItem>Copy design</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <UtilityButton aria-label="Open row actions" className="maxa-table__row-action" icon={<DotsThreeVertical />} size="sm" />
      )}
    </span>
  )
}
