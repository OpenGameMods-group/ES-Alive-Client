import React, { Component } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Routes from 'components/Routes'
import UserInfo from 'components/UserInfo'
import { configActions, userActions } from 'store/actions'

class App extends Component {
  componentDidMount () {
    const lastUser = window.localStorage.getItem('user')

    if (lastUser) {
      console.log('has last user', lastUser)
      this.props.getUser(lastUser)
    }

    this.props.getConfig()
  }

  handleSignout = () => {
    window.localStorage.setItem('user', '')
  }

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

const mapStateToProps = ({ config, user }, ownProps) => ({
  config,
  user
})

export default connect(mapStateToProps, {
  ...configActions,
  ...userActions
})(App)
