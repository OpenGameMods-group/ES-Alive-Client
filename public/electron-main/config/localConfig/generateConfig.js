const fs = require('fs')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)

const defaultConfig = require('./defaultConfig.json')
const configInfo = require('./configInfo')

const generateConfig = async (location, username, data = {}) => {
  try {
    if (!username) throw Error('Username required')

    const { existingConfig, configPath } = await configInfo(location, username)

    const configData = JSON.stringify({
      ...defaultConfig,
      ...existingConfig,
      ...data
    }, '', 2)

    const saved = await writeFile(configPath, configData, 'utf-8')

    return 'Saved config'
  } catch (error) {
    throw error
  }
}

module.exports = generateConfig
