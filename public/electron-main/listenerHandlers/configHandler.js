const { app } = require('electron')

const channels = require('../channels')
const config = require('../config')

const dataPath = app.getPath('userData')

const updateConfig = async (user) => {
  try {
    console.log(await config.localConfig.generateConfig(dataPath, user.username, user))
  } catch (error) {
    throw error
  }
}

const getUser = async ({ sender }, username) => {
  try {
    const { existingConfig } = await config.localConfig.configInfo(dataPath, username) || {}

    sender.send(channels.GET_USER, existingConfig)
  } catch (error) {
    sender.send(channels.CONFIG_ERROR, error)
  }
}

module.exports = {
  updateConfig,
  getUser
}
