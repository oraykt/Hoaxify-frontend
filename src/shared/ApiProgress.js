import { useState, useEffect } from 'react'
import axios from 'axios'

export const useApiProgress = (apiMethod, apiPath, strictPath = false) => {
  const [pendingApiCall, setPendingApiCall] = useState(false)

  useEffect(() => {
    let requestIntercepter, responseIntercepter

    const registerInterceptors = () => {
      const updateForProgress = (method, url, inProgress) => {
        if (method !== apiMethod) {
          return
        }

        if (strictPath && url === apiPath) {
          setPendingApiCall(inProgress)
        } else if (!strictPath && url.startsWith(apiPath)) {
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
  }, [apiMethod, apiPath, strictPath])

  return pendingApiCall
}
