import { createStore, applyMiddleware, compose } from 'redux'
import SecureLS from 'secure-ls'
import thunk from 'redux-thunk'
import authReducer from './authReducer'

const secureLs = new SecureLS()

const getStateFromStorage = () => {
  const hoaxAuth = secureLs.get('hoax-auth')

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  }
  if (hoaxAuth) return hoaxAuth
  return stateInLocalStorage
}

const updateStateInLocalStorage = (newState) => {
  secureLs.set('hoax-auth', newState)
}

const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    authReducer,
    getStateFromStorage(),
    composeEnhancers(applyMiddleware(thunk))
  )

  store.subscribe(() => {
    updateStateInLocalStorage(store.getState())
  })

  return store
}

export default configureStore
