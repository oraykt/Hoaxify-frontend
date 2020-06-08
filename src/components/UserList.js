import React, { Fragment, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useApiProgress } from '../shared/ApiProgress'

import UserListItem from './UserListItem'
import Spinner from './Spinner'
import { getUsers as apiGetUsers } from '../api/apiCalls'

const UserList = () => {
  const { t: translate } = useTranslation()
  const pendingApiCall = useApiProgress('/api/v1/users?page')

  const [page, setPage] = useState({
    content: [],
    size: 5,
    number: 0,
  })

  const [loadFailure, setLoadFailure] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async (page) => {
    setLoadFailure(false)
    try {
      const response = await apiGetUsers(page)
      setPage(response.data)
    } catch (error) {
      setLoadFailure(true)
    }
  }

  const onClickNext = () => {
    const nextPage = page.number + 1
    loadUsers(nextPage)
  }

  const onClickPrevious = () => {
    const previousPage = page.number - 1
    loadUsers(previousPage)
  }

  const { content: users, first, last } = page

  let actionDiv = (
    <div className=''>
      <button
        className='btn btn-sm btn-light float-left'
        onClick={onClickPrevious}
        disabled={first}
      >
        {translate('Previous')}
      </button>
      <button
        className='btn btn-sm btn-light float-right'
        onClick={onClickNext}
        disabled={last}
      >
        {translate('Next')}
      </button>
    </div>
  )
  if (pendingApiCall) {
    actionDiv = <Spinner />
  }
  return (
    <Fragment>
      <div className='card'>
        <h3 className='card-header text-center'>{translate('Users')}</h3>
        <div className='list-group-flush'>
          {users.map((user) => (
            <UserListItem key={user.username} user={user} />
          ))}
        </div>
        {actionDiv}
        {loadFailure && (
          <div className='text-center text-danger'>
            {' '}
            {translate('Load Failure')}
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default UserList
