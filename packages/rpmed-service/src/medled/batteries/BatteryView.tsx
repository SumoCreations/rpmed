import * as React from 'react'
import { Helmet } from 'react-helmet'
import { ContentMainHeading, TextFormContent, View } from 'rpmed-ui/lib/V1'
import { BreadCrumb, BatteryForm } from 'rpmed-ui'

const BatteryView: React.FC<{}> = () => (
  <View>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MedLED® Battery Recycling Program - Riverpoint Medical</title>
    </Helmet>
    <BreadCrumb
      trail={[
        { label: 'Resource Center', url: '/' },
        { label: 'MedLED®', to: '/medled' },
        { label: 'Battery Recycling Program', to: '/medled/batteries' },
      ]}
    />
    <ContentMainHeading>MedLED® Battery Recycling Program</ContentMainHeading>
    <TextFormContent>
      <p>
        <strong>Get Free Batteries.</strong>
      </p>
      <p>
        It's a two way street. Get your MedLED® Headlight batteries recycled
        here and get a fresh pair at no charge using our Recycling Program.
        Let's keep your battery life where you need it and save this planet
        together while we're at it!
      </p>
      <ol>
        <li>
          <strong>Email</strong> in a request below, wait to be contacted.
        </li>
        <li>
          <strong>Ship</strong> your batteries to us.
        </li>
        <li>
          <strong>Receive</strong> a new set within 5-7 business days.
          International customers subject to additional lead times.
        </li>
      </ol>
      <BatteryForm
        onSubmit={async () => {
          return undefined
        }}
      />
    </TextFormContent>
  </View>
)

export default BatteryView
