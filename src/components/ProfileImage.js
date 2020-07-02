import React from 'react'
import PropTypes from 'prop-types'
import defaultPicture from '../assets/profile.png'
const ProfileImage = (props) => {
  const { image, tempimage } = props
  let imageSource = defaultPicture
  if (image) {
    imageSource = 'images/profile/' + image
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

ProfileImage.propTypes = {
  image: PropTypes.string,
  tempimage: PropTypes.string
}

export default ProfileImage
