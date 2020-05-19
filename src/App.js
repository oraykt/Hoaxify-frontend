import React from 'react'
import UserSignupPage from './pages/UserSignupPage'
import UserLoginPage from './pages/UserLoginPage'
import LanguageSelector from './components/LanguageSelector'

const App = () => {
  return (
    <div className='container'>
      <UserSignupPage />
      <LanguageSelector />
    </div>
  )
}

export default App
