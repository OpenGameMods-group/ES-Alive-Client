import React from 'react'
import PropTypes from 'prop-types'
import DirTile from 'components/DirTile'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {
  children: null
}

// TODO: Sync Up
// 1. click scan saves btn
// 2. user chooses a save to update / create pilot on server
// 3. pilot is parsed and info is displayed
// 4. if at least one valid ship and step 5 passes
// 5. if newly scanned pilot data is different than old stored data on FS
// 6. then have option to send to server
// 7. Send to server using stored pilot id or find by name & owner
// 8. If pilot not found create a new one, otherwise update pilot
// 9. Store returned data in file storage

export const ControlPage = ({ children, ...props }) => {
  const { ...attributes } = props

  return (
    <div>
      <h1>Control Panel</h1>

      <DirTile />

      <p>Saves: </p>
      <ul>
        <li>save 1</li>
        <li>save 2</li>
      </ul>

      <button className='btn m-2'>Scan Saves</button>
      <button className='btn m-2'>Change Save Directory</button>
    </div>
  )
}

ControlPage.propTypes = propTypes
ControlPage.defaultProps = defaultProps

export default ControlPage
