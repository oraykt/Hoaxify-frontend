import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useApiProgress } from '../shared/ApiProgress'
import ProfileImage from './ProfileImage'
import ButtonWithProgress from './ButtonWithProgress'
import { postHoax as apiPostHoax } from '../api/apiCalls'

const HoaxSubmit = () => {
  const { image, isLoggedIn } = useSelector((store) => ({
    image: store.image,
    isLoggedIn: store.isLoggedIn,
  }))
  const [focused, setFocused] = useState(false)
  const [hoax, setHoax] = useState('')
  const [errors, setErrors] = useState({})

  const pendingApiCall = useApiProgress('post', '/api/v1/hoaxes')

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
    }

    try {
      await apiPostHoax(body)
      setFocused(false)
      setHoax('')
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors)
      }
    }
  }

  const { content: contentError } = errors

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
            <div className='text-right mt-2'>
              <ButtonWithProgress
                className='btn btn-primary'
                onClick={onClickHoaxify}
                pendingApiCall={pendingApiCall}
                disabled={pendingApiCall}
                text='Hoaxify'
              />
              <button
                className='btn btn-sm btn-danger d-inline-flex ml-2'
                onClick={() => {
                  setFocused(false)
                  setHoax('')
                  setErrors({})
                }}
                disabled={pendingApiCall}
              >
                <i className='material-icons'>close</i>
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default HoaxSubmit
