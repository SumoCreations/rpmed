import * as React from 'react'
import { Link } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'

const PageNotFoundView: React.FC = () => {
  return (
    <article className="flex flex-col w-full">
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: 'Page Not Found', url: '/404' },
        ]}
      />
      <h1 className="text-xl font-bold mb-2">
        The Page You're Looking for Does Not Exist
      </h1>
      <p>
        Sorry but the original page you requested no longer exists. Please visit
        the{' '}
        <Link to="/" className="font-bold text-button">
          resource center main menu
        </Link>{' '}
        to find what you were looking for.
      </p>
    </article>
  )
}

export default PageNotFoundView
