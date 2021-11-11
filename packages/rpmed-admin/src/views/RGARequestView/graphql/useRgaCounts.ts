import { useRgaCountsQuery } from '../../../schema'

export const useRgaCounts = () => {
  const { data, error, loading } = useRgaCountsQuery({
    fetchPolicy: 'network-only',
  })

  const counts = data && data.rgaCount
  const errors = data && data.rgaCount && data.rgaCount.errors
  const success = data && data.rgaCount && data.rgaCount.success
  return { loading, data, errors, error, counts, success }
}
