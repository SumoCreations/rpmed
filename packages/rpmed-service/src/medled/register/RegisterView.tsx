import * as React from 'react'
import { Helmet } from 'react-helmet'
import { ContentMainHeading, TextFormContent, View } from 'rpmed-ui/lib/V1'
import { BreadCrumb, RegisterForm } from 'rpmed-ui'
import { useFindPageWithSlugQuery } from 'rpmed-schema'
import { useParams } from 'react-router-dom'

const RegisterView: React.FC<{}> = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useFindPageWithSlugQuery({ variables: { slug } })
  return (
    <View>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Product Registration - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: data?.pageBySlug.page?.title ?? '...', to: `/${slug}` },
          { label: 'Product Registration', to: `/${slug}/register` },
        ]}
      />
      <ContentMainHeading>Register Your Product</ContentMainHeading>
      <TextFormContent>
        <RegisterForm
          onSubmit={async data => {
            return undefined
          }}
        />
      </TextFormContent>
    </View>
  )
}

export default RegisterView
