import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { Content, Layout } from 'rpmed-ui/lib/V1'

const View: React.FC<RouteComponentProps<{}>> = () => {
  return (
    <Layout.Layout>
      <Helmet title="Battery Recycling" />
      <Content>
        <div>
          <h1>Battery Recycling</h1>
          <h2>There are several requests...</h2>
        </div>
      </Content>
    </Layout.Layout>
  )
}

export const BatteryRecyclingIndexView = View
