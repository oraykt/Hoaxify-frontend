import { LOG_IN, LOG_OUT, UPDATE_PROFILE } from './types'
import { login as apiLogin, signup as apiSignup } from '../api/apiCalls'

export const loginSuccess = (AuthState) => {
  return {
    type: LOG_IN,
    payload: AuthState
  }
}

export const loginHandler = (creds) => async (dispatch) => {
  const response = await apiLogin(creds)

  const authState = {
    password: creds.password,
    ...response.data
  }

  await dispatch(loginSuccess(authState))
  return response
}

export const logout = () => {
  return {
    type: LOG_OUT
  }
}

export const signupHandler = (user) => async (dispatch) => {
  const response = await apiSignup(user)
  await dispatch(loginHandler(user))
  return response
}

export const updateProfile = ({ displayName, image }) => {
  return {
    type: UPDATE_PROFILE,
    payload: {
      displayName,
      image
    }
  }
}
