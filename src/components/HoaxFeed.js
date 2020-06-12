import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { getHoaxes as apiGetHoaxes } from '../api/apiCalls'
import HoaxView from './HoaxView'
import { useApiProgress } from '../shared/ApiProgress'
import Spinner from './Spinner'

const HoaxFeed = () => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0,
  })

  const { username } = useParams()

  const { t: translate } = useTranslation()

  const path = username
    ? `/api/v1/users/${username}/hoaxes?page=`
    : `/api/v1/hoaxes?page=`
  const pendingApiCall = useApiProgress('get', path)

  useEffect(() => {
    loadHoaxes()
  }, [username])

  const loadHoaxes = async (page) => {
    if (pendingApiCall) return
    try {
      const response = await apiGetHoaxes(page, username)
      setHoaxPage((previousHoaxPage) => ({
        ...response.data,
        content: [...previousHoaxPage.content, ...response.data.content],
      }))
    } catch (error) {}
  }

  const { content, last: lastHoaxes, number: pageNumber } = hoaxPage

  if (content.length === 0) {
    return (
      <div className='alert alert-warning text-center'>
        {pendingApiCall ? <Spinner /> : translate('There are no hoaxes')}
      </div>
    )
  }

  return (
    <div>
      {content.map((hoax) => (
        <HoaxView key={hoax.id} hoax={hoax} />
      ))}
      {!lastHoaxes && (
        <div
          className='alert alert-secondary text-center'
          style={{ cursor: pendingApiCall ? 'not-allowed' : 'pointer' }}
          onClick={() => loadHoaxes(pageNumber + 1)}
        >
          {pendingApiCall ? <Spinner /> : translate('Load old Hoaxes')}
        </div>
      )}
    </div>
  )
}

export default HoaxFeed
