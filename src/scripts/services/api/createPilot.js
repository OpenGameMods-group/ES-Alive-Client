const apiCall = require('./apiCall')

const createPilot = async (userId, pilotData) => {
  try {
    const data = await apiCall('post', `/api/players/${userId}/new`, pilotData)

    return data
  } catch (err) {
    throw err
  }
}

module.exports = createPilot
