const { BrowserWindow, ipcMain } = require('electron')

const { SIGNUP, SIGNIN, SIGNIN_FAIL, GET_CONFIG } = require('./channels')
const { api } = require('./services')

const createListeners = (mainWindow) => {
  ipcMain.on(GET_CONFIG, (event, arg) => {
    // dont send localConfig functions
    const { localConfig, ...config } = require('./config')

    mainWindow.webContents.send(GET_CONFIG, config)
  })

  ipcMain.on(SIGNUP, async (event, { username, password }) => {
    const d = +new Date()
    console.log('signup', username, password)
    try {
      const user = await api.handleAuth('signup', { username, password })
      console.log('api complete', (+new Date() - d) / 1000)
      mainWindow.webContents.send(SIGNIN, user)
    } catch (error) {
      console.log(error)
      mainWindow.webContents.send(SIGNIN_FAIL, error)
    }
  })
}

module.exports = createListeners
