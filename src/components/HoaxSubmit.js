import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ProfileImage from './ProfileImage'
import { postHoax as apiPostHoax } from '../api/apiCalls'

const HoaxSubmit = () => {

  const { image, isLoggedIn } = useSelector((store) => ({
    image: store.image,
    isLoggedIn: store.isLoggedIn,
  }))
  const [focused, setFocused] = useState(false)
  const [hoax, setHoax] = useState('')

  const textArea = useRef()

  const menuClickTracker = (event) => {
    if (textArea.current === null || !textArea.current.contains(event.target)) {
      setFocused(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', menuClickTracker)
    return () => {
      document.removeEventListener('click', menuClickTracker)
    }
  }, [isLoggedIn])

  const onClickHoaxify = async () => {
    const body = {
      content: hoax,
    }

    try {
      await apiPostHoax(body)
    } catch (error) {}
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
            className='form-control'
            rows={focused ? '3' : '1'}
            onFocus={() => setFocused(true)}
            onChange={(event) => setHoax(event.target.value)}
            value={hoax}
          />
          {focused && (
            <div className='text-right mt-2'>
              <button className='btn btn-primary' onClick={onClickHoaxify}>
                Hoaxify
              </button>
              <button
                className='btn btn-sm btn-danger d-inline-flex ml-2'
                onClick={() => {
                  setFocused(false)
                  setHoax('')
                }}
                disabled={false}
              >
                {' '}
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
