import * as React from 'react'
import { Helmet } from 'react-helmet'
import {
  BreadCrumb,
  ContentMainHeading,
  TextFormContent,
} from 'rpmed-ui/lib/V1'
import { ContactForm } from 'rpmed-ui'

const ContactView: React.FC<{}> = () => (
  <article>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Contact Us - Riverpoint Medical</title>
    </Helmet>
    <BreadCrumb.Container>
      <BreadCrumb.Link to="/contact">Contact Us</BreadCrumb.Link>
    </BreadCrumb.Container>
    <ContentMainHeading>We Want to Hear From You</ContentMainHeading>
    <TextFormContent>
      <p>
        Please reach out with any feedback or questions on our products and
        services.
      </p>
      <ContactForm
        onSubmit={async data => {
          return undefined
        }}
      />
    </TextFormContent>
  </article>
)

export default ContactView
