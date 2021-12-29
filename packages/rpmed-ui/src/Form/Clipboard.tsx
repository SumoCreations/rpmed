import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/pro-solid-svg-icons'

export const Clipboard: React.FC<{ value?: string }> = ({ value }) => {
  const urlInput = useRef<HTMLInputElement>(null)

  const selectText = (el: HTMLInputElement | null) => {
    el?.select()
    el?.setSelectionRange(0, el?.value.length ?? 99999)
  }

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = e =>
    selectText(e.currentTarget)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    selectText(e.currentTarget)
  const handleMouse: React.MouseEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    selectText(e.currentTarget)
  }

  const handleCopyClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    selectText(urlInput.current)
    document.execCommand('copy')
  }

  return (
    <p className="mt-2 flex">
      <input
        className="flex flex-grow"
        ref={urlInput}
        value={value}
        onFocus={handleFocus}
        onChange={handleChange}
        onMouseUp={handleMouse}
      />
      <button
        onClick={handleCopyClick}
        className="flex bg-button text-white font-bold text-lg"
      >
        <FontAwesomeIcon icon={faClipboard} className="m-auto" />
      </button>
    </p>
  )
}
