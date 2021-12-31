import * as React from 'react'
import { Helmet } from 'react-helmet'
import { ContentMainHeading, TextFormContent } from 'rpmed-ui/lib/V1'
import { BreadCrumb, ContactForm } from 'rpmed-ui'
import { useParams } from 'react-router-dom'
import { useFindPageWithSlugQuery } from 'rpmed-schema'

const ContactView: React.FC<{}> = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useFindPageWithSlugQuery({ variables: { slug } })
  return (
    <article className="flex flex-col w-full">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: data?.pageBySlug.page?.title ?? '...', to: `/${slug}` },
          { label: 'Contact Us', to: `/${slug}/contact` },
        ]}
      />
      <ContentMainHeading>We Want to Hear From You</ContentMainHeading>
      <TextFormContent>
        <p>
          Please reach out with any feedback or questions on our products and
          services.
        </p>
        <ContactForm
          onSubmit={async () => {
            return undefined
          }}
        />
      </TextFormContent>
    </article>
  )
}

export default ContactView
