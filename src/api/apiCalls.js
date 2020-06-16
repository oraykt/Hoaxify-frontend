import axios from 'axios'

export const signup = (user) => {
  return axios.post('/api/v1/users', user)
}

export const login = (user) => {
  return axios.post('/api/v1/auth', {}, { auth: user })
}

export const getUser = (username) => {
  return axios.get(`/api/v1/users/${username}`)
}

export const updateUser = (username, body) => {
  return axios.put(`/api/v1/users/${username}`, body)
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

export const postHoax = (hoax) => {
  return axios.post('/api/v1/hoaxes', hoax)
}

export const getHoaxes = (page = 0, username) => {
  const path = username
    ? `/api/v1/users/${username}/hoaxes?page=${page}`
    : `/api/v1/hoaxes?page=${page}`
  return axios.get(path)
}

export const getOldHoaxes = (hoaxId, username) => {
  const path = username
    ? `/api/v1/hoaxes/${hoaxId}`
    : `/api/v1/users/${username}/hoaxes/${hoaxId}`
  return axios.get(path)
}
