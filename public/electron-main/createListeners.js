const { ipcMain } = require('electron')

const { SIGNUP, SIGNUP_FAIL, SIGNIN, SIGNIN_FAIL, GET_CONFIG } = require('./channels')
const authHandler = require('./listenerHandlers/authHandler')

const createListeners = (mainWindow) => {
  ipcMain.on(GET_CONFIG, (event, arg) => {
    // dont send localConfig functions
    const { localConfig, ...config } = require('./config')

    mainWindow.webContents.send(GET_CONFIG, config)
  })

  ipcMain.on(SIGNUP, authHandler.signup)
  ipcMain.on(SIGNIN, authHandler.signin)
}

module.exports = createListeners
