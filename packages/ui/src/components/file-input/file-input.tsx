"use client"

import * as React from "react"
import { UploadSimple } from "@maxa/icons"
import { useFieldId } from "@maxa/hooks"
import "./file-input.css"
import { cn } from "../../lib/cn.js"

export type FileInputSize = "sm" | "md" | "lg"
export type FileInputVisualState = "default" | "hover" | "focus" | "dragging" | "error" | "disabled"

export interface FileInputRejectedFile {
  file: File
  reason: "max-files" | "max-size"
}

type FileInputNativeProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "size"
  | "value"
  | "defaultValue"
  | "onChange"
  | "title"
  | "onDragEnter"
  | "onDragOver"
  | "onDragLeave"
  | "onDrop"
>

export interface FileInputProps extends FileInputNativeProps {
  label?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  icon?: React.ReactNode
  size?: FileInputSize
  visualState?: FileInputVisualState
  files?: File[]
  defaultFiles?: File[]
  maxFiles?: number
  maxSize?: number
  enableDropzone?: boolean
  wrapperClassName?: string
  onFilesChange?: (files: File[]) => void
  onFilesReject?: (rejections: FileInputRejectedFile[]) => void
  onDragEnter?: React.DragEventHandler<HTMLDivElement>
  onDragOver?: React.DragEventHandler<HTMLDivElement>
  onDragLeave?: React.DragEventHandler<HTMLDivElement>
  onDrop?: React.DragEventHandler<HTMLDivElement>
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB"] as const
  let value = bytes / 1024
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`
}

function validateFiles(files: File[], maxFiles: number | undefined, maxSize: number | undefined) {
  const accepted: File[] = []
  const rejected: FileInputRejectedFile[] = []

  for (const file of files) {
    if (maxFiles !== undefined && accepted.length >= maxFiles) {
      rejected.push({ file, reason: "max-files" })
      continue
    }
    if (maxSize !== undefined && file.size > maxSize) {
      rejected.push({ file, reason: "max-size" })
      continue
    }
    accepted.push(file)
  }

  return { accepted, rejected }
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      id,
      className,
      wrapperClassName,
      label,
      title = "Choose files",
      description = "Drag and drop files here, or click to browse.",
      hint,
      error,
      required,
      icon,
      size = "md",
      visualState,
      files,
      defaultFiles,
      maxFiles,
      maxSize,
      multiple,
      disabled,
      enableDropzone = true,
      onFilesChange,
      onFilesReject,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      ...inputProps
    },
    ref,
  ) => {
    const inputId = useFieldId(id)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [uncontrolledFiles, setUncontrolledFiles] = React.useState<File[]>(defaultFiles ?? [])
    const [dragging, setDragging] = React.useState(false)
    const [focused, setFocused] = React.useState(false)

    const selectedFiles = files ?? uncontrolledFiles
    const hasError = Boolean(error)
    const resolvedVisualState = disabled ? "disabled"
      : hasError ? "error"
      : dragging ? "dragging"
      : focused ? "focus"
      : visualState && visualState !== "default" ? visualState
      : "default"
    const descriptionId = hint || error || description || selectedFiles.length > 0 ? `${inputId}-description` : undefined
    const titleId = `${inputId}-title`

    function commitFiles(nextFiles: File[]) {
      const limitedByMultiple = multiple ? nextFiles : nextFiles.slice(0, 1)
      const { accepted, rejected } = validateFiles(limitedByMultiple, maxFiles, maxSize)
      if (files === undefined) setUncontrolledFiles(accepted)
      onFilesChange?.(accepted)
      if (rejected.length > 0) onFilesReject?.(rejected)
    }

    function setInputRef(node: HTMLInputElement | null) {
      inputRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    function openFilePicker() {
      if (disabled) return
      inputRef.current?.click()
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.key !== "Enter" && event.key !== " ") return
      event.preventDefault()
      openFilePicker()
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      commitFiles(Array.from(event.currentTarget.files ?? []))
    }

    function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
      onDragEnter?.(event)
      if (disabled || !enableDropzone || event.defaultPrevented) return
      event.preventDefault()
      setDragging(true)
    }

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
      onDragOver?.(event)
      if (disabled || !enableDropzone || event.defaultPrevented) return
      event.preventDefault()
      event.dataTransfer.dropEffect = "copy"
      setDragging(true)
    }

    function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
      onDragLeave?.(event)
      if (disabled || !enableDropzone || event.defaultPrevented) return
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setDragging(false)
      }
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
      onDrop?.(event)
      if (disabled || !enableDropzone || event.defaultPrevented) return
      event.preventDefault()
      setDragging(false)
      commitFiles(Array.from(event.dataTransfer.files))
    }

    return (
      <div
        className={cn(
          "maxa-file-input",
          `maxa-file-input--${size}`,
          `maxa-file-input--${resolvedVisualState}`,
          disabled && "maxa-file-input--disabled",
          wrapperClassName,
        )}
      >
        {label && (
          <div className="maxa-file-input__label-row">
            <label htmlFor={inputId} className="maxa-file-input__label">
              {label}
            </label>
            {required && <span className="maxa-file-input__required">*</span>}
          </div>
        )}

        <div
          className={cn("maxa-file-input__surface", className ?? "")}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-invalid={hasError || undefined}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onClick={openFilePicker}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          data-dragging={dragging || undefined}
        >
          <input
            ref={setInputRef}
            id={inputId}
            type="file"
            className="maxa-file-input__native"
            multiple={multiple}
            disabled={disabled}
            required={required}
            aria-hidden="true"
            tabIndex={-1}
            onChange={handleInputChange}
            {...inputProps}
          />
          <span className="maxa-file-input__icon" aria-hidden="true">
            {icon ?? <UploadIcon />}
          </span>
          <span className="maxa-file-input__content">
            <span id={titleId} className="maxa-file-input__title">{title}</span>
            {description && <span className="maxa-file-input__description">{description}</span>}
          </span>
        </div>

        {(hint || error || selectedFiles.length > 0) && (
          <div id={descriptionId} className="maxa-file-input__footer">
            {(hint || error) && (
              <span className="maxa-file-input__hint" role={error ? "alert" : undefined}>
                {error ?? hint}
              </span>
            )}
            {selectedFiles.length > 0 && (
              <ul className="maxa-file-input__files" aria-label="Selected files">
                {selectedFiles.map((file) => (
                  <li key={`${file.name}-${file.size}-${file.lastModified}`} className="maxa-file-input__file">
                    <span className="maxa-file-input__file-name">{file.name}</span>
                    <span className="maxa-file-input__file-size">{formatBytes(file.size)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )
  },
)

FileInput.displayName = "FileInput"

export { FileInput }

function UploadIcon() {
  return <UploadSimple width="100%" height="100%" aria-hidden focusable={false} />
}
