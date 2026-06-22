"use client"

import * as React from "react"
import { Image as ImageIcon, Lock, X } from "@maxa/icons"
import { useFieldId } from "@maxa/hooks"
import "./file-input.css"
import { cn } from "../../lib/cn.js"

export type FileInputSize = "sm" | "md" | "lg"
export type FileInputVisualState =
  | "default"
  | "hover"
  | "focus"
  | "filled"
  | "error"
  | "disabled"
  | "not-editable"

type FileInputNativeProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "defaultValue" | "onChange" | "title" | "placeholder"
>

export interface FileInputProps extends FileInputNativeProps {
  /** Visible label above the control. */
  label?: React.ReactNode
  /** Text inside the action button. */
  buttonLabel?: React.ReactNode
  /** Placeholder shown in the field when no file is chosen. */
  placeholder?: React.ReactNode
  /** Error text below the control; forces error styling and `role="alert"`. */
  error?: React.ReactNode
  /** Renders a required marker and sets the native input required state. */
  required?: boolean
  /** Optional element rendered next to the label (e.g. an info icon). */
  info?: React.ReactNode
  /** Icon inside the action button. */
  buttonIcon?: React.ReactNode
  /** Controls height, padding, and icon size. */
  size?: FileInputSize
  /** Controlled state preview for docs/tests. */
  visualState?: FileInputVisualState
  /** Read-only / locked state: shows a lock icon and blocks selection. */
  notEditable?: boolean
  /** Controlled selected file name. */
  fileName?: string
  /** Initial uncontrolled selected file name. */
  defaultFileName?: string
  /** Called with the selected file (or null when cleared). */
  onFileChange?: (file: File | null) => void
  /** Extra class for the outer wrapper. */
  wrapperClassName?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      id,
      className,
      wrapperClassName,
      label,
      buttonLabel = "Choose File",
      placeholder = "No File Chosen",
      error,
      required,
      info,
      buttonIcon,
      size = "md",
      visualState,
      notEditable = false,
      fileName,
      defaultFileName,
      disabled,
      onFileChange,
      ...inputProps
    },
    ref,
  ) => {
    const inputId = useFieldId(id)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [uncontrolledName, setUncontrolledName] = React.useState<string>(defaultFileName ?? "")

    const selectedName = fileName ?? uncontrolledName
    const hasError = Boolean(error)
    const locked = notEditable
    const interactionBlocked = disabled || locked

    const resolvedVisualState: FileInputVisualState = disabled
      ? "disabled"
      : locked
        ? "not-editable"
        : hasError
          ? "error"
          : selectedName
            ? "filled"
            : visualState && visualState !== "default"
              ? visualState
              : "default"

    const errorId = hasError ? `${inputId}-error` : undefined

    function setInputRef(node: HTMLInputElement | null) {
      inputRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    function openFilePicker() {
      if (interactionBlocked) return
      inputRef.current?.click()
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      const file = event.currentTarget.files?.[0] ?? null
      if (fileName === undefined) setUncontrolledName(file?.name ?? "")
      onFileChange?.(file)
    }

    function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation()
      if (inputRef.current) inputRef.current.value = ""
      if (fileName === undefined) setUncontrolledName("")
      onFileChange?.(null)
    }

    return (
      <div
        className={cn(
          "maxa-file-input",
          `maxa-file-input--${size}`,
          `maxa-file-input--${resolvedVisualState}`,
          interactionBlocked && "maxa-file-input--blocked",
          wrapperClassName,
        )}
      >
        {label && (
          <div className="maxa-file-input__label-row">
            <label htmlFor={inputId} className="maxa-file-input__label">
              {label}
              {required && <span className="maxa-file-input__required"> *</span>}
            </label>
            {info && <span className="maxa-file-input__info">{info}</span>}
          </div>
        )}

        {/* The native input is the real keyboard control (label-associated and
            focusable while visually hidden). The button and field are mouse
            affordances only — focus styling is driven by :focus-within. */}
        <div className={cn("maxa-file-input__control", className ?? "")}>
          <input
            ref={setInputRef}
            id={inputId}
            type="file"
            className="maxa-file-input__native"
            disabled={interactionBlocked}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={errorId}
            onChange={handleInputChange}
            {...inputProps}
          />
          <span
            className="maxa-file-input__button"
            onClick={openFilePicker}
            aria-hidden="true"
          >
            <span className="maxa-file-input__button-icon">
              {buttonIcon ?? <ImageIcon width="100%" height="100%" />}
            </span>
            <span className="maxa-file-input__button-label">{buttonLabel}</span>
          </span>
          <span className="maxa-file-input__field" onClick={openFilePicker}>
            <span
              className={
                selectedName
                  ? "maxa-file-input__filename"
                  : "maxa-file-input__placeholder"
              }
            >
              {selectedName || placeholder}
            </span>
            {locked ? (
              <span className="maxa-file-input__lock" aria-hidden="true">
                <Lock width="100%" height="100%" />
              </span>
            ) : (
              !interactionBlocked &&
              selectedName && (
                <button
                  type="button"
                  className="maxa-file-input__clear"
                  onClick={handleClear}
                  aria-label="Remove file"
                >
                  <X width="100%" height="100%" aria-hidden="true" />
                </button>
              )
            )}
          </span>
        </div>

        {hasError && (
          <p id={errorId} className="maxa-file-input__error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

FileInput.displayName = "FileInput"

export { FileInput }
