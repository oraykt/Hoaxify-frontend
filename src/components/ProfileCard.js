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
  const [newImage, setNewImage] = useState()
  const [validationErrors, setValidationErrors] = useState({})
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
      setNewImage(undefined)
    } else {
      setUpdatedDisplayName(displayName)
    }
  }, [inEditMode, displayName])

  useEffect(() => {
    setValidationErrors((previousErrors) => ({
      ...previousErrors,
      displayName: undefined,
    }))
  }, [updatedDisplayName])
  useEffect(() => {
    setValidationErrors((previousErrors) => ({
      ...previousErrors,
      image: undefined,
    }))
  }, [newImage])

  const onClickSave = async () => {
    let image
    if (newImage) {
      image = newImage.split(',')[1]
    }
    const body = {
      displayName: updatedDisplayName,
      image,
    }
    try {
      const response = await apiUpdateUser(username, body)
      setUser(response.data)
      setInEditMode(false)
    } catch (error) {
      if (error.response.data.validationErrors) {
        setValidationErrors(error.response.data.validationErrors)
      }
    }
  }

  const onChangeFile = (event) => {
    if (event.target.files.length < 1) {
      return
    }
    const file = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      setNewImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  const { displayName: displayNameError, image: imageError } = validationErrors

  return (
    <div className='card text-center'>
      <div className='card-header'>
        <ProfileImage
          className='rounded-circle shadow'
          image={image}
          alt={`${username} profile`}
          width='200'
          height='200'
          tempimage={newImage}
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
                error={displayNameError}
              />
              <Input
                type='file'
                onChange={onChangeFile}
                error={imageError}
                accept='.jpeg,.jpg,.png'
              />
              <div className='mt-3'>
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
