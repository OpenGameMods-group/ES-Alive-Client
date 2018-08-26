const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const { currentDir } = require('scripts/config')

const readSaveFile = async (pilotName) => {
  try {
    const pilotText = await readFile(path.join(currentDir, 'saves', pilotName + '.txt'), 'utf-8')

    return pilotText
  } catch (e) {
    console.log(e)
  }
}

module.exports = readSaveFile