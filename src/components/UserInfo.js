import React from 'react'

export default (props) => {
  const user = props.location.state ? props.location.state.user : null

  if (!user) {
    props.history.push('/')

    return <div />
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
