const { ipcMain } = require('electron')

const channels = require('./channels')
const authHandler = require('./listenerHandlers/authHandler')
const configHandler = require('./listenerHandlers/configHandler')

const createListeners = (mainWindow) => {
  console.log(ipcMain)
  ipcMain.on(channels.GET_CONFIG, (event, arg) => {
    // dont send localConfig functions
    const { localConfig, ...config } = require('./config')

    mainWindow.webContents.send(channels.GET_CONFIG_SUCCESS, config)
  })

  ipcMain.on(channels.SIGNUP, authHandler.signup)
  ipcMain.on(channels.SIGNIN, authHandler.signin)
  ipcMain.on(channels.GET_USER, configHandler.getUser)
}

module.exports = createListeners
