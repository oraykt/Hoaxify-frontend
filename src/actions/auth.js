import { LOG_IN, LOG_OUT } from './types'
import { login as apiLogin, signup as apiSignup } from '../api/apiCalls'

export const login = (AuthState) => {
  return {
    type: LOG_IN,
    payload: AuthState,
  }
}

export const logout = () => {
  return {
    type: LOG_OUT,
  }
}
