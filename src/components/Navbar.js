import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { userActions } from 'store/actions'

const propTypes = {
  children: PropTypes.node,
  loggedIn: PropTypes.bool,
  signout: PropTypes.func
}

const defaultProps = {
  children: null,
  loggedIn: null,
  signout: null
}

export const Navbar = ({ children, ...props }) => {
  const { signout, loggedIn, ...attributes } = props

  return (
    <nav class='navbar p-2'>
      <section className='navbar-section'>
        <Link to='/' className='btn btn-link'>Home</Link>
        {
          loggedIn
            ? [
              <Link
                key='user-info-link'
                to='/userinfo'
                className='btn btn-link'>
                User Info
              </Link>,

              <Link
                key='user-controls-link'
                to='/control'
                className='btn btn-link'>
                Control Panel
              </Link>,

              <a
                key='signout-link'
                href='#'
                onClick={signout}
                className='btn btn-link'>
                Signout
              </a>
            ]
            : [
              <Link
                key='signin-link'
                to='/signin'
                className='btn btn-link'>
                Signin
              </Link>,
              <Link
                key='signup-link'
                to='/signup'
                className='btn btn-link'>
                Signup
              </Link>
            ]
        }
      </section>
    </nav>
  )
}

Navbar.propTypes = propTypes
Navbar.defaultProps = defaultProps

const mapStateToProps = ({ user }, ownProps) => ({
  loggedIn: !!user
})

export default connect(mapStateToProps, { ...userActions })(Navbar)
