import React, { Component } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'

import './App.css'
import { GET_CONFIG } from 'events/channels'
import Routes from 'components/Routes'
import removeListeners from 'events/removeListeners'

class App extends Component {
  state = {
    currentDir: ''
  }

  componentDidMount () {
    const { ipcRenderer } = window.electron
    ipcRenderer.send(GET_CONFIG)

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
            { Routes }
          </main>
        </React.Fragment>
      </Router>
    )
  }
}

export default App
