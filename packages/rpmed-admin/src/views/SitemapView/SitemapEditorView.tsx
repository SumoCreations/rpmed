import { faUsers } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Actions, Content, GridNav, Layout, Toolbar } from 'rpmed-ui/lib/V1'

const { useState } = React

export const SitemapEditorView: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const [searchText, setSearchText] = useState('')
  const onClickOption = (route: string) => () =>
    history.push(`/admin/sitemap/${route}`)
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="Sitemap CMS - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Setting'}
              value={searchText}
              onChange={onSearchChange}
            />
          </Toolbar.Item>
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group />
          </Toolbar.Item>
        </Toolbar.View>
        <GridNav.Container>
          <GridNav.Item>
            <GridNav.OverlayButton onClick={onClickOption('users')} />
            <GridNav.IconWrap>
              <FontAwesomeIcon icon={faUsers} size="3x" />
            </GridNav.IconWrap>
            <GridNav.ItemContent>
              <GridNav.ItemTitle>
                <Link to="/troubleshoot">Manage Users</Link>
              </GridNav.ItemTitle>
              <GridNav.ItemDescription>
                Add, remove, or modify any user who should have access to the
                service admin.
              </GridNav.ItemDescription>
            </GridNav.ItemContent>
          </GridNav.Item>
        </GridNav.Container>
      </Content>
    </Layout.Layout>
  )
}
