import React from 'react'
import { signup } from '../api/apiCalls'
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withTranslation } from 'react-i18next'
import { withApiProgress } from '../shared/ApiProgress'

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  }

  onChange = (event) => {
    const { name, value } = event.target
    const errors = { ...this.state.errors }
    errors[name] = undefined

    if (name === 'password' || name === 'passwordRepeat') {
      if (name === 'password' && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = 'Password mismatch'
      } else if (name === 'passwordRepeat' && value !== this.state.password) {
        errors.password = 'Password mismatch'
      } else {
        errors.password = undefined
        errors.passwordRepeat = undefined
      }
    }

    this.setState({
      [name]: value,
      errors,
    })
  }

  onClickSignup = async (event) => {
    try {
      event.preventDefault()
      const { username, displayName, password } = this.state
      const { push } = this.props.history
      const user = {
        username,
        displayName,
        password,
      }
      await signup(user)
      push('/login')
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({
          errors: error.response.data.validationErrors,
        })
      }
    }
  }

  render() {
    const { errors } = this.state
    const { username, displayName, password, passwordRepeat } = errors
    const { pendingApiCall, t: translate } = this.props

    return (
      <div className='container'>
        <form>
          <h1 className='text-center'>{translate('Sign Up')}</h1>
          <Input
            name='username'
            type='text'
            label={translate('Username')}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name='displayName'
            type='text'
            label={translate('Display Name')}
            error={displayName}
            onChange={this.onChange}
          />
          <Input
            name='password'
            type='password'
            label={translate('Password')}
            error={translate(password)}
            onChange={this.onChange}
          />
          <Input
            name='passwordRepeat'
            type='password'
            label={translate('Password Repeat')}
            error={translate(passwordRepeat)}
            onChange={this.onChange}
          />
          <div className='text-center'>
            <ButtonWithProgress
              onClick={this.onClickSignup}
              disabled={pendingApiCall || passwordRepeat !== undefined}
              pendingApiCall={pendingApiCall}
              text={translate('Sign Up')}
            />
          </div>
        </form>
      </div>
    )
  }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage)

export default withApiProgress(UserSignupPageWithTranslation, '/api/1.0/users')
