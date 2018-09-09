import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    message: '',
    currentDir: ''
  }

  componentDidMount () {
    const { ipcRenderer } = window.electron
    ipcRenderer.send('mount-app')
    ipcRenderer.send('get:config')

    ipcRenderer.on('okay', (event, arg) => {
      this.setState({
        message: arg
      })
    })

    ipcRenderer.on('get:config', (event, config) => {
      this.setState({
        currentDir: config.currentDir
      })
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.message}
        <br />
        Detected directory: {this.state.currentDir}
      </div>
    )
  }
}

export default App
