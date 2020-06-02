import React, { Component } from 'react'
import axios from 'axios'

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export const withApiProgress = (WrappedComponent, apiPath) => {
  return class ApiProgress extends Component {
    static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`

    state = {
      pendingApiCall: false,
    }

    componentDidMount() {
      this.requestIntercepter = axios.interceptors.request.use((request) => {
        this.updateForProgress(request.url, true)
        return request
      })

      this.responseIntercepter = axios.interceptors.response.use(
        (response) => {
          this.updateForProgress(response.config.url, false)
          return response
        },
        (error) => {
          this.updateForProgress(error.config.url, false)
          throw error
        }
      )
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestIntercepter)
      axios.interceptors.response.eject(this.responseIntercepter)
    }

    updateForProgress(url, inProgress) {
      if (url === apiPath) {
        this.setState({ pendingApiCall: inProgress })
      }
    }

    render() {
      const pendingApiCall =
        this.state.pendingApiCall || this.props.pendingApiCall

      return (
        <WrappedComponent {...this.props} pendingApiCall={pendingApiCall} />
      )
    }
  }
}
