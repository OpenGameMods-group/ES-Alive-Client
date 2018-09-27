const axios = require('axios')

const { serverUrl } = require('../config')
const { UPLOAD_PILOT, UPLOAD_PILOT_FAILURE, UPLOAD_PILOT_SUCCESS } = require('../channels')
const { updateConfig } = require('./configHandler')
const { formatShip } = require('../data-tools/validate')
const setTokenHeader = require('../services/api/setTokenHeader')

const uploadPilot = async ({ sender }, { user, pilotData }) => {
  try {
    const { name, faction, credits } = pilotData
    const { _id: userId, token, pilots: pilotsInConfig } = user

    let pilotId = Object.keys(pilotsInConfig).filter(id => pilotsInConfig[id].name === name)[0]

    setTokenHeader(token)

    if (pilotId) {
      // use pilot id from config
      console.log('pilot is in config', pilotId)
    } else {
      const newPilotRes = await axios.post(serverUrl + `/api/players/${userId}/new`, { name, faction, credits })
      const newPilot = newPilotRes.data

      console.log('new pilot', newPilot)

      pilotId = newPilot._id
    }

    const shipsToUpload = pilotData.ships.valid.slice(0, 10).map(formatShip)

    const uploadRes = await axios.post(
      serverUrl + `/api/players/${userId}/${pilotId}/ships`,
      { ships: shipsToUpload }
    )

    const { ships, ...pilot } = uploadRes.data

    // TODO: update config from server
    // TODO: put user's pilot data in storage

    sender.send(UPLOAD_PILOT_SUCCESS, { ships, pilot })

    updateConfig({
      ...user,
      pilots: {
        ...user.pilots,
        [pilot._id]: {
          ...pilot,
          ships: ships.map(s => s._id)
        }
      }
    })
  } catch (error) {
    console.log(error, error.response.data.error.message)
    sender.send(UPLOAD_PILOT_FAILURE, error)
  }
}

module.exports = {
  uploadPilot
}
