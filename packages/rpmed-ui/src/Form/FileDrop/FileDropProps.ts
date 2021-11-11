export interface Endpoint {
  downloadUrl: string
  uploadUrl: string
  id: string
}

export interface FileDetail {
  name: string
  contentType: string
}

export type FileToEndpointFn = (files: FileDetail[]) => Promise<Endpoint[]>

export interface IUploadsDataShape {
  id: string
  url: string
}

export interface IUploadsInput {
  keys: string[]
}

export enum FileUploadStatus {
  Available = 'AVAILABLE',
  Pending = 'PENDING',
  Deleted = 'DELETED',
}

export interface Attachment {
  id: string
  name?: string | null | undefined
  downloadUrl?: string | null | undefined
  position?: number | null | undefined
}

export interface FilePreview extends Attachment {
  uploadURL?: string | null
  status: FileUploadStatus
  file?: File
}

export interface IUploadableAttachment extends Attachment {
  uploadURL?: string | null
  status?: FileUploadStatus
  file?: File
}

export type HandleAssociatedFileUpdateFn = (previews: FilePreview[]) => void

export type HandleFilesFn = (files: FileDetail[]) => Promise<Endpoint[]>
export type HandleFilePositionsFn = (positions: FilePreview[]) => void
export type HandleNewFilesFn = (files: FilePreview[]) => void
export type HandleFileUploadFn = (file: FilePreview) => void
export type HandleDeleteFn = (file: FilePreview) => void
export type HandleFileUploadErrorFn = (e: Error) => void

export interface IFileDropViewProps {
  /**
   * A callback when the internal sorting of the file drop has been
   * updated.
   */
  onFinishSort: HandleFilePositionsFn
  /**
   * A callback that is triggered when a new file has been added.
   */
  onAdd: HandleNewFilesFn
  /**
   * A callback that is triggered when a file has finished uploading.
   */
  onUpload: HandleFileUploadFn
  /**
   * Any existing files that should be used to prepopulate the list
   * of the sortable component.
   */
  previews: FilePreview[]
}

export interface IFileDropProps extends IFileDropViewProps {
  /**
   * Various filetypes that will be whitelisted when uploading files.
   */
  accept?: string[]
  /**
   * A callback that is fired when dropZone recieves new files. This
   * is an ideal time to generate a signed S3 URL or similar solution
   * so that the filedrop component can upload the files.
   */
  handleFileKeys: HandleFilesFn
  /**
   * A callback that is triggered when a file is deleted. This is an
   * ideal time to persist a delete update against your API.
   */
  onDelete?: HandleDeleteFn
  /**
   * A unique id identifying this drop field.
   */
  id: string
}
