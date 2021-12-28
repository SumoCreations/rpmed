import React, { useRef } from 'react'
import { Flex } from 'rebass'
import { Button } from '../Form'
import { Text } from './Text'
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
    <Flex marginTop={2}>
      <Flex width={1} marginRight={2}>
        <Text
          ref={urlInput}
          value={value}
          onFocus={handleFocus}
          onChange={handleChange}
          onMouseUp={handleMouse}
        />
      </Flex>
      <Button onClick={handleCopyClick}>
        <FontAwesomeIcon icon={faClipboard} />
      </Button>
    </Flex>
  )
}
