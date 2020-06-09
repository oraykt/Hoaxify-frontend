import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useApiProgress } from '../shared/ApiProgress'
import { updateUser as apiUpdateUser } from '../api/apiCalls'
import Input from './Input'
import ProfileImage from './ProfileImage'
import ButtonWithProgress from './ButtonWithProgress'

const ProfileCard = (props) => {
  const [inEditMode, setInEditMode] = useState(false)
  const [updatedDisplayName, setUpdatedDisplayName] = useState()
  const [user, setUser] = useState({})
  const [editable, setEditable] = useState(false)
  const { t: translate } = useTranslation()

  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }))
  const { username: pathUsername } = useParams()

  useEffect(() => {
    setUser(props.user)
  }, [props.user])

  useEffect(() => setEditable(pathUsername === loggedInUsername), [
    pathUsername,
    loggedInUsername,
  ])

  const { username, displayName, image } = user

  const pendingApiCall = useApiProgress('put', '/api/v1/users/' + username)

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined)
    } else {
      setUpdatedDisplayName(displayName)
    }
  }, [inEditMode, displayName])

  const onClickSave = async () => {
    const body = {
      displayName: updatedDisplayName,
    }
    try {
      const response = await apiUpdateUser(username, body)
      setUser(response.data)
      setInEditMode(false)
    } catch (error) {}
  }

  return (
    <div className='card text-center'>
      <div className='card-header'>
        <ProfileImage
          className='rounded-circle shadow'
          image={image}
          alt={`${username} profile`}
          width='200'
          height='200'
        />
      </div>
      <div className='card-body'>
        {!inEditMode && (
          <Fragment>
            <h3>
              {displayName}@{username}
            </h3>
            {editable && (
              <button
                className='btn btn-success d-inline-flex'
                onClick={() => setInEditMode(true)}
              >
                {' '}
                <i className='material-icons'>edit</i> {translate('Edit')}
              </button>
            )}
          </Fragment>
        )}
        {inEditMode && (
          <Fragment>
            <div className=''>
              <Input
                label={translate('Change Display Name')}
                defaultValue={displayName}
                onChange={(event) => setUpdatedDisplayName(event.target.value)}
                disabled={pendingApiCall}
              />
              <div className=''>
                <ButtonWithProgress
                  className='btn btn-primary d-inline-flex'
                  onClick={onClickSave}
                  disabled={pendingApiCall}
                  pendingApiCall={pendingApiCall}
                  text={
                    <Fragment>
                      {' '}
                      <i className='material-icons'>save</i> {translate('Save')}
                    </Fragment>
                  }
                ></ButtonWithProgress>
                <button
                  className='btn btn-danger d-inline-flex ml-2'
                  onClick={() => setInEditMode(false)}
                  disabled={pendingApiCall}
                >
                  {' '}
                  <i className='material-icons'>close</i> {translate('Cancel')}
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default ProfileCard
