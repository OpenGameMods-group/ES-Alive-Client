const { BrowserWindow, ipcMain, Menu, app, ipcRenderer } = require('electron')

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 680,
    webPreferences: {
      webSecurity: !isDev,
      preload: path.join(__dirname, 'electron-main', 'preload.js')
    } })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  isDev && mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => { mainWindow = null })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// ipcMain.on('mount-app', (event, arg) => {
//   console.log('mount app main')
//   mainWindow.webContents.send('okay', 'hello')
// })
