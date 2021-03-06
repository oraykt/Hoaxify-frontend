import { createStore, applyMiddleware, compose } from 'redux'
import SecureLS from 'secure-ls'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import { setAuthorizationHeader } from '../api/apiCalls'

const secureLs = new SecureLS()

const getStateFromStorage = () => {
  const hoaxAuth = secureLs.get('hoax-auth')

  const stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  }
  if (hoaxAuth) return hoaxAuth
  return stateInLocalStorage
}

const updateStateInLocalStorage = (newState) => {
  secureLs.set('hoax-auth', newState)
}

const configureStore = () => {
  const initialState = getStateFromStorage()
  setAuthorizationHeader(initialState)

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    authReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

  store.subscribe(() => {
    updateStateInLocalStorage(store.getState())
    setAuthorizationHeader(store.getState())
  })

  return store
}

export default configureStore
