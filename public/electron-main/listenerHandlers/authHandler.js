const axios = require('axios')

const { serverUrl } = require('../config')
const { SIGNUP, SIGNUP_FAILURE, SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE, GET_CONFIG } = require('../channels')
const { updateConfig } = require('./configHandler')
const setTokenHeader = require('../services/api/setTokenHeader')

const signup = async ({ sender }, { username, password }) => {
  try {
    const res = await axios.post(serverUrl + '/api/auth/signup', { username, password })
    const user = res.data

    updateConfig(user)

    sender.send(SIGNIN_SUCCESS, user)

    setTokenHeader(res.token)

    console.log('signed in', user)
  } catch (error) {
    sender.send(SIGNUP_FAILURE, error)
  }
}

const signin = async ({ sender }, { username, password }) => {
  try {
    const res = await axios.post(serverUrl + '/api/auth/signin', { username, password })
    const user = res.data

    updateConfig(user)

    sender.send(SIGNIN_SUCCESS, user)

    setTokenHeader(res.token)

    console.log('signed in', user)
  } catch (error) {
    const msg = error.response && error.response.data.error.message

    console.log('signing in ERROR', msg || error)
    sender.send(SIGNIN_FAILURE, msg || error)
  }
}

module.exports = {
  signup,
  signin
}
