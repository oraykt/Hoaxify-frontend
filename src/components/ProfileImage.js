import React from 'react'
import defaultPicture from '../assets/profile.png'
const ProfileImage = (props) => {
  const { image, tempimage } = props
  let imageSource = defaultPicture
  if (image) {
    imageSource = 'images/' + image
  }

  return (
    <img
      src={tempimage || imageSource}
      alt={'Profile'}
      {...props}
      onError={(event) => {
        event.target.src = defaultPicture
      }}
    />
  )
}

export default ProfileImage
