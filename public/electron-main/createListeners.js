const { BrowserWindow, ipcMain } = require('electron')

const createListeners = (mainWindow) => {
  ipcMain.on('mount-app', (event, arg) => {
    mainWindow.webContents.send('okay', 'hello')
  })

  ipcMain.on('get:config', (event, arg) => {
    // dont send localConfig functions
    const { localConfig, ...config } = require('./config')

    mainWindow.webContents.send('get:config', config)
  })
}

module.exports = createListeners
