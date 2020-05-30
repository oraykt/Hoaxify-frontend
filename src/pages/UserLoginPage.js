import React from 'react'
import { login } from '../api/apiCalls'
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withTranslation } from 'react-i18next'
import { withApiProgress } from '../shared/ApiProgress'

// import { Authentication } from '../shared/AuthenticationContext'
class UserLoginPage extends React.Component {
  // static contextType = Authentication

  state = {
    username: null,
    password: null,
    error: null,
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
      error: false,
    })
  }

  onClickLogin = async (event) => {
    try {
      event.preventDefault()
      const { username, password } = this.state
      const onLoginSuccess = () => {}
      const user = {
        username,
        password,
      }
      const { push } = this.props.history
      this.setState({ error: null })
      const response = await login(user)
      push('/')

      const authState = {
        ...response.data,
        password,
      }

      onLoginSuccess(authState)
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      })
    }
  }

  render() {
    const { error, username, password } = this.state
    const { t: translate, pendingApiCall } = this.props

    const buttonEnabled = username && password

    return (
      <div className='container'>
        <form>
          <h1 className='text-center'>{translate('Login')}</h1>
          {error && <div className='alert alert-danger'>{error}</div>}

          <Input
            name='username'
            type='text'
            label={translate('Username')}
            onChange={this.onChange}
          />
          <Input
            name='password'
            type='password'
            label={translate('Password')}
            onChange={this.onChange}
          />
          <div className='text-center'>
            <ButtonWithProgress
              onClick={this.onClickLogin}
              pendingApiCall={pendingApiCall}
              disabled={!buttonEnabled || pendingApiCall}
              text={translate('Login')}
            />
          </div>
        </form>
      </div>
    )
  }
}

const UserLoginPageWithTranslation = withTranslation()(UserLoginPage)

export default withApiProgress(UserLoginPageWithTranslation, '/api/1.0/auth')
