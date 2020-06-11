import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/hoaxify.png'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { logout as actionLogout } from '../actions/auth'

import ProfileImage from './ProfileImage'

const TopBar = (props) => {
  const { t: translate } = useTranslation()

  const reduxState = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    displayName: store.displayName,
    image: store.image,
  }))

  const { username, displayName, image, isLoggedIn } = reduxState

  const menuArea = useRef(null)

  const [menuVisible, setMenuVisible] = useState(false)

  useEffect(() => {
    document.addEventListener('click', menuClickTracker)
    return () => {
      document.removeEventListener('click', menuClickTracker)
    }
  }, [isLoggedIn])

  const menuClickTracker = (event) => {
    if (menuArea.current === null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false)
    }
  }

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(actionLogout())
  }

  let links = (
    <ul className='navbar-nav ml-auto'>
      <li>
        <Link className='nav-link' to='/login'>
          {translate('Login')}
        </Link>
      </li>

      <li>
        <Link className='nav-link' to='/signup'>
          {translate('Sign Up')}
        </Link>
      </li>
    </ul>
  )

  if (isLoggedIn) {
    let dropDownClass = 'dropdown-menu p-0 shadow'
    if (menuVisible) dropDownClass += ' show'
    links = (
      <ul className='navbar-nav ml-auto' ref={menuArea}>
        <li className='nav-item dropdown'>
          <div
            className='d-flex'
            style={{ cursor: 'pointer' }}
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <ProfileImage
              className='rounded-circle m-auto'
              image={image}
              width='32'
              height='32'
            />
            <span className='nav-link dropdown-toggle'>{displayName}</span>
            <div className={dropDownClass}>
              <Link
                className='dropdown-item d-flex p-2'
                to={`/users/${username}`}
              >
                <i className='material-icons text-info mr-2'>person</i>
                {translate('My Profile')}
              </Link>
              <span
                className='dropdown-item d-flex p-2'
                onClick={onLogout}
                style={{ cursor: 'pointer' }}
              >
                <i className='material-icons text-danger mr-2'>
                  power_settings_new
                </i>
                {translate('Logout')}
              </span>
            </div>
          </div>
        </li>
      </ul>
    )
  }

  return (
    <Fragment>
      <div className='shadow bg-light mb-2'>
        <nav className='navbar navbar-light container navbar-expand'>
          <Link to='/' className='navbar-brand'>
            <img src={logo} alt='Hoaxify Logo' width='40' />
            Hoaxify
          </Link>
          {links}
        </nav>
      </div>
    </Fragment>
  )
}

export default TopBar
