import { isOffline } from './isOffline'

/**
 * Returns the name of the appropriate bucket to target on
 * AWS S3 for file uploads.
 */
export const getUploadsBucket = () =>
  isOffline() ? 'rpmed-dev-uploads' : process.env.ATTACHED_IMAGES_BUCKET
