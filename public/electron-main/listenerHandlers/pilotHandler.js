const axios = require('axios')

const { serverUrl } = require('../config')
const { UPLOAD_PILOT, UPLOAD_PILOT_FAILURE, UPLOAD_PILOT_SUCCESS } = require('../channels')
const { updateConfig } = require('./configHandler')
const { formatShip } = require('../data-tools/validate')
const setTokenHeader = require('../services/api/setTokenHeader')

const uploadPilot = async ({ sender }, { user, pilotData }) => {
  try {
    const { name, faction, credits } = pilotData
    const { _id: userId, token } = user

    setTokenHeader(token)

    const res = await axios.post(serverUrl + `/api/players/${userId}/new`, { name, faction, credits })
    const pilot = res.data

    console.log('new/got', pilot)

    const { _id: pilotId } = pilot

    const shipsToUpload = pilotData.ships.valid.slice(0, 10).map(formatShip)

    const uploadRes = await axios.post(
      serverUrl + `/api/players/${userId}/${pilotId}/ships`,
      { ships: shipsToUpload }
    )

    const { ships, ...pilot } = uploadRes.data

    // TODO: put user's pilot data in storage

    sender.send(UPLOAD_PILOT_SUCCESS, { ships, pilot })
  } catch (error) {
    console.log(error, error.response.data.error.message)
    sender.send(UPLOAD_PILOT_FAILURE, error)
  }
}

module.exports = {
  uploadPilot
}
