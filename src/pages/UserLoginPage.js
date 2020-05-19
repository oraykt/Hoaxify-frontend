import React from 'react'
import { login } from '../api/apiCalls'
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withTranslation } from 'react-i18next'
import axios from 'axios'

class UserLoginPage extends React.Component {
  state = {
    username: null,
    password: null,
    pendingApiCall: false,
    error: null,
  }

  componentDidMount() {
    axios.interceptors.request.use((request) => {
      this.setState({ pendingApiCall: true })
      return request
    })

    axios.interceptors.response.use(
      (response) => {
        this.setState({ pendingApiCall: false })
        return response
      },
      (error) => {
        this.setState({ pendingApiCall: false })
        throw error
      }
    )
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
      const user = {
        username,
        password,
      }
      this.setState({ error: null })
      await login(user)
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      })
    }
  }

  render() {
    const { pendingApiCall, error, username, password } = this.state
    const { t: translate } = this.props

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

export default withTranslation()(UserLoginPage)
