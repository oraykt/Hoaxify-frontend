import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { getUser as apiGetUser } from '../api/apiCalls'
import { useApiProgress } from '../shared/ApiProgress'
import ProfileCard from '../components/ProfileCard'
import Spinner from '../components/Spinner'

const UserPage = (props) => {
  const [user, setUser] = useState({
    username: undefined,
    displayName: undefined,
    image: undefined,
  })
  const [notFound, setNotFound] = useState(false)
  const { t: translate } = useTranslation()

  const { username } = useParams()
  const pendingApiCall = useApiProgress('get', '/api/v1/users/' + username)

  useEffect(() => {
    setNotFound(false)
  }, [user])

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await apiGetUser(username)
        setUser(response.data)
      } catch (error) {
        setNotFound(true)
      }
    }
    loadUser()
  }, [username])

  if (pendingApiCall) {
    return <Spinner />
  }

  if (notFound) {
    return (
      <div className='container'>
        <div className='alert alert-danger text-center'>
          <div className=''>
            <i className='material-icons' style={{ fontSize: '48px' }}>
              error
            </i>
          </div>
          {translate('User not found')}
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      <ProfileCard user={user} />
    </Fragment>
  )
}

export default UserPage