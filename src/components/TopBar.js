import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/hoaxify.png'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { logout as actionLogout } from '../actions/auth'

const TopBar = (props) => {
  const { t: translate } = useTranslation()

  const reduxState = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    displayName: store.displayName,
    image: store.image,
  }))

  const { username, displayName, isLoggedIn } = reduxState

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
    links = (
      <ul className='navbar-nav ml-auto'>
        <li>
          <Link className='nav-link' to={`/users/${username}`}>
            {username}({displayName})
          </Link>
        </li>
        <li
          className='nav-link'
          onClick={onLogout}
          style={{ cursor: 'pointer' }}
        >
          {translate('Logout')}
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
