const axios = require('axios')

const { serverUrl } = require('../config')
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

const signin = ({ sender }, { username, password }) => {
  try {
    // axios.post(serverUrl + '/api/auth/signin', { username, password })
    //   .then(res => res.data)
    //   .then(user => {
    //     console.log('User', user)
    //     console.log('signed in')
    //     updateConfig(user)
    //   })
    //   .catch(error => {
    //     console.log('signing in ERROR', error.response.data.error.message)
    //     sender.send(SIGNIN_FAILURE, error.response.data.error.message)
    //   })

    // console.log('signing in ', serverUrl + '/api/auth/signin')
    axios.post(serverUrl + '/api/auth/signin', { username, password })
      .then(res => res.data)
      .then(user => {
        console.log('User', user)
        updateConfig(user)
        sender.send(SIGNIN, user)
        console.log('signed in')
      })
      .catch(error => {
        console.log('signing in ERROR', error.response.data.error.message)
        sender.send(SIGNIN_FAILURE, error.response.data.error.message)
      })

    // const user = await api.handleAuth('signin', { username, password })
  } catch (error) {
    console.log('signing in ERROR', error)
    sender.send(SIGNIN_FAILURE, error)
  }
}

module.exports = {
  signup,
  signin
}
