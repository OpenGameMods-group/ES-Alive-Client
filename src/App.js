import React, { Component } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'

import './App.css'
import { GET_CONFIG, GET_USER } from 'events/channels'
import Routes from 'components/Routes'
import UserInfo from 'components/UserInfo'

class App extends Component {
  state = {
    currentDir: '',
    user: null
  }

  componentDidMount () {
    const { ipcRenderer } = window.electron
    const lastUser = window.localStorage.getItem('user')

    ipcRenderer.send(GET_CONFIG)

    if (lastUser) {
      ipcRenderer.send(GET_USER, lastUser)

      ipcRenderer.once(GET_USER, (event, user) => {
        this.setState({
          user
        })
      })
    }

    ipcRenderer.once(GET_CONFIG, (event, config) => {
      this.setState({
        currentDir: config.currentDir
      })
    })
  }

  render () {
    const { user } = this.state

    return (
      <Router>
        <React.Fragment>
          <nav>
            <ul className='menu align-center'>
              <li><Link to='/'>Home</Link></li>
              {
                user
                  ? [
                    <li key='user-info-link'>
                      <Link to={{ pathname: '/userinfo', state: { user } }}>User Info</Link>
                    </li>
                  ]
                  : [
                    <li key='signin-link'><Link to='/signin'>Signin</Link></li>,
                    <li key='signup-link'><Link to='/signup'>Signup</Link></li>
                  ]
              }

            </ul>
          </nav>
          <main className='container'>
            <div className='callout'>
              <h5>Directory</h5>
              <p>
                Detected directory:
                <span className='text-info'> {this.state.currentDir}</span>
              </p>
            </div>

            { Routes }

          </main>
        </React.Fragment>
      </Router>
    )
  }
}

export default App
