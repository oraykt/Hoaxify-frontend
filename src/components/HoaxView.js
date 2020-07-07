import React from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import ProfileImage from './ProfileImage'
import { useTranslation } from 'react-i18next'
import { deleteHoax as apiDeleteHoax} from '../api/apiCalls'

const HoaxView = (props) => {
  const { hoax, onDeleteHoax } = props
  const { user, content, timestamp, fileAttachment, id:hoaxId } = hoax
  const { username, displayName, image } = user
  const loggedInUsername = useSelector(store=> store.username)
  const { i18n } = useTranslation()

  const formatted = format(timestamp, i18n.language)

  const ownedByLoggedInUser = loggedInUsername === username

  const onClickDeleteHoax = async()=>{
    await apiDeleteHoax(hoaxId)
    onDeleteHoax(hoaxId)
  }

  return (
    <div className='card p-2'>
      <div className='d-flex'>
        <div className="flex-fill m-auto pl-2">
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
        {ownedByLoggedInUser && (
          <button className="btn btn-delete-link" onClick={onClickDeleteHoax}>
          <i className="material-icons">delete_outline</i>
        </button>
        )}
      </div>
      <div className='pl-5 mb-3'>{content}</div>
      {fileAttachment && (
        <div className='pl-5'>
          <img
            className='img-fluid shadow'
            src={'images/attachments/' + fileAttachment.name}
            alt={content}
          />
        </div>
      )}
    </div>
  )
}

HoaxView.propTypes = {
  hoax: PropTypes.object,
  onDeleteHoax: PropTypes.func
}

export default HoaxView
