import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { BreadCrumb, ContentMainHeading, TextFormContent, View } from 'rpmed-ui'
import { QuoteForm } from './QuoteForm'

const QuoteView: React.FC<{}> = () => (
  <View>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MedLED® Quote, Trial &amp; Buy - Riverpoint Medical</title>
    </Helmet>
    <BreadCrumb.Container>
      <BreadCrumb.Link to="/medled/quote" primary={true}>
        Quote / Trial
      </BreadCrumb.Link>
    </BreadCrumb.Container>
    <ContentMainHeading>MedLED® Quote, Trial &amp; Buy</ContentMainHeading>
    <TextFormContent>
      <p>
        For information on purchasing our Riverpoint Medical products, please{' '}
        <Link to="/contact">contact us directly</Link>.
      </p>
      <p>
        For MedLED® product information, please send us a request below and you
        can learn how to buy a Headlight or Get Free Trials &amp; Quotes. Try
        MedLED® and literally see what everyone is raving about. Beforehand,
        please take a look at the{' '}
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
      <QuoteForm />
    </TextFormContent>
  </View>
)

export default QuoteView
