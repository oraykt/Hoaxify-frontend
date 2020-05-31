import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/hoaxify.png'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { logout as actionLogout } from '../actions/auth'

class TopBar extends Component {
  render() {
    const {
      t: translation,
      isLoggedIn,
      username,
      displayName,
      onLogout,
    } = this.props

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
              {username}({displayName})
            </Link>
          </li>
          <li
            className='nav-link'
            onClick={onLogout}
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

const TopBarWithTranslation = withTranslation()(TopBar)

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    displayName: store.displayName,
    image: store.image,
    password: store.password,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionLogout()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarWithTranslation)
