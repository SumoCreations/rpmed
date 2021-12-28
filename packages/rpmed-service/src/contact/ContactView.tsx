import * as React from 'react'
import { Helmet } from 'react-helmet'
import { BreadCrumb, ContentMainHeading, TextFormContent } from 'rpmed-ui'
import { ContactForm } from './ContactForm'

const ContactView: React.FC<{}> = () => (
  <article>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Contact Us - Riverpoint Medical</title>
    </Helmet>
    <BreadCrumb.Container>
      <BreadCrumb.Link to="/contact" primary={true}>
        Contact Us
      </BreadCrumb.Link>
    </BreadCrumb.Container>
    <ContentMainHeading>We Want to Hear From You</ContentMainHeading>
    <TextFormContent>
      <p>
        Please reach out with any feedback or questions on our products and
        services.
      </p>
      <ContactForm />
    </TextFormContent>
  </article>
)

export default ContactView
