const { SIGNUP, SIGNUP_FAIL, SIGNIN, SIGNIN_FAIL, GET_CONFIG } = require('../channels')
const { api } = require('../services')
const { updateConfig } = require('./configHandler')

const signup = async ({ sender }, { username, password }) => {
  try {
    const user = await api.handleAuth('signup', { username, password })

    sender.send(SIGNIN, user)
  } catch (error) {
    sender.send(SIGNUP_FAIL, error)
  }
}

const signin = async ({ sender }, { username, password }) => {
  try {
    const user = await api.handleAuth('signin', { username, password })

    updateConfig(user)
    sender.send(SIGNIN, user)
  } catch (error) {
    sender.send(SIGNIN_FAIL, error)
  }
}

module.exports = {
  signup,
  signin
}
