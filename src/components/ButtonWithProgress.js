import React, { Fragment } from 'react'

const ButtonWithProgress = ({ onClick, pendingApiCall, disabled, text }) => {
  return (
    <Fragment>
      <button className='btn btn-primary' onClick={onClick} disabled={disabled}>
        {pendingApiCall && (
          <span className='spinner-border spinner-border-sm'></span>
        )}{' '}
        {text}
      </button>
    </Fragment>
  )
}

export default ButtonWithProgress
