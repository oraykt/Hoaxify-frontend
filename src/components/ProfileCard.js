import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ProfileImage from './ProfileImage'

const ProfileCard = (props) => {
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }))
  const { username: pathUsername } = useParams()

  const { user } = props
  const { username, displayName, image } = user

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
        {displayName}@{username}
      </div>
    </div>
  )
}

export default ProfileCard
