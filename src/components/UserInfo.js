import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const propTypes = {
  children: PropTypes.node,
  user: PropTypes.object
}

const defaultProps = {
  children: null,
  user: null
}

export const UserInfo = ({ children, ...props }) => {
  const { user, ...attributes } = props

  if (!user) {
    // TODO: redirect in case user loads on page
    // props.history.push('/')

    return <div><p>Not logged in</p></div>
  }

  const keys = Object.keys(user)

  return (
    <div>
      <table className='table-fix'>
        <thead>
          <tr>
            <th width='200'>Key</th>
            <th width='150'>Value</th>
          </tr>
        </thead>
        <tbody>
          {
            keys.map(key => (
              <tr key={key}>
                <td><strong>{key}</strong></td>
                <td>
                  {
                    Array.isArray(user[key])
                      ? user[key].join(' ') || '[ ]'
                      : user[key]
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

UserInfo.propTypes = propTypes
UserInfo.defaultProps = defaultProps

const mapStateToProps = ({ user }, ownProps) => ({
  user
})

export default connect(mapStateToProps)(UserInfo)
