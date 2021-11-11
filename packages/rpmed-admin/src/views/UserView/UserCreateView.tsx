import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ErrorList } from 'rpmed-validation-schema'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { useCreateUser } from './graphql'
import { UserForm, UserFormSubmitHandler } from './UserForm'

export const UserCreateView: React.FC<RouteComponentProps> = ({ history }) => {
  const createUser = useCreateUser()
  const handleBack = () => history.push('/admin/controls/users')
  const handleSubmit: UserFormSubmitHandler = async (values, actions) => {
    const result = await createUser({
      variables: {
        userInput: {
          email: values.email || '',
          firstName: values.firstName || '',
          lastName: values.lastName || '',
          password: values.password || '',
        },
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path, message)
      })
      return
    }
    history.push('/admin/controls/users')
  }
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
          <Helmet title="Create User - RPMed Service Admin" />
          <h2>New User</h2>
          <UserForm
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
            }}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
