const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readdir = promisify(fs.readdir)

/**
 * Asynchronous
 * Returns the pilot names ( filename without extension )
 * Does not include backup saves
 * @param {string} dir - The directory of the game saves/plugins
 * @returns {Array} Array of pilot names
 */
const readSaveDir = async dir => {
  try {
    const fileNames = await readdir(path.join(dir, 'saves'))

    const pilots = fileNames
      .filter(fileName => !/~~/gi.test(fileName))
      .map(fileName => fileName.replace('.txt', ''))

    return pilots
  } catch (error) {
    throw (error)
  }
}

module.exports = readSaveDir
