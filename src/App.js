import React from 'react'
import LanguageSelector from './components/LanguageSelector'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import UserLoginPage from './pages/UserLoginPage'
import UserSignupPage from './pages/UserSignupPage'

import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopBar from './components/TopBar'

const App = () => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }))

  return (
    <div className='container'>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          {!isLoggedIn && (
            <Route exact path='/login' component={UserLoginPage} />
          )}
          <Route exact path='/signup' component={UserSignupPage} />
          <Route exact path='/users/:username' component={UserPage} />
          <Redirect to='/' />
        </Switch>
      </Router>
      <LanguageSelector />
    </div>
  )
}

export default App
