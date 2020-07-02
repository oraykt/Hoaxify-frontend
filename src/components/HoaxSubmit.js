import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useApiProgress } from '../shared/ApiProgress'
import {
  postHoax as apiPostHoax,
  postHoaxAttachment as apiPostHoaxAttachment
} from '../api/apiCalls'

import ProfileImage from './ProfileImage'
import ButtonWithProgress from './ButtonWithProgress'
import Input from './Input'
import AutoUploadImage from './AutoUploadImage'

const HoaxSubmit = () => {
  const { image, isLoggedIn } = useSelector((store) => ({
    image: store.image,
    isLoggedIn: store.isLoggedIn
  }))
  const [focused, setFocused] = useState(false)
  const [hoax, setHoax] = useState('')
  const [errors, setErrors] = useState({})
  const [newImage, setNewImage] = useState()
  const [attachmentId, setAttachmentId] = useState()

  const pendingApiCall = useApiProgress('post', '/api/v1/hoaxes', true)
  const pendingFileUpload = useApiProgress(
    'post',
    '/api/v1/hoax-attachments',
    true
  )

  const textArea = useRef()

  const textAreaClickTracker = (event) => {
    if (textArea.current === null || !textArea.current.contains(event.target)) {
      setFocused(false)
      setErrors({})
    }
  }

  useEffect(() => {
    document.addEventListener('click', textAreaClickTracker)
    return () => {
      document.removeEventListener('click', textAreaClickTracker)
    }
  }, [isLoggedIn])

  useEffect(() => {
    setErrors({})
  }, [hoax])

  const onClickHoaxify = async () => {
    const body = {
      content: hoax,
      attachmentId
    }

    try {
      await apiPostHoax(body)
      setFocused(false)
      setHoax('')
      setAttachmentId(undefined)
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors)
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
      uploadFile(file)
    }
    fileReader.readAsDataURL(file)
  }

  const uploadFile = async (file) => {
    const attachment = new FormData()
    attachment.append('file', file)
    try {
      const response = await apiPostHoaxAttachment(attachment)
      setAttachmentId(response.data.id)
    } catch (error) {
      console.error("INTERNAL ERROR")
    }
  }

  const { content: contentError, image: imageError } = errors

  let textAreaClass = 'form-control'

  if (contentError) {
    textAreaClass += ' is-invalid'
  }

  return (
    <Fragment>
      <div className='card p-2 flex-row' ref={textArea}>
        <ProfileImage
          className='rounded-circle mr-2'
          image={image}
          width='32'
          height='32'
        />
        <div className='flex-fill'>
          <textarea
            className={textAreaClass}
            rows={focused ? '3' : '1'}
            onFocus={() => setFocused(true)}
            onChange={(event) => setHoax(event.target.value)}
            value={hoax}
            disabled={pendingApiCall}
          />
          {contentError && (
            <div className='invalid-feedback'>{contentError}</div>
          )}
          {focused && (
            <Fragment>
              {!newImage && (
                <Input
                  type='file'
                  onChange={onChangeFile}
                  error={imageError}
                  accept='.jpeg,.jpg,.png'
                />
              )}

              {newImage && (
                <AutoUploadImage
                  image={newImage}
                  uploading={pendingFileUpload}
                />
              )}

              <div className='text-right mt-2'>
                <ButtonWithProgress
                  className='btn btn-primary'
                  onClick={onClickHoaxify}
                  pendingApiCall={pendingApiCall}
                  disabled={pendingApiCall || pendingFileUpload}
                  text='Hoaxify'
                />
                <button
                  className='btn btn-sm btn-danger d-inline-flex ml-2'
                  onClick={() => {
                    setFocused(false)
                    setHoax('')
                    setNewImage(undefined)
                    setAttachmentId(undefined)
                    setErrors({})
                  }}
                  disabled={pendingApiCall || pendingFileUpload}
                >
                  <i className='material-icons'>close</i>
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default HoaxSubmit
