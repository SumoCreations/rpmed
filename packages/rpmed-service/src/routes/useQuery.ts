import queryString from 'query-string'
import { useNavigate, useLocation } from 'react-router-dom'

interface IIndexed {
  [key: string]: unknown
}

export const useQuery = <T extends IIndexed>() => {
  const location = useLocation()
  const navigate = useNavigate()
  const query: T = queryString.parse(location.search) as any
  return {
    search: query,
    set: (search: T, push?: boolean) =>
      navigate(`${location.pathname}?${queryString.stringify(search)}`, {
        replace: !push,
      }),
  }
}
