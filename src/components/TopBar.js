import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/hoaxify.png'
import { withTranslation } from 'react-i18next'
import { Authentication } from '../shared/AuthenticationContext'

class TopBar extends Component {
  static contextType = Authentication

  render() {
    const { t: translation } = this.props

    const { state, onLogoutSuccess } = this.context
    const { isLoggedIn, username } = state
    let links = (
      <ul className='navbar-nav ml-auto'>
        <li>
          <Link className='nav-link' to='/login'>
            {translation('Login')}
          </Link>
        </li>

        <li>
          <Link className='nav-link' to='/signup'>
            {translation('Sign Up')}
          </Link>
        </li>
      </ul>
    )

    if (isLoggedIn) {
      links = (
        <ul className='navbar-nav ml-auto'>
          <li>
            <Link className='nav-link' to={`/user/${username}`}>
              {username}
            </Link>
          </li>
          <li
            className='nav-link'
            onClick={onLogoutSuccess}
            style={{ cursor: 'pointer' }}
          >
            {translation('Logout')}
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
}

export default withTranslation()(TopBar)
