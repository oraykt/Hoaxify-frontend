import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './bootstrap-override.scss'
import './i18n'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
