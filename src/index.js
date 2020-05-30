import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './bootstrap-override.scss'
import './i18n'

// import AuthenticationContext from './shared/AuthenticationContext'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
