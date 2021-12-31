import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Routes } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import { ContentMainHeading, View } from 'rpmed-ui/lib/V1'
import { CreateRgaView } from './CreateRgaView'
import { RgaDetailView } from './RgaDetailView'
import { useFindPageWithSlugQuery } from 'rpmed-schema'
import { useParams } from 'react-router-dom'

const RGAView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useFindPageWithSlugQuery({ variables: { slug } })

  return (
    <View>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Request an RGA - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: data?.pageBySlug.page?.title ?? '...', to: `/${slug}` },
          { label: 'RGA', to: `/${slug}/rga` },
        ]}
      />
      <ContentMainHeading>Return Good Authorization Request</ContentMainHeading>
      <Routes>
        <Route path="/medled/rga/">
          <CreateRgaView />
        </Route>
        <Route path="/medled/rga/:id">
          <RgaDetailView />
        </Route>
      </Routes>
    </View>
  )
}

export default RGAView
