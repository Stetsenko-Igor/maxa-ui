"use client"

import * as React from "react"
import { NumericFormat } from "react-number-format"

import { Input } from "./input.js"

import type { NumericFormatProps } from "react-number-format"
import type { InputProps } from "./input.js"

type InputWrapperProps = Omit<InputProps, "value" | "defaultValue" | "onChange" | "kind" | "type">

export type NumberInputProps = InputWrapperProps & Omit<NumericFormatProps, keyof InputWrapperProps | "customInput">

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => (
  <NumericFormat
    customInput={Input as React.ComponentType<unknown>}
    getInputRef={ref}
    {...(props as React.ComponentProps<typeof NumericFormat>)}
  />
))

NumberInput.displayName = "NumberInput"

export { NumberInput }
