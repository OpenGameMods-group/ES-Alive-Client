import React, { Component } from 'react'

class AuthForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (evt) => {
    const { name } = evt.target
    this.setState({
      [name]: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const { authType } = this.props
    const { username, password } = this.state

    console.log(username, password, authType)
  }

  render () {
    const { authType } = this.props
    return (
      <form>
        <div className='grid-container'>
          <div className='grid-x grid-padding-x'>
            <div className='medium-10 medium-offset-1 cell'>
              <label>
                Username
                <input
                  onChange={this.handleChange}
                  value={this.state.username}
                  name='username'
                  type='text'
                  placeholder='username' />
              </label>
            </div>
            <div className='medium-10 medium-offset-1 cell'>
              <label>
                Password
                <input
                  onChange={this.handleChange}
                  value={this.state.password}
                  name='password'
                  type='password'
                  placeholder='password' />
              </label>
            </div>
            <div className='cell medium-offset-1 medium-10'>
              <button className='button' onClick={this.handleSubmit}>
                {authType}
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default AuthForm
