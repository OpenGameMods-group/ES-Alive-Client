const apiCall = require('./apiCall')

const getPersons = async (userId, levelLimit = 10, localPilots = {}) => {
  try {
    const data = await apiCall('post', `/api/players/${userId}?level=${levelLimit}`,
      {
        'downloadedPilots': localPilots || {}
      })

    return data
  } catch (err) {
    throw err
  }
}

module.exports = getPersons
