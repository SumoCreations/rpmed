import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Routes } from 'react-router-dom'
import { ContentMainHeading, View } from 'rpmed-ui/lib/V1'
import { CreateRgaView } from './CreateRgaView'
import { RgaDetailView } from './RgaDetailView'
import { useParams } from 'react-router-dom'
import { BreadCrumbFromPage } from '../../pages'

const RGAView: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <View>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Request an RGA - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumbFromPage
        slug={slug}
        trail={[{ label: 'RGA', to: `/${slug}/rga` }]}
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
