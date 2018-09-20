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
    <nav>
      <ul className='menu align-center'>
        <li><Link to='/'>Home</Link></li>
        {
          loggedIn
            ? [
              <li key='user-info-link'>
                <Link to='/userinfo'>User Info</Link>
              </li>,
              <li key='signout-link'><a href='#' onClick={signout}>Signout</a></li>
            ]
            : [
              <li key='signin-link'><Link to='/signin'>Signin</Link></li>,
              <li key='signup-link'><Link to='/signup'>Signup</Link></li>
            ]
        }
      </ul>
    </nav>
  )
}

Navbar.propTypes = propTypes
Navbar.defaultProps = defaultProps

const mapStateToProps = ({ user }, ownProps) => ({
  loggedIn: !!user
})

export default connect(mapStateToProps, { ...userActions })(Navbar)
