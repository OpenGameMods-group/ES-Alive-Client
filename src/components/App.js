import React, { Component } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { GET_CONFIG, GET_USER } from 'events/channels'
import Routes from 'components/Routes'
import UserInfo from 'components/UserInfo'
import * as configActions from 'store/actions/configActions'

class App extends Component {
  componentDidMount () {
    this.props.getConfig()
    // const { ipcRenderer } = window.electron
    // const lastUser = window.localStorage.getItem('user')

    // ipcRenderer.send(GET_CONFIG)

    // if (lastUser) {
    //   ipcRenderer.send(GET_USER, lastUser)

    //   ipcRenderer.once(GET_USER, (event, user) => {
    //     this.setState({
    //       user
    //     })
    //   })
    // }

    // ipcRenderer.once(GET_CONFIG, (event, config) => {
    //   this.setState({
    //     currentDir: config.currentDir
    //   })
    // })
  }

  // handleSignout = () => {
  //   window.localStorage.setItem('user', '')

  //   this.setState({ user: null })
  // }

  // handleSignin = (user) => {
  //   this.setState({ user })
  // }

  render () {
    return (
      <Router>
        <React.Fragment>
          <nav>
            <ul className='menu align-center'>
              <li><Link to='/'>Home</Link></li>
              {
                this.props.user
                  ? [
                    <li key='user-info-link'>
                      <Link to='/userinfo'>User Info</Link>
                    </li>,
                    <li key='signout-link'><a href='#' onClick={this.handleSignout}>Signout</a></li>
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
                <span className='text-info'>
                  { this.props.config ? this.props.config.currentDir : 'unknown'}
                </span>
              </p>
            </div>

            { Routes }

          </main>
        </React.Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ config }, ownProps) => ({
  config
})

export default connect(mapStateToProps, configActions)(App)
