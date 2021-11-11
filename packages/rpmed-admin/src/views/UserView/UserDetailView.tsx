import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ValidationError } from '../../schema'
import {
  Actions,
  Card,
  Content,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { mapDefaultValues } from '../../validations'
import { useUpdateUser, useUser } from './graphql'
import { IUserFormValues, UserForm, UserFormSubmitHandler } from './UserForm'

interface IUserRouterProps {
  userId: string
}

const View: React.FC<RouteComponentProps<IUserRouterProps>> = ({
  history,
  match,
}) => {
  const { loading, user } = useUser(match.params.userId)
  const updateUser = useUpdateUser()
  const handleBack = () => history.push('/admin/controls/users')
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
        actions.setFieldError(path, message)
      })
      return
    }
    history.push('/admin/controls/users')
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
