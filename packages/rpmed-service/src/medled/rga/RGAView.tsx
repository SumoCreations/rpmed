import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import { ContentMainHeading, View } from 'rpmed-ui/lib/V1'
import { CreateRgaView } from './CreateRgaView'
import { RgaDetailView } from './RgaDetailView'

const RGAView: React.FC = () => {
  return (
    <View>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Request an RGA - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: 'MedLED®', to: '/medled' },
          { label: 'RGA', to: '/medled/rga' },
        ]}
      />
      <ContentMainHeading>Return Good Authorization Request</ContentMainHeading>
      <Switch>
        <Route path="/medled/rga/" exact={true}>
          <CreateRgaView />
        </Route>
        <Route path="/medled/rga/:id">
          <RgaDetailView />
        </Route>
      </Switch>
    </View>
  )
}

export default RGAView
