import { useState, useEffect } from 'react'
import axios from 'axios'

export const useApiProgress = (apiPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false)

  useEffect(() => {
    let requestIntercepter, responseIntercepter
    const registerInterceptors = () => {
      const updateForProgress = (url, inProgress) => {
        if (url.startsWith(apiPath)) {
          setPendingApiCall(inProgress)
        }
      }

      requestIntercepter = axios.interceptors.request.use((request) => {
        updateForProgress(request.url, true)
        return request
      })

      responseIntercepter = axios.interceptors.response.use(
        (response) => {
          updateForProgress(response.config.url, false)
          return response
        },
        (error) => {
          updateForProgress(error.config.url, false)
          throw error
        }
      )
    }

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestIntercepter)
      axios.interceptors.response.eject(responseIntercepter)
    }

    registerInterceptors()

    return function unmount() {
      unregisterInterceptors()
    }
  }, [apiPath])

  return pendingApiCall
}
