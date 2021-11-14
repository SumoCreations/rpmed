import { Rga, RgasQueryVariables, useRgasQuery } from 'rpmed-schema'

export const useRGAs = ({ status }: RgasQueryVariables) => {
  const { data, error, loading } = useRgasQuery({
    variables: { status },
    fetchPolicy: 'network-only',
  })

  const rgas = ((data && data.response && data.response.rgas) || []) as Rga[]
  const errors = data && data.response && data.response.errors
  return { loading, data, errors, error, rgas }
}
