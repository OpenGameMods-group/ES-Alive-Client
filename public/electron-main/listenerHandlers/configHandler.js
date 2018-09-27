const { app } = require('electron')

const channels = require('../channels')
const config = require('../config')

const dataPath = app.getPath('userData')
const setTokenHeader = require('../services/api/setTokenHeader')

const updateConfig = async (user) => {
  try {
    await config.localConfig.generateConfig(dataPath, user.username, user)
  } catch (error) {
    throw error
  }
}

const getUser = async ({ sender }, username) => {
  try {
    const { existingConfig } = await config.localConfig.configInfo(dataPath, username) || {}

    setTokenHeader(existingConfig.token)

    sender.send(channels.GET_USER_SUCCESS, existingConfig)
  } catch (error) {
    sender.send(channels.GET_USER_FAILURE, error)
  }
}

module.exports = {
  updateConfig,
  getUser
}
