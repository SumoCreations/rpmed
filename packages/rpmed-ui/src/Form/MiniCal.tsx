import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { Icon } from './Icon'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-regular-svg-icons'

export interface MiniCalProps {
  /**
   * An initial date to display
   */
  initialDate?: string
  /**
   * A date selected on this widget
   */
  selectedDate?: string
  /**
   * The format the selected date should be rendered in. Defaults to "YYYY-MM-DD"
   */
  selectedDateFormat?: string
  /**
   * A callback that renders when a date on the calendar has been selected.
   */
  onDateSelected?: (date: string) => void
}

export const MiniCal: React.FC<MiniCalProps> = ({
  initialDate,
  selectedDate,
  onDateSelected: handleSelectedDate,
  selectedDateFormat = 'YYYY-MM-DD',
}) => {
  const [increment, setIncrement] = useState(0)

  const handleIncrementClick = (
    newIncrement: number
  ): React.MouseEventHandler => (e) => {
    e.preventDefault()
    setIncrement(increment + newIncrement)
  }

  useEffect(() => {
    setIncrement(0)
  }, [selectedDate, initialDate])

  const originDate = DateTime.fromISO(selectedDate ?? initialDate ?? '')
  const monthStart = (originDate.isValid
    ? originDate
    : DateTime.local().toUTC()
  )
    .startOf('month')
    .plus({ months: increment })

  const handleDateClick = (date: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    if (handleSelectedDate) {
      handleSelectedDate(date)
    }
  }

  return (
    <div className="p-2 px-4 h-full">
      <div className="flex flex-col">
        <nav className="flex mt-2 bg-white rounded px-2 mb-2">
          <button onClick={handleIncrementClick(-1)} className="p-2">
            <Icon icon={faChevronLeft} mode="secondary" />
          </button>
          <h3 className="text-sm font-semibold flex-grow text-center m-auto">
            {monthStart.toFormat('MMM, yyyy')}
          </h3>
          <button onClick={handleIncrementClick(1)} className="p-2">
            <Icon icon={faChevronRight} mode="secondary" />
          </button>
        </nav>
        {new Array(6).fill('').map((_, w) => {
          const start = monthStart.plus({ weeks: w }).startOf('week')
          return (
            <div className="grid grid-cols-7" key={`minical-week-${w}`}>
              {new Array(7).fill('').map((_, d) => {
                const day = start.plus({ days: d })
                const inMonth = monthStart.month === day.month
                return (
                  <li
                    className={`flex bg-gray-100 hover:bg-gray-300 transition duration-100 ease-out mb-1 ml-1 text-xs text-gray-${
                      inMonth ? 800 : 400
                    }`}
                    key={`${w}-${d}`}
                  >
                    <button
                      className="flex flex-grow p-1"
                      onClick={handleDateClick(
                        day.toFormat(selectedDateFormat)
                      )}
                    >
                      <span className="m-auto">{day.toFormat('D')}</span>
                    </button>
                  </li>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
