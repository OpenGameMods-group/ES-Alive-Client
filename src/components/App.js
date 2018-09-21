import React, { Component } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import Routes from 'components/Routes'
import Navbar from 'components/Navbar'

import { configActions, userActions } from 'store/actions'

class App extends Component {
  componentDidMount () {
    const lastUser = window.localStorage.getItem('user')

    if (lastUser) {
      this.props.getUser(lastUser)
    }

    this.props.getConfig()
  }

  render () {
    return (
      <Router>
        <React.Fragment>
          <Navbar />

          <main className='container'>

            { Routes }

          </main>
        </React.Fragment>
      </Router>
    )
  }
}

// const mapStateToProps = ({ config, user }, ownProps) => ({
//   config,
//   user
// })

export default connect(null, {
  ...configActions,
  ...userActions
})(App)
