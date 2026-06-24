"use client"

import * as React from "react"
import { PatternFormat } from "react-number-format"

import { Input } from "./input.js"

import type { PatternFormatProps } from "react-number-format"
import type { InputProps } from "./input.js"

type InputWrapperProps = Omit<InputProps, "value" | "defaultValue" | "onChange" | "kind" | "type">

export type PhoneInputProps = InputWrapperProps & Omit<PatternFormatProps, keyof InputWrapperProps | "customInput" | "format"> & {
  format?: string
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ format = "(###) ###-####", mask = "_", ...props }, ref) => (
    <PatternFormat
      mask={mask}
      type="tel"
      customInput={Input as React.ComponentType<unknown>}
      getInputRef={ref}
      {...(props as React.ComponentProps<typeof PatternFormat>)}
      format={format}
    />
  ),
)

PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
