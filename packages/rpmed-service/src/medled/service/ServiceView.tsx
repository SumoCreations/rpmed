import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { ContentMainHeading, TextFormContent, View } from 'rpmed-ui/lib/V1'
import { ServiceForm } from 'rpmed-ui'
import { useParams } from 'react-router-dom'
import { BreadCrumbFromPage } from '../../pages'

const ServiceView: React.FC<{}> = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  return (
    <View>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Service Request - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumbFromPage
        slug={slug}
        trail={[{ label: 'Service Request', to: `/${slug}/service-request` }]}
      />
      <ContentMainHeading>MedLED® Service Request</ContentMainHeading>
      <TextFormContent>
        <p>
          <strong>48-Hour Turnaround with MedLED's Signature Service.</strong>
        </p>
        <ol>
          <li>
            <strong>
              <Link to="/medled/troubleshooting">
                Check with our Troubleshooting Guide
              </Link>
            </strong>{' '}
            to ensure your unit needs to be serviced. If you would like to{' '}
            <strong>Trade Up</strong> your headlight,{' '}
            <Link to="/contact">Contact Us</Link> for information.
          </li>
          <li>
            <strong>Obtain RGA number</strong> using form below to send unit in
            with.
          </li>
          <li>
            <strong>Ship your unit</strong> to us at: Riverpoint Medical, 825 NE
            25th Ave., Portland, OR 97232. As part of our{' '}
            <Link to="/medled/batteries">Battery Recycling Program</Link>, if
            you need new batteries (should be replaced every year), send in your
            batteries and we will recycle and replace with new batteries at no
            charge.
          </li>
          <li>
            <strong>
              We will repair within 24 hours, collect payment if outside of
              warranty, and ship back to you.
            </strong>
          </li>
        </ol>
        <ServiceForm
          onSubmit={async () => {
            return undefined
          }}
        />
      </TextFormContent>
    </View>
  )
}

export default ServiceView
