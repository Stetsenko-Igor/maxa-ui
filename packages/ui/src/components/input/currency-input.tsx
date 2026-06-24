"use client"

import * as React from "react"

import { NumberInput } from "./number-input.js"

import type { NumberInputProps } from "./number-input.js"

export type CurrencyInputProps = NumberInputProps & {
  currencySymbol?: string
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currencySymbol = "$", thousandSeparator = ",", decimalScale = 2, fixedDecimalScale = true, prefix, ...props }, ref) => (
    <NumberInput
      ref={ref}
      thousandSeparator={thousandSeparator}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      prefix={prefix ?? currencySymbol}
      allowNegative={false}
      {...props}
    />
  ),
)

CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }
