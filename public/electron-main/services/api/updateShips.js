const apiCall = require('./apiCall')

const updateShips = async (userId, pilotId, ships) => {
  try {
    const data = await apiCall('post', `/api/players/${userId}/${pilotId}/ships`, ships)

    return data
  } catch (err) {
    throw err
  }
}

module.exports = updateShips
