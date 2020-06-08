import React from 'react'
import { useTranslation } from 'react-i18next'

export default () => {
  const { t: translate } = useTranslation()
  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border text-black-50'>
        <span className='sr-only'>{translate('Loading')}...</span>
      </div>
    </div>
  )
}
