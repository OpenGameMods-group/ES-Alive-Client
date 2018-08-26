
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const { currentDir } = require('scripts/config')
const save = require('scripts/data-tools/save')

const start = async () => {
  try {
    const pilots = await save.readSaveDir(currentDir)
    const pilotText = await readFile(path.join(currentDir, 'saves', pilots[1] + '.txt'), 'utf-8')

    const pilotData = await save.parseAndValidate(pilotText)

    console.log(pilotData)

    // first & last .split(' ', 2)
  } catch (e) {
    console.log(e)
  }
}

start()
