import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

interface IIndexed {
  [key: string]: unknown
}

export const useQuery = <T extends IIndexed>() => {
  const location = useLocation<T>()
  const history = useHistory()
  const query: T = queryString.parse(location.search) as any
  return {
    search: query,
    set: (search: T, push?: boolean) =>
      (push ? history.push : history.replace)(
        `${location.pathname}?${queryString.stringify(search)}`
      ),
  }
}
