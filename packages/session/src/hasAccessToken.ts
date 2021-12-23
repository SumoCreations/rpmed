import { isEmpty } from 'validator'
import { getAccessToken } from './getAccessToken'

export const hasAccessToken = () => !isEmpty(getAccessToken())
