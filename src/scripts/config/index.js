const os = require('os')

const isDev = process.argv.includes('--dev')
const platform = process.platform
const homeDir = os.homedir()

const DIR_LINUX = `${homeDir}/.local/share/endless-sky/`
const DIR_WIN = `${homeDir}\\AppData\\Roaming\\endless-sky\\`
const DIR_MAC = `${homeDir}/Library/ApplicationSupport/endless-sky/`

const currentDir = platform === 'darwin'
  ? DIR_MAC
  : platform === 'win32'
    ? DIR_WIN
    : DIR_LINUX

module.exports = {

  serverUrl: isDev
    ? 'localhost:5000'
    : 'https://boiling-harbor-27812.herokuapp.com',

  isDev,
  platform,
  DIR_LINUX,
  DIR_WIN,
  DIR_MAC,
  currentDir,
  homeDir
}
