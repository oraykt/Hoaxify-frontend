import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { signupHandler } from '../actions/auth'
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { useTranslation } from 'react-i18next'
import { useApiProgress } from '../shared/ApiProgress'

const UserSignupPage = ({ history }) => {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null
  })

  const [errors, setErrors] = useState({})

  const { t: translate } = useTranslation()
  const dispatch = useDispatch()

  const pendingApiCallSignup = useApiProgress('post', '/api/v1/users')
  const pendingApiCallLogin = useApiProgress('post', '/api/v1/auth')

  const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin

  const onChange = (event) => {
    const { name, value } = event.target
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }))
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }))
  }

  const onClickSignup = async (event) => {
    try {
      event.preventDefault()

      const { push } = history
      const { username, displayName, password } = form
      const body = {
        username,
        displayName,
        password
      }
      await dispatch(signupHandler(body))
      push('/')
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors)
      }
    }
  }
  const {
    username: usernameError,
    displayName: displayNameError,
    password: passwordError
  } = errors

  let passwordRepeatError
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = 'Password mismatch'
  }

  return (
    <div className='container'>
      <form>
        <h1 className='text-center'>{translate('Sign Up')}</h1>
        <Input
          name='username'
          type='text'
          label={translate('Username')}
          error={usernameError}
          onChange={onChange}
        />
        <Input
          name='displayName'
          type='text'
          label={translate('Display Name')}
          error={displayNameError}
          onChange={onChange}
        />
        <Input
          name='password'
          type='password'
          label={translate('Password')}
          error={translate(passwordError)}
          onChange={onChange}
        />
        <Input
          name='passwordRepeat'
          type='password'
          label={translate('Password Repeat')}
          error={translate(passwordRepeatError)}
          onChange={onChange}
        />
        <div className='text-center'>
          <ButtonWithProgress
            onClick={onClickSignup}
            disabled={pendingApiCall || passwordRepeatError !== undefined}
            pendingApiCall={pendingApiCall}
            text={translate('Sign Up')}
          />
        </div>
      </form>
    </div>
  )
}

UserSignupPage.propTypes = {
  history: PropTypes.object
}

export default UserSignupPage
