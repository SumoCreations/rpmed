import { faPencil } from '@fortawesome/pro-regular-svg-icons'
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { History } from 'history'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { User, useUsersQuery } from 'rpmed-schema'
import {
  Actions,
  Card,
  Content,
  Data,
  Errors,
  Layout,
  Modal,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { DestroyUserButton } from './DestroyUserButton'

const { useState } = React

const sendTo = (p: { history: History; url: string }) => () =>
  p.history.push(p.url)

interface IUsersProps {
  history: History
  onDelete: (user: User) => void
  filterText: string
}

const Users: React.FunctionComponent<IUsersProps> = ({
  history,
  onDelete,
  filterText,
}) => {
  const { loading, data, error } = useUsersQuery()
  const users = (data?.users ?? []) as User[]
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <Errors.LoadingError error={error} />
  }
  const onClickDelete = (user: User) => () => onDelete(user)

  const rows = !loading
    ? users
      .filter(({ firstName, lastName, email, id }) =>
        filterText.length > 0
          ? [id, `${firstName} ${lastName}`, email]
            .map(
              val =>
                val.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
            )
            .includes(true)
          : true
      )
      .map(({ id, firstName, lastName, email }) => [
        <Link to={`/admin/controls/users/${id}`} key={id}>
          {firstName} {lastName}
        </Link>,
        email,
        id,
        <Actions.Group key={`actions${id}`}>
          <Actions.PrimaryInverted
            onClick={sendTo({
              history,
              url: `/admin/controls/users/${id}`,
            })}
          >
            <FontAwesomeIcon icon={faPencil} />
          </Actions.PrimaryInverted>
          <Actions.Destructive
            onClick={onClickDelete({ id, firstName, lastName, email })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Actions.Destructive>
        </Actions.Group>,
      ])
    : []

  return (
    <React.Fragment>
      <Data.Table
        columnContentTypes={['text', 'text', 'text', 'numeric']}
        initialSortColumnIndex={0}
        sortable={[false, false, true]}
        rows={rows}
        headings={['Name', 'Email', 'ID', '']}
      />
    </React.Fragment>
  )
}

export const UserListView: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const [userToDelete, setUserToDelete] = useState(null as User | null)
  const [userSearchText, setUserSearchText] = useState('')
  const confirmUserToDelete = (user: User) => setUserToDelete(user)
  const onClickNew = () => history.push('/admin/controls/users/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setUserSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="Users - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup User'}
              value={userSearchText}
              onChange={onSearchChange}
            />
          </Toolbar.Item>
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group>
              <Actions.Toolbar onClick={onClickNew}>
                <FontAwesomeIcon icon={faPlus} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <Users
            history={history}
            onDelete={confirmUserToDelete}
            filterText={userSearchText}
          />
        </Card.Flat>
      </Content>
      {userToDelete ? (
        <DestroyUserButton id={userToDelete.id}>
          {deleteUser => {
            const onDismiss = () => setUserToDelete(null)
            const onConfirm = () => {
              deleteUser()
              onDismiss()
            }
            return (
              <Modal.Dialog
                title={`Delete ${userToDelete.firstName}?`}
                message={`Are you sure you want to delete ${userToDelete.firstName} ${userToDelete.lastName}? You can not undo this action.`}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                destructive={true}
              />
            )
          }}
        </DestroyUserButton>
      ) : null}
    </Layout.Layout>
  )
}
