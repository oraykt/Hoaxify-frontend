import { LOG_IN, LOG_OUT, UPDATE_PROFILE } from '../actions/types'

const defaultState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined,
}

const reducer = (state = { ...defaultState }, action) => {
  const { type, payload } = action
  switch (type) {
    case LOG_OUT:
      return defaultState
    case LOG_IN:
      return {
        isLoggedIn: true,
        ...payload,
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}

export default reducer
