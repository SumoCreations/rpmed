import { faEye, faPlus } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { Rga, RgaStatus } from 'rpmed-schema'
import {
  Actions,
  Card,
  Content,
  Data,
  Errors,
  Grid,
  Heading,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useRGAs } from './graphql'

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const readableStatus = (s: string) =>
  s
    .split('_')
    .map(capitalize)
    .join(' ')

interface IRGAProps {
  filterText: string
  status: RgaStatus
}

const RGAs: React.FC<IRGAProps> = ({ filterText, status }) => {
  const { error, loading, rgas } = useRGAs({ status })
  const navigate = useNavigate()
  const sendTo = (p: { url: string }) => () => navigate(p.url)
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <Errors.LoadingError error={error} />
  }

  const filterRGA = ({ submittedBy, id }: Rga) =>
    filterText.length > 0
      ? [id, submittedBy]
          .map(val => val.toLowerCase().indexOf(filterText.toLowerCase()) >= 0)
          .includes(true)
      : true

  const rows = rgas.filter(filterRGA).map(p => [
    <Link to={`/admin/rga/${p.status}/${p.id}`} key={p.id}>
      {p.id}
    </Link>,
    p.submittedBy,
    DateTime.fromISO(p.submittedOn).toFormat('MMM, d yyyy'),
    p.goods.length,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({ url: `/admin/rga/${p.status}/${p.id}` })}
      >
        <FontAwesomeIcon icon={faEye} />
      </Actions.Primary>
    </Actions.Group>,
  ])

  return (
    <React.Fragment>
      <Data.Table
        columnContentTypes={['text', 'text', 'text', 'numeric', 'numeric']}
        initialSortColumnIndex={0}
        sortable={[true, true, true, true, false]}
        rows={rows}
        headings={['RGA No.', 'Submitted By', 'Submitted On', 'Goods', '']}
        widths={['20%', '30%', '20%', '10%', '10%']}
      />
    </React.Fragment>
  )
}

export const RGAListView: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const params = useParams()
  const navigate = useNavigate()
  const onClickNew = () => navigate('/admin/rga/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="RGA - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup RGA'}
              value={searchText}
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
          <Grid.Row>
            <Grid.Col span={16}>
              <Heading.Title>
                {readableStatus(params.status as RgaStatus)}
              </Heading.Title>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={16}>
              <RGAs
                filterText={searchText}
                status={params.status as RgaStatus}
              />
            </Grid.Col>
          </Grid.Row>
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
