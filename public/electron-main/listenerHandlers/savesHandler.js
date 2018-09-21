const channels = require('../channels')
const { currentDir } = require('../config')
const save = require('../data-tools/save')

const getSaves = async ({ sender }, dir = currentDir) => {
  try {
    const pilots = await save.readSaveDir(dir)

    sender.send(channels.GET_SAVES_SUCCESS, pilots)
  } catch (error) {
    sender.send(channels.GET_SAVES_FAILURE, error)
  }
}

const readSave = async ({ sender }, pilotName) => {
  try {
    const pilotFile = await save.readSaveFile(pilotName)
    const pilotData = await save.parseAndValidate(pilotFile)

    sender.send(channels.GET_SAVE_SUCCESS, pilotData)
  } catch (error) {
    sender.send(channels.GET_SAVE_FAILURE, error)
  }
}

module.exports = {
  getSaves,
  readSave
}
