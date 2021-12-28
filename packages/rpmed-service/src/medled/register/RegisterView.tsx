import * as React from 'react'
import { Helmet } from 'react-helmet'
import { BreadCrumb, ContentMainHeading, TextFormContent, View } from 'rpmed-ui'
import { RegisterForm } from './RegisterForm'

const RegisterView: React.FC<{}> = () => (
  <View>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MedLED® Product Registration - Riverpoint Medical</title>
    </Helmet>
    <BreadCrumb.Container>
      <BreadCrumb.Link to="/medled/register" primary={true}>
        Register Your Product
      </BreadCrumb.Link>
    </BreadCrumb.Container>
    <ContentMainHeading>Register Your Product</ContentMainHeading>
    <TextFormContent>
      <RegisterForm />
    </TextFormContent>
  </View>
)

export default RegisterView
