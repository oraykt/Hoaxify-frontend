import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { useTranslation } from 'react-i18next'
import { useApiProgress } from '../shared/ApiProgress'
import { useDispatch } from 'react-redux'
import { loginHandler } from '../actions/auth'

const UserLoginPage = (props) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const dispatch = useDispatch()
  const { t: translate } = useTranslation()

  const pendingApiCall = useApiProgress('/api/v1/auth')

  useEffect(() => {
    setError(undefined)
  }, [username, password])

  const onClickLogin = async (event) => {
    try {
      event.preventDefault()
      const creds = {
        username,
        password,
      }
      const { push } = props.history
      setError(undefined)

      await dispatch(loginHandler(creds))

      push('/')
    } catch (apiError) {
      setError(apiError.response.data.message)
    }
  }

  const buttonEnabled = username && password

  return (
    <div className='container'>
      <form>
        <h1 className='text-center'>{translate('Login')}</h1>
        {error && <div className='alert alert-danger'>{error}</div>}

        <Input
          type='text'
          label={translate('Username')}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          type='password'
          label={translate('Password')}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className='text-center'>
          <ButtonWithProgress
            onClick={onClickLogin}
            pendingApiCall={pendingApiCall}
            disabled={!buttonEnabled || pendingApiCall}
            text={translate('Login')}
          />
        </div>
      </form>
    </div>
  )
}

export default UserLoginPage
