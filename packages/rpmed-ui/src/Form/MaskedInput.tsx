import React, { useCallback, useState } from "react"
import { useSharedRef } from "utils"
import { Input, InputProps } from "./Input"

export type MaskFormat = "phone" | "zip" | "date"

export interface MaskProps {
  format: MaskFormat
}

export type MaskedInputProps = InputProps & MaskProps

type MaskComponent = string | RegExp

const DATE_MASK = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]

const PHONE_NUMBER_MASK = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

const ZIP_CODE_MASK = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

/**
 * Provdes easy access to a predefined mask template.
 * @param mask An identifier for predefined mask template.
 */
const getMask = (mask: MaskFormat) => {
  switch (mask) {
    case "phone":
      return PHONE_NUMBER_MASK
    case "zip":
      return ZIP_CODE_MASK
    case "date":
      return DATE_MASK
  }
}

/**
 * Determines if the key entered is valid at a given index.
 * @param mask An array of mask rules.
 * @param index The current index in the string.
 * @param key The key to test
 */
const validAtIndex = (mask: MaskComponent[], index: number, key: string) =>
  typeof mask[index] === "string" || (mask[index] as RegExp).test(key)

/**
 * Applies a mask to an input string and returns the new value with the count of matches.
 * @param inputValue The current value of an input element.
 * @param mask An array of mask rules to apply against the value.
 */
const makeMaskedValue = (
  inputValue: string,
  mask: MaskComponent[]
): { value: string; matches: number } => {
  let matches = 0

  const preformattedValue = mask.reduce((p: string, m, i) => {
    if (typeof m === "string" && p[i] !== m) {
      return [p.slice(0, i), m, p.slice(i)].join("")
    }
    return p
  }, inputValue)

  const value = mask
    .map((m, i) => {
      if (typeof m === "string") {
        return m
      }
      const result = (m as RegExp).test(preformattedValue[i])
        ? preformattedValue[i]
        : " "
      if (result !== " ") {
        matches++
      }
      return result
    })
    .join("")
  return { value, matches }
}

/**
 * Determines the current index that user entered content should be inserted.
 * @param value The current value to test against the mask.
 * @param mask An array of mask rules to test.
 */
const getCursorIndex = (value: string, mask: MaskComponent[]) => {
  const index = mask
    .map(
      (m, i) =>
        (typeof m === "string" && m === value[i]) ||
        (m as RegExp).test(value[i])
    )
    .indexOf(false)
  return index > -1 ? index : mask.length
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ format, onFocus, ...props }, forwardedRef) => {
    const [direction, setDirection] = useState(
      "forward" as "forward" | "backward"
    )
    const inputEl = useSharedRef<HTMLInputElement | null>(null, [forwardedRef])
    const mask = getMask(format)

    const updateInputValue = useCallback(
      (value: string, cursorPosition: number) => {
        if (inputEl.current) {
          inputEl.current.value = value
          inputEl.current.setSelectionRange(
            cursorPosition,
            value.length,
            "forward"
          )
        }
      },
      [inputEl]
    )

    const applyFormat = useCallback(
      (inputVal?: string) => {
        const { value } = makeMaskedValue(inputVal ?? "", mask)
        if (direction === "forward" || inputVal?.length === 0) {
          const cursor = getCursorIndex(value, mask)
          updateInputValue(value, cursor)
        }
      },
      [mask, direction, updateInputValue]
    )

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      applyFormat(e.currentTarget?.value)
    }

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      applyFormat(inputEl.current?.value)
      if (onFocus) {
        onFocus(e)
      }
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      const cursorPos = e.currentTarget.selectionStart ?? 0
      const key = e.key
      setDirection(key.toLowerCase() === "backspace" ? "backward" : "forward")
      if (key.length > 1) {
        return // Bail on any sort of function or arrow key
      } else if (
        cursorPos >= mask.length ||
        !validAtIndex(mask, cursorPos, key)
      ) {
        e.preventDefault()
      }
    }

    return (
      <Input
        {...props}
        ref={inputEl}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
    )
  }
)

MaskedInput.displayName = "Form.MaskedInput"
