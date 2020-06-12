import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getHoaxes as apiGetHoaxes } from '../api/apiCalls'
import HoaxView from './HoaxView'
const HoaxFeed = () => {
  const [hoaxPage, setHoaxPage] = useState({ content: [], last: true })

  const { t: translate } = useTranslation()

  useEffect(() => {
    const loadHoaxes = async () => {
      try {
        const response = await apiGetHoaxes()
        setHoaxPage(response.data)
      } catch (error) {}
    }
    loadHoaxes()
  }, [])

  const { content, last: lastHoaxes } = hoaxPage

  if (content.length === 0) {
    return (
      <div className='alert alert-warning text-center'>
        {translate('There are no hoaxes')}
      </div>
    )
  }

  return (
    <div>
      {content.map((hoax) => (
        <HoaxView key={hoax.id} hoax={hoax} />
      ))}
      {!lastHoaxes && (
        <div className='alert alert-secondary text-center'>
          {translate('Load old Hoaxes')}
        </div>
      )}
    </div>
  )
}

export default HoaxFeed
