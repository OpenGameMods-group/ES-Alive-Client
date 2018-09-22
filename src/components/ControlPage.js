import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DirTile from 'components/DirTile'
import { savesActions } from 'store/actions'

const propTypes = {
  children: PropTypes.node,
  getSaves: PropTypes.func,
  saveDir: PropTypes.array,
  pilotData: PropTypes.object
}

const defaultProps = {
  children: null,
  getSaves: null,
  saveDir: [],
  pilotData: null
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
  const { getSaves, readSave, saveDir, pilotData, ...attributes } = props

  console.log(props)

  return (
    <div className='columns'>
      <div className='column col-10'>
        <h1>Control Panel</h1>

        <DirTile />

        <p>
        Saves: <br />
          <small className='gray'>Select a pilot to scan</small>
        </p>

        <ul>
          {
            saveDir.map((pilot, i) =>
              <li key={pilot + i}>
                <span onClick={() => readSave(pilot)} className='btn btn-link'>
                  {pilot}
                </span>
              </li>
            )
          }
        </ul>

        <button
          className='btn m-2'
          onClick={() => getSaves()}
        >
          Scan Saves
        </button>

        <button className='btn m-2'>Change Save Directory</button>

        <button className='btn m-2'>Upload Pilot</button>

        <hr />

        {
          pilotData && (

            <div>
              <h2>Scanned Pilot Data:</h2>

              <h3>Stats</h3>
              <table className='table table-hover table-fix'>
                <thead>
                  <tr>
                    <th width='200'>Stat</th>
                    <th width='150'>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{pilotData.name}</td>
                  </tr>
                  <tr>
                    <td>Faction</td>
                    <td>{pilotData.faction}</td>
                  </tr>
                  <tr>
                    <td>Credits</td>
                    <td>{pilotData.credits}</td>
                  </tr>
                </tbody>
              </table>

              <h3>Rejected Ships: {pilotData.ships.rejected.length}</h3>

              <table className='table table-hover table-fix'>
                <thead>
                  <tr>
                    <th width='200'>Name</th>
                    <th width='150'>Ship Type</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    pilotData.ships.rejected.map((ship, i) => (
                      <tr key={ship.name + i}>
                        <td>{ship.name}</td>
                        <td>
                          {ship._value}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <h3>Valid Ships: {pilotData.ships.valid.length}</h3>
              <table className='table table-hover table-fix'>
                <thead>
                  <tr>
                    <th width='200'>Name</th>
                    <th width='150'>Ship Type</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    pilotData.ships.valid.map((ship, i) => (
                      <tr key={ship.name + i}>
                        <td>{ship.name}</td>
                        <td>
                          {ship._value}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }

      </div>
    </div>
  )
}

ControlPage.propTypes = propTypes
ControlPage.defaultProps = defaultProps

const mapStateToProps = ({ saves: { saveDir, pilotData } }, ownProps) => ({
  saveDir,
  pilotData
})

export default connect(mapStateToProps, { ...savesActions })(ControlPage)
