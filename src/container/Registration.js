import React, { Fragment } from 'react'
import UserSignupPage from '../pages/UserSignupPage'
import UserLoginPage from '../pages/UserLoginPage'

const Registration = () => {
  return (
    <Fragment>
      <div className='contianer'>
        <div className='row'>
          <div className='col'>
            <UserSignupPage />
          </div>
          <div className='col'>
            <UserLoginPage />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Registration
