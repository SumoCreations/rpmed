import { useRgaQuery } from '../../../schema'

export const useRGA = (rgaId: string) => {
  const { loading, data, refetch, networkStatus } = useRgaQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: { rgaId },
  })
  const rga = data && data.response && data.response.rga
  const errors = data && data.response && data.response.errors
  const success = data && data.response && data.response.success
  return {
    data,
    errors,
    loading: loading || networkStatus === 1,
    refetch,
    rga,
    success,
  }
}
