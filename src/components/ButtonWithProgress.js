import React, { Fragment } from 'react'

const ButtonWithProgress = ({
  className = 'btn btn-primary',
  onClick,
  pendingApiCall,
  disabled,
  text,
}) => {
  return (
    <Fragment>
      <button className={className} onClick={onClick} disabled={disabled}>
        {pendingApiCall && (
          <span className='spinner-border spinner-border-sm'></span>
        )}{' '}
        {text}
      </button>
    </Fragment>
  )
}

export default ButtonWithProgress
