import axios from 'axios'

export const signup = (user) => {
  return axios.post('/api/v1/users', user)
}

export const login = (user) => {
  return axios.post('/api/v1/auth', {}, { auth: user })
}

export const getUsers = (page = 0, size = 5) => {
  return axios.get(`/api/v1/users?page=${page}&size=${size}`)
}

export const changeHeaderLanguage = (language) => {
  axios.defaults.headers['accept-language'] = language
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationValue = `Basic ${btoa(username + ':' + password)}`
    axios.defaults.headers['Authorization'] = authorizationValue
  } else {
    delete axios.defaults.headers['Authorization']
  }
}
