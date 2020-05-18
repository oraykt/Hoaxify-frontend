import React from 'react'

class UserSignupPage extends React.Component {
  state = {
    userName: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  }

  onChange = (event) => {
    const {name,value} = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <form>
        <h1>Sign Up</h1>
        <div className=''>
          <label htmlFor=''>Username</label>
          <input type='text' name='userName' onChange={this.onChange} />
        </div>
        <div className=''>
          <label htmlFor=''>Display Name</label>
          <input type='text' name='displayName' onChange={this.onChange} />
        </div>
        <div className=''>
          <label htmlFor=''>Password</label>
          <input type='password' name='password' onChange={this.onChange} />
        </div>
        <div className=''>
          <label htmlFor=''>Password Repeat</label>
          <input
            type='password'
            name='passwordRepeat'
            onChange={this.onChange}
          />
        </div>
        <button>Sign Up</button>
      </form>
    )
  }
}

export default UserSignupPage
