import React from 'react'

const AutoUploadImage = (props) => {
  const { image, uploading } = props

  const overlayStyle = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    height: '100%',
    width: '100%',
    opacity: uploading ? '1' : '0',
    transition: '0.5s ease',
    'backgroundColor': '#00000099',
  }

  return (
    <div className='mt-2' style={{ position: 'relative' }}>
      <img className='img-thumbnail' src={image} alt='hoax-attachment' />
      <div style={overlayStyle}>
        <div className='d-flex justify-content-center h-100'>
          <div className='spinner-border text-light m-auto'>
            <span className='sr-only'>Loading ...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutoUploadImage
