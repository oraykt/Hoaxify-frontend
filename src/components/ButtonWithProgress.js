import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ButtonWithProgress = ({
  className = 'btn btn-primary',
  onClick,
  pendingApiCall,
  disabled,
  text
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

ButtonWithProgress.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  pendingApiCall: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string
}

export default ButtonWithProgress
