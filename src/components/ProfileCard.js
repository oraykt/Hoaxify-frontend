import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useApiProgress } from '../shared/ApiProgress'
import { updateUser as apiUpdateUser, deleteAccount as apiDeleteAccount } from '../api/apiCalls'
import { updateProfile as updateProfileState, logout as actionLogout } from '../actions/auth'
import Input from './Input'
import ProfileImage from './ProfileImage'
import ButtonWithProgress from './ButtonWithProgress'
import Modal from './Modal'

const ProfileCard = (props) => {
  const [inEditMode, setInEditMode] = useState(false)
  const [updatedDisplayName, setUpdatedDisplayName] = useState()
  const [user, setUser] = useState({})
  const [editable, setEditable] = useState(false)
  const [newImage, setNewImage] = useState()
  const [validationErrors, setValidationErrors] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const { t: translate } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username
  }))
  const { username: pathUsername } = useParams()

  const { user: loggedUser } = props

  useEffect(() => {
    setUser(loggedUser)
  }, [loggedUser])

  useEffect(() => setEditable(pathUsername === loggedInUsername), [
    pathUsername,
    loggedInUsername
  ])

  const { username, displayName, image } = user

  const pendingApiCall = useApiProgress('put', '/api/v1/users/' + username)
  const pendingApiCallForDelete = useApiProgress('delete', `/api/v1/users/${username}`, true)

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
      displayName: undefined
    }))
  }, [updatedDisplayName])
  useEffect(() => {
    setValidationErrors((previousErrors) => ({
      ...previousErrors,
      image: undefined
    }))
  }, [newImage])

  const onClickSave = async () => {
    let image
    if (newImage) {
      image = newImage.split(',')[1]
    }
    const body = {
      displayName: updatedDisplayName,
      image
    }
    try {
      const response = await apiUpdateUser(username, body)
      setUser(response.data)
      dispatch(updateProfileState(response.data))
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

  const onClickRemoveCancel = () => {
    setModalVisible(false)
  }

  const onClickDeleteAccount = async () => {
    await apiDeleteAccount(username)
    setModalVisible(false)
    dispatch(actionLogout())
    history.push('/')
  }

  const { displayName: displayNameError, image: imageError } = validationErrors

  return (
    <Fragment>
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
                <Fragment>
                  <button
                    className='btn btn-success d-inline-flex'
                    onClick={() => setInEditMode(true)}
                  >
                    {' '}
                    <i className='material-icons'>edit</i> {translate('Edit')}
                  </button>
                  <div className="pt-2">
                    <button
                      className='btn btn-danger d-inline-flex'
                      onClick={() => setModalVisible(true)}
                    >
                      {' '}
                      <i className='material-icons'>directions_run</i> {translate('Delete Account')}
                    </button>
                  </div>
                </Fragment>
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
      <Modal
        visible={modalVisible}
        onClickCancel={onClickRemoveCancel}
        onClickDelete={onClickDeleteAccount}
        pendingApiCall={pendingApiCallForDelete}
        title={translate('Delete Account')}
        message={
          <div>
            <div>
              <strong>
                {translate('Are you sure to delete your account?')}
              </strong>
            </div>
            <span>{}</span>
          </div>
        }
      />
    </Fragment>
  )
}

ProfileCard.propTypes = {
  user: PropTypes.object
}

export default ProfileCard
