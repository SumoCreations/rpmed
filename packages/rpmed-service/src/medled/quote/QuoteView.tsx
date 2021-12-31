import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { ContentMainHeading, TextFormContent, View } from 'rpmed-ui/lib/V1'
import { BreadCrumb, QuoteForm } from 'rpmed-ui'
import { useFindPageWithSlugQuery } from 'rpmed-schema'

const QuoteView: React.FC<{}> = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useFindPageWithSlugQuery({ variables: { slug } })

  return (
    <View>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Quote, Trial &amp; Buy - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: data?.pageBySlug.page?.title ?? '...', to: `/${slug}` },
          { label: 'Quote / Trial', to: `/${slug}/quote` },
        ]}
      />
      <ContentMainHeading>MedLED® Quote, Trial &amp; Buy</ContentMainHeading>
      <TextFormContent>
        <p>
          For information on purchasing our Riverpoint Medical products, please{' '}
          <Link to="/contact">contact us directly</Link>.
        </p>
        <p>
          For MedLED® product information, please send us a request below and
          you can learn how to buy a Headlight or Get Free Trials &amp; Quotes.
          Try MedLED® and literally see what everyone is raving about.
          Beforehand, please take a look at the{' '}
          <a
            href="https://rpmed.com/products/medled-chrome-mc3-new-onyx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome MC3
          </a>
          ,{' '}
          <a
            href="https://rpmed.com/products/medled-chrome-mc6-new-sapphire"
            target="_blank"
            rel="noopener noreferrer"
          >
            MC6
          </a>{' '}
          and{' '}
          <a
            href="https://rpmed.com/products/medled-chrome-mc7-pro"
            target="_blank"
            rel="noopener noreferrer"
          >
            MC7 PRO
          </a>
          .
        </p>
        <QuoteForm
          onSubmit={async () => {
            return undefined
          }}
        />
      </TextFormContent>
    </View>
  )
}

export default QuoteView
