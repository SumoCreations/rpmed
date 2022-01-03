import * as React from 'react'
import { Helmet } from 'react-helmet'
import { ContentMainHeading, TextFormContent, View } from 'rpmed-ui/lib/V1'
import { RegisterForm } from 'rpmed-ui'
import { useParams } from 'react-router-dom'
import { BreadCrumbFromPage } from '../../pages'

const RegisterView: React.FC<{}> = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  return (
    <View>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Product Registration - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumbFromPage
        slug={slug}
        trail={[{ label: 'Product Registration', to: `/${slug}/register` }]}
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
