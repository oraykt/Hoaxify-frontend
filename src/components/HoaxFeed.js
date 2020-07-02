import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  getHoaxes as apiGetHoaxes,
  getOldHoaxes as apiGetOldHoaxes,
  getNewHoaxCount as apiGetNewHoaxCount,
  getNewHoaxes as apiGetNewHoaxes
} from '../api/apiCalls'
import HoaxView from './HoaxView'
import { useApiProgress } from '../shared/ApiProgress'
import Spinner from './Spinner'

const HoaxFeed = () => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0
  })

  const [newHoaxCount, setNewHoaxCount] = useState(0)

  const { username } = useParams()

  const { t: translate } = useTranslation()

  let firstHoaxId = 0
  let lastHoaxId = 0
  const { content, last: lastHoax } = hoaxPage

  if (content.length > 0) {
    firstHoaxId = content[0].id

    const lastHoaxIndex = content.length - 1
    lastHoaxId = content[lastHoaxIndex].id
  }

  const path = username
    ? `/api/v1/users/${username}/hoaxes?page=`
    : '/api/v1/hoaxes?page='
  const initialLoadHoaxesProgress = useApiProgress('get', path)

  const oldHoaxPath = username
    ? `/api/v1/users/${username}/hoaxes/${lastHoaxId}`
    : `/api/v1/hoaxes/${lastHoaxId}`

  const newHoaxPath = username
    ? `/api/v1/users/${username}/hoaxes/${firstHoaxId}?direction=after`
    : `/api/v1/hoaxes/${firstHoaxId}?direction=after`
  const loadOldHoaxesProgress = useApiProgress('get', oldHoaxPath, true)
  const loadNewHoaxesProgress = useApiProgress('get', newHoaxPath, true)

  useEffect(() => {
    const loadHoaxes = async (page) => {
      try {
        const response = await apiGetHoaxes(page, username)
        setHoaxPage((previousHoaxPage) => ({
          ...response.data,
          content: [...previousHoaxPage.content, ...response.data.content]
        }))
      } catch (error) {
        console.error("INTERNAL ERROR")
      }
    }
    loadHoaxes()
  }, [username])

  useEffect(() => {
    const getCount = async () => {
      const response = await apiGetNewHoaxCount(firstHoaxId, username)
      setNewHoaxCount(response.data.count)
    }
    const looper = setInterval(getCount, 5000)

    return () => {
      clearInterval(looper)
    }
  }, [firstHoaxId, username])

  const loadOldHoaxes = async () => {
    if (loadOldHoaxesProgress) return
    try {
      const response = await apiGetOldHoaxes(lastHoaxId, username)
      setHoaxPage((previousHoaxPage) => ({
        ...response.data,
        content: [...previousHoaxPage.content, ...response.data.content]
      }))
    } catch (error) {
      console.error("INTERNAL ERROR")
    }
  }

  const loadNewHoaxes = async () => {
    if (loadNewHoaxesProgress) return

    try {
      const response = await apiGetNewHoaxes(firstHoaxId, username)

      setHoaxPage((previousHoaxPage) => ({
        ...previousHoaxPage,
        content: [...response.data, ...previousHoaxPage.content]
      }))

      setNewHoaxCount(0)
    } catch (error) {
      console.error("INTERNAL ERROR")
    }
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
      {newHoaxCount > 0 && (
        <div
          className='alert alert-info text-center'
          style={{ cursor: loadNewHoaxesProgress ? 'not-allowed' : 'pointer' }}
          onClick={() => loadNewHoaxes()}
        >
          {loadNewHoaxesProgress ? (
            <Spinner />
          ) : (
            translate('There are new Hoaxes')
          )}
        </div>
      )}

      {content.map((hoax) => (
        <HoaxView key={hoax.id} hoax={hoax} />
      ))}
      {!lastHoax && (
        <div
          className='alert alert-secondary text-center mb-2'
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
