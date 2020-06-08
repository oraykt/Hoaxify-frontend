import React from 'react'
import { Link } from 'react-router-dom'
import defaultPicture from '../assets/profile.png'

const UserListItem = (props) => {
  const { user } = props
  const { username, displayName, image } = user
  let imageSource = defaultPicture
  if (image) {
    imageSource = image
  }
  return (
    <Link
      to={`/user/${username}`}
      className='list-group-item list-group-item-action'
    >
      <img
        alt={`${username} profile`}
        src={imageSource}
        className='rounded-circle'
        width='32'
        height='32'
      />
      <span className='pl-2'>
        {displayName} @{username}
      </span>
    </Link>
  )
}

export default UserListItem
