const signin = require('./signin')
const signup = require('./signup')
const setTokenHeader = require('./setTokenHeader')

const handleAuth = async (type, { username, password }) => {
  try {
    let data

    switch (type) {
      case 'signin':
        data = await signin(username, password)
        break
      case 'signup':
        data = await signup(username, password)
        break
      case 'signout':
        // TODO: clear data
        return setTokenHeader(false)
      default:
        throw new Error('Invalid auth type')
    }

    setTokenHeader(data.token)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = handleAuth
