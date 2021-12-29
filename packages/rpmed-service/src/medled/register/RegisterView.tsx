import * as React from 'react'
import { Helmet } from 'react-helmet'
import { ContentMainHeading, TextFormContent, View } from 'rpmed-ui/lib/V1'
import { BreadCrumb, RegisterForm } from 'rpmed-ui'

const RegisterView: React.FC<{}> = () => (
  <View>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MedLED® Product Registration - Riverpoint Medical</title>
    </Helmet>
    <BreadCrumb
      trail={[
        { label: 'Resource Center', url: '/' },
        { label: 'MedLED® Product Registration', to: '#' },
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

export default RegisterView
