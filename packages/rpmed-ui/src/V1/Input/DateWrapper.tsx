import { transparentize } from 'polished'
import * as React from 'react'
import DayPicker from 'react-day-picker'
import styled from '../styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
`

const Button = styled.button`
  opacity: 0;
  border: 0;
  background: transparent;
  display: flex;
  cursor: pointer;
  padding: 0.5rem;
  flex-shrink: 0;
  flex-grow: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Dropdown = styled.div`
  background: ${(p) => p.theme.colorContentAreaBackground};
  border: 1px solid ${(p) => p.theme.colorButtonPrimary};
  box-shadow: 2px 2px 0
    ${(p) => transparentize(0.75)(p.theme.colorButtonPrimary)};
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 2;
`

const Dismiss = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: ${(p) => transparentize(0.9)(p.theme.colorPrimary)};
  height: 100vh;
  width: 100vw;
`

interface IRegisteredFieldProps {
  selectedDate: Date
  onDismiss?: React.MouseEventHandler
  onSelectDate: (date: Date) => void
}

const { useState } = React

export const DateSelect: React.FC<IRegisteredFieldProps> = ({
  selectedDate,
  onSelectDate,
  onDismiss,
  children,
}) => {
  const [dateFocused, setDateFocused] = useState(false)
  const toggleDatePicker = () => setDateFocused(!dateFocused)
  const dateSelectHandler = (date: Date) => {
    toggleDatePicker()
    onSelectDate(date)
  }
  const dismissHandler: React.MouseEventHandler = (e) => {
    if (onDismiss) {
      onDismiss(e)
    }
    toggleDatePicker()
  }
  return (
    <React.Fragment>
      <Wrapper>
        <Button onClick={toggleDatePicker} type="button">
          Select Date
        </Button>
        {children}
        {dateFocused ? (
          <Dropdown>
            <DayPicker
              selectedDays={selectedDate}
              onDayClick={dateSelectHandler}
            />
          </Dropdown>
        ) : null}
      </Wrapper>
      {dateFocused ? <Dismiss onClick={dismissHandler} /> : null}
    </React.Fragment>
  )
}
