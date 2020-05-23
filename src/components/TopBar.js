import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/hoaxify.png'
import { withTranslation } from 'react-i18next'
class TopBar extends Component {
  render() {
    const { t: translation } = this.props
    return (
      <Fragment>
        <div className='shadow bg-light mb-2'>
          <nav className='navbar navbar-light container navbar-expand'>
            <Link to='/' className='navbar-brand'>
              <img src={logo} alt='Hoaxify Logo' width='40' />
              Hoaxify
            </Link>

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
          </nav>
        </div>
      </Fragment>
    )
  }
}

export default withTranslation()(TopBar)
