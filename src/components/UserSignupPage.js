import React from 'react'
import axios from 'axios'

class UserSignupPage extends React.Component {
  state = {
    userName: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  onClickSignup = async (event) => {
    try {
      event.preventDefault()

      const { userName, displayName, password } = this.state
      const body = {
        userName,
        displayName,
        password,
      }
      await axios.post('/api/1.0/users', body)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className='container'>
        <form>
          <h1 className='text-center'>Sign Up</h1>
          <div className='form-group'>
            <label htmlFor=''>Username</label>
            <input
              type='text'
              name='userName'
              className='form-control'
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Display Name</label>
            <input
              type='text'
              name='displayName'
              className='form-control'
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Password</label>
            <input
              type='password'
              name='password'
              className='form-control'
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Password Repeat</label>
            <input
              type='password'
              name='passwordRepeat'
              className='form-control'
              onChange={this.onChange}
            />
          </div>
          <div className='text-center'>
            <button className='btn btn-primary' onClick={this.onClickSignup}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UserSignupPage
