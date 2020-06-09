import { useState, useEffect } from 'react'
import axios from 'axios'

export const useApiProgress = (apiMethod, apiPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false)

  useEffect(() => {
    let requestIntercepter, responseIntercepter
    const registerInterceptors = () => {
      const updateForProgress = (method, url, inProgress) => {
        if (url.startsWith(apiPath) && method === apiMethod) {
          setPendingApiCall(inProgress)
        }
      }

      requestIntercepter = axios.interceptors.request.use((request) => {
        const { method, url } = request

        updateForProgress(method, url, true)
        return request
      })

      responseIntercepter = axios.interceptors.response.use(
        (response) => {
          const { method, url } = response.config
          updateForProgress(method, url, false)
          return response
        },
        (error) => {
          const { method, url } = error.config

          updateForProgress(method, url, false)
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
  }, [apiMethod, apiPath])

  return pendingApiCall
}
