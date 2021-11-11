import React from 'react'

export interface ProgressProps {
  progress?: number
}

const PROGRESS_BAR_STYLES =
  'absolute top-0 left-0 flex p-1 bg-gray-400 bg-opacity-25 w-full rounded'
const METER_STYLES = 'flex bg-actionable rounded'

export const Progress: React.FC<ProgressProps> = ({ progress = 0 }) => (
  <div className={PROGRESS_BAR_STYLES}>
    <span
      className={METER_STYLES}
      style={{ width: `${progress ?? 0}%`, height: '4px' }}
    />
    <progress max="100" value={progress} className="absolute opacity-0" />
  </div>
)
