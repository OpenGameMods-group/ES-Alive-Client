const { app } = require('electron')

const channels = require('../channels')
const { currentDir } = require('../config')
const save = require('../data-tools/save')

const dataPath = app.getPath('userData')

const getSaves = async ({ sender }, dir = currentDir) => {
  try {
    const pilots = await save.readSaveDir(dir)

    sender.send(channels.GET_SAVES_SUCCESS, pilots)
  } catch (error) {
    sender.send(channels.GET_SAVES_FAILURE, error)
  }
}

module.exports = {
  getSaves
}
