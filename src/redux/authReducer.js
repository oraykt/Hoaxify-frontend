import { LOG_IN, LOG_OUT } from '../actions/types'

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
    default:
      return state
  }
}

export default reducer
