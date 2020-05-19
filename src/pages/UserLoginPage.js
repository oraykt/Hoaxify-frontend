import React from 'react'
import { login } from '../api/apiCalls'
import Input from '../components/Input'
import { withTranslation } from 'react-i18next'

class UserLoginPage extends React.Component {
  state = {
    username: null,
    password: null,
    pendingApiCall: false,
    errors: {},
  }

  onChange = (event) => {
    const { name, value } = event.target
    const errors = { ...this.state.errors }
    errors[name] = undefined
    this.setState({
      [name]: value,
      errors,
    })
  }

  onClickLogin = async (event) => {
    try {
      event.preventDefault()
      const { username, password } = this.state
      const user = {
        username,
        password,
      }
      this.setState({ pendingApiCall: true })
      const response = await login(user)
      response.status === 200 && this.setState({ pendingApiCall: false })
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({
          errors: error.response.data.validationErrors,
          pendingApiCall: false,
        })
      }
    }
  }

  render() {
    const { pendingApiCall, errors } = this.state
    const { username, password } = errors
    const { t: translate } = this.props
    return (
      <div className='container'>
        <form>
          <h1 className='text-center'>{translate('Login')}</h1>
          <Input
            name='username'
            type='text'
            label={translate('Username')}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name='password'
            type='password'
            label={translate('Password')}
            error={translate(password)}
            onChange={this.onChange}
          />
          <div className='text-center'>
            <button
              className='btn btn-primary'
              onClick={this.onClickLogin}
              disabled={pendingApiCall || this.state.password === null}
            >
              {pendingApiCall && (
                <span className='spinner-border spinner-border-sm'></span>
              )}{' '}
              {translate('Login')}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default withTranslation()(UserLoginPage)
