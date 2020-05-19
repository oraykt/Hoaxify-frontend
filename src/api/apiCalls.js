import axios from 'axios'

export const signup = (user) => {
  return axios.post('/api/1.0/users', user)
}

export const login = (user) => {
  return axios.post('/api/1,0/auth', {}, { auth: user })
}

export const changeHeaderLanguage = (language) => {
  axios.defaults.headers['accept-language'] = language
}
