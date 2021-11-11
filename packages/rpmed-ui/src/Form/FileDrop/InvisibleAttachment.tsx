import React, { useState, useEffect, useMemo } from 'react'
import { FileUploadStatus } from './FileDropProps'
import { FileUpload, FileUploadHandler } from './FileUpload'
import { Progress } from './Progress'

export const InvisibleAttachment: React.FC<{
  id: string
  file: File
  destination: string
  onStatusChange?: (status: FileUploadStatus) => void
}> = ({ id, file, destination, onStatusChange }) => {
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<FileUploadStatus | null>(null)
  const onUpload: FileUploadHandler = useMemo(
    () => (id, currentStatus, currentProgress) => {
      setProgress(currentProgress)
      if (currentStatus !== status) {
        setStatus(currentStatus)
        if (onStatusChange) {
          onStatusChange(currentStatus)
        }
      }
    },
    [status, setStatus, setProgress]
  )
  useEffect(() => {
    if (id !== uploadingId) {
      setUploadingId(id)
      FileUpload(id, file, destination, onUpload)
    }
  }, [file, destination, onUpload, useMemo])
  return <Progress progress={progress} />
}
