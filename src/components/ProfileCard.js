import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileCard = (props) => {
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }))

  const { username: pathUsername } = useParams()

  let message = 'Not authorized to edit'
  if (pathUsername === loggedInUsername) {
    message = 'Authorized to edit'
  }
  return <div>{message}</div>
}

export default ProfileCard
