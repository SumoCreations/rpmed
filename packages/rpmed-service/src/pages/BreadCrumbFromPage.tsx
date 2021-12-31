import React from 'react'
import { useFindPageWithSlugQuery } from 'rpmed-schema'
import { BreadCrumb, BreadCrumbItem } from 'rpmed-ui'

export interface BreadCrumbFromPageProps {
  slug: string
  trail?: BreadCrumbItem[]
}

export const BreadCrumbFromPage: React.FC<BreadCrumbFromPageProps> = ({
  slug,
  trail = [],
}) => {
  const { data } = useFindPageWithSlugQuery({ variables: { slug } })
  return (
    <BreadCrumb
      trail={[
        { label: 'Resource Center', url: '/' },
        { label: data?.response.page?.title ?? '...', to: `/${slug}` },
        ...trail,
      ]}
    />
  )
}
