const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const configInfo = async (location, username) => {
  try {
    const configPath = path.join(location, `${username}.json`)
    const hasConfig = fs.existsSync(configPath)
    const existingConfig = hasConfig &&
      JSON.parse(await readFile(configPath, 'utf-8'))

    return {
      configPath,
      hasConfig,
      existingConfig
    }
  } catch (error) {
    throw error
  }
}

module.exports = configInfo
