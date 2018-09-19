const { SIGNUP, SIGNUP_FAILURE, SIGNIN, SIGNIN_FAILURE, GET_CONFIG } = require('../channels')
const { api } = require('../services')
const { updateConfig } = require('./configHandler')

const signup = async ({ sender }, { username, password }) => {
  try {
    const user = await api.handleAuth('signup', { username, password })

    sender.send(SIGNIN, user)
  } catch (error) {
    sender.send(SIGNUP_FAILURE, error)
  }
}

const signin = async ({ sender }, { username, password }) => {
  try {
    console.log('signing in ')
    const user = await api.handleAuth('signin', { username, password })

    updateConfig(user)
    sender.send(SIGNIN, user)
    console.log('signed in')
  } catch (error) {
    console.log('signing in ERROR', error)
    sender.send(SIGNIN_FAILURE, error)
  }
}

module.exports = {
  signup,
  signin
}
