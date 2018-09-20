import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SIGNUP, SIGNIN } from 'store/actions/types'
import { userActions } from 'store/actions'

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
    const { authType, history, signin } = this.props
    const { username, password } = this.state

    if (authType === SIGNIN) {
      signin({ username, password, history })
    } else if (authType === SIGNUP) {

    }
  }

  render () {
    const { authType } = this.props
    return (
      <form className='columns'>
        <div className='column col-8'>

          <div className='form-group'>
            <label className='form-label'>
                Username
              <input
                onChange={this.handleChange}
                value={this.state.username}
                name='username'
                type='text'
                placeholder='username'
                className='form-input'
                required
              />
            </label>
          </div>

          <div className='form-group'>
            <label className='form-label'>
                Password
              <input
                onChange={this.handleChange}
                value={this.state.password}
                name='password'
                type='password'
                placeholder='password'
                className='form-input'
                required
              />
            </label>
          </div>

          <div>
            <button className='btn' onClick={this.handleSubmit}>
              {authType}
            </button>
          </div>

        </div>
      </form>
    )
  }
}

export default connect(null, { ...userActions })(AuthForm)
