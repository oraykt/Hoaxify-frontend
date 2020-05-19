import React from 'react'

const Input = (props) => {
  const { label, error, name, onChange, type } = props
  const className = error ? 'form-control is-invalid' : 'form-control'
  return (
    <div className='form-group'>
      <label htmlFor=''>{label}</label>
      <input
        type={type}
        name={name}
        className={className}
        onChange={onChange}
      />
      <div className='invalid-feedback'>{error}</div>
    </div>
  )
}

export default Input
