const apiCall = require('./apiCall')

const signin = async (username, password) => {
  try {
    const data = await apiCall('post', '/api/auth/signin', { username, password })

    return data
  } catch (err) {
    throw err
  }
}

module.exports = signin
