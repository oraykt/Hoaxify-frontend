import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import ProfileImage from './ProfileImage'
import { useTranslation } from 'react-i18next'

const HoaxView = (props) => {
  const { hoax } = props
  const { user, content, timestamp } = hoax
  const { username, displayName, image } = user

  const { i18n } = useTranslation()

  const formatted = format(timestamp, i18n.language)
  return (
    <div className='card p-2'>
      <div className=''>
        <Link to={`/user/${username}`} className='d-flex text-dark'>
          <ProfileImage
            className='rounded-circle m-1'
            image={image}
            width='32'
            height='32'
          />
          <h6 className='flex-fill m-auto pl-2'>
            {displayName} @{username}
          </h6>
          <span className='d-inline'>{formatted}</span>
        </Link>
      </div>
      <div className='pl-5'>{content}</div>
    </div>
  )
}

export default HoaxView
