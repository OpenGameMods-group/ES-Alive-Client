const apiCall = require('./apiCall')

const signup = async (username, password) => {
  try {
    const data = await apiCall('post', '/api/auth/signup', { username, password })

    return data
  } catch (err) {
    throw err
  }
}

module.exports = signup
