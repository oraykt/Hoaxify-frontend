import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  getHoaxes as apiGetHoaxes,
  getOldHoaxes as apiGetOldHoaxes,
} from '../api/apiCalls'
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
  const initialLoadHoaxesProgress = useApiProgress('get', path)

  let lastHoaxId
  const { content, last: lastHoax } = hoaxPage

  if (content.length > 0) {
    const lastHoaxIndex = content.length - 1
    lastHoaxId = content[lastHoaxIndex].id
  }

  const loadOldHoaxesProgress = useApiProgress(
    'get',
    '/api/v1/hoaxes/' + lastHoaxId,
    true
  )

  useEffect(() => {
    const loadHoaxes = async (page) => {
      try {
        const response = await apiGetHoaxes(page, username)
        setHoaxPage((previousHoaxPage) => ({
          ...response.data,
          content: [...previousHoaxPage.content, ...response.data.content],
        }))
      } catch (error) {}
    }
    loadHoaxes()
  }, [username])

  const loadOldHoaxes = async () => {
    if (loadOldHoaxesProgress) return

    try {
      const response = await apiGetOldHoaxes(lastHoaxId)
      setHoaxPage((previousHoaxPage) => ({
        ...response.data,
        content: [...previousHoaxPage.content, ...response.data.content],
      }))
    } catch (error) {}
  }

  if (content.length === 0) {
    return (
      <div className='alert alert-warning text-center'>
        {initialLoadHoaxesProgress ? (
          <Spinner />
        ) : (
          translate('There are no hoaxes')
        )}
      </div>
    )
  }

  return (
    <div>
      {content.map((hoax) => (
        <HoaxView key={hoax.id} hoax={hoax} />
      ))}
      {!lastHoax && (
        <div
          className='alert alert-secondary text-center'
          style={{ cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer' }}
          onClick={() => loadOldHoaxes()}
        >
          {loadOldHoaxesProgress ? <Spinner /> : translate('Load old Hoaxes')}
        </div>
      )}
    </div>
  )
}

export default HoaxFeed
