import React, { Component } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'

import './App.css'
import { GET_CONFIG, GET_USER } from 'events/channels'
import Routes from 'components/Routes'

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
        console.log('got user', user)
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
    console.log(this.state)
    return (
      <Router>
        <React.Fragment>
          <nav>
            <ul className='menu align-center'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/signin'>Signin</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
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

            {
              this.state.user
                ? <h1>{this.state.user.username}</h1>
                : null
            }

            { Routes }
          </main>
        </React.Fragment>
      </Router>
    )
  }
}

export default App
