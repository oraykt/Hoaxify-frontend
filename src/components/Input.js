import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  const {
    label,
    error,
    name,
    onChange,
    type,
    defaultValue,
    disabled = false,
    accept
  } = props

  let className = 'form-control'
  if (type === 'file') {
    className += '-file'
  }
  if (error !== undefined) {
    className += ' is-invalid'
  }

  return (
    <div className='form-group'>
      <label htmlFor=''>{label}</label>
      <input
        type={type}
        name={name}
        className={className}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        accept={accept}
      />
      <div className='invalid-feedback'>{error}</div>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  accept: PropTypes.string
}

export default Input
