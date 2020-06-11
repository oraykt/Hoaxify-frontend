import React from 'react'

const Input = (props) => {
  const {
    label,
    error,
    name,
    onChange,
    type,
    defaultValue,
    disabled = false,
    accept,
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

export default Input
