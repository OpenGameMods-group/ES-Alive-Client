const apiCall = require('./apiCall')

const signin = async (username, password) => {
  try {
    console.log('signin func', username, password)
    // const data = await apiCall('post', '/api/auth/signin', { username, password })

    // return data
    return apiCall('post', '/api/auth/signin', { username, password })
  } catch (err) {
    throw err
  }
}

module.exports = signin
