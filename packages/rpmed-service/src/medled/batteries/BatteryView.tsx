import * as React from 'react'
import { Helmet } from 'react-helmet'
import { BreadCrumb, ContentMainHeading, TextFormContent, View } from 'rpmed-ui'
import { BatteryForm } from './BatteryForm'

const BatteryView: React.FC<{}> = () => (
  <View>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MedLED® Battery Recycling Program - Riverpoint Medical</title>
    </Helmet>
    <BreadCrumb.Container>
      <BreadCrumb.Link to="/medled/batteries" primary={true}>
        Battery Recycling
      </BreadCrumb.Link>
    </BreadCrumb.Container>
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
      <BatteryForm />
    </TextFormContent>
  </View>
)

export default BatteryView
