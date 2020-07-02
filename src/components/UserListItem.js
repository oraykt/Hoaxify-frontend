import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProfileImage from './ProfileImage'
const UserListItem = (props) => {
  const { user } = props
  const { username, displayName, image } = user
  return (
    <Link
      to={`/users/${username}`}
      className='list-group-item list-group-item-action'
    >
      <ProfileImage
        className='rounded-circle'
        image={image}
        alt={`${username} profile`}
        width='32'
        height='32'
      />
      <span className='pl-2'>
        {displayName} @{username}
      </span>
    </Link>
  )
}

UserListItem.propTypes = {
  user: PropTypes.object
}

export default UserListItem
