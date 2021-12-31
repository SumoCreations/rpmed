import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import { GridMenu } from './GridMenu'
import { Section, useFindPageWithSlugQuery } from 'rpmed-schema'

const PageView: React.FC = () => {
  const { slug = 'root' } = useParams<{ slug: string }>()
  const { data } = useFindPageWithSlugQuery({
    variables: {
      slug,
    },
  })

  const navigate = useNavigate()
  const handleSelectedItem = (link?: string) => navigate(link ?? '#')
  const page = data?.response.page
  const defaultTrail = { label: 'Resource Center', url: '/' }
  return (
    <article className="flex flex-col w-full">
      <BreadCrumb
        trail={
          slug === 'root'
            ? [defaultTrail]
            : [
                defaultTrail,
                {
                  label: page?.title ?? '...',
                  to: `/${slug}`,
                },
              ]
        }
      />
      <h1 className="text-xl font-bold mb-2">
        {page?.title ?? 'Resource Center'}
      </h1>
      <GridMenu
        currentPage={slug}
        sections={(page?.sections ?? []) as Section[]}
        onItemSelect={handleSelectedItem}
        handleExternalUrls={true}
      />
    </article>
  )
}

export default PageView
