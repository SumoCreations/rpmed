import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Helmet } from 'react-helmet'

import { User, ValidationError } from 'rpmed-schema'
import {
  Actions,
  Card,
  Content,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { mapDefaultValues } from '../../validations'
import { useUpdateUserMutation, useUserQuery } from 'rpmed-schema'
import { IUserFormValues, UserForm, UserFormSubmitHandler } from './UserForm'
import { useNavigate, useParams } from 'react-router-dom'

const View: React.FC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { loading, data } = useUserQuery({
    variables: { userId: params.userId ?? '' },
  })
  const user = data?.user ?? ({} as User)
  const [updateUser] = useUpdateUserMutation()
  const handleBack = () => navigate('/admin/controls/users')
  const handleSubmit: UserFormSubmitHandler = async (values, actions) => {
    const result = await updateUser({
      variables: {
        userInput: {
          email: values.email || '',
          firstName: values.firstName || '',
          id: user.id,
          lastName: values.lastName || '',
          password: values.password,
        },
      },
    })
    actions.setSubmitting(false)
    const errors = ((result &&
      result.data &&
      result.data.response &&
      result.data.response.errors) ||
      []) as ValidationError[]
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path as any, message)
      })
      return
    }
    navigate('/admin/controls/users')
  }
  const initialValues = mapDefaultValues<IUserFormValues>(user || {}, {
    email: '',
    firstName: '',
    lastName: '',
  })
  return (
    <Layout.Layout>
      <Content>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <Helmet
            title={`${
              loading ? 'Loading User' : `${user.firstName} ${user.lastName}`
            } - RPMed Service Admin`}
          />
          {loading ? (
            <Indicators.Spinner size="lg" />
          ) : (
            <h2>
              {user.firstName} {user.lastName}
            </h2>
          )}
          <UserForm initialValues={initialValues} onSubmit={handleSubmit} />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}

export const UserDetailView = View
