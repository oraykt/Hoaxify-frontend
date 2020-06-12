import React from 'react'

const HoaxView = (props) => {
  const { hoax } = props
  const { content } = hoax
  return <div className="card p-2">{content}</div>
}

export default HoaxView
