const { currentDir } = require('scripts/config')
const save = require('scripts/data-tools/save')

const start = async () => {
  try {
    const pilots = await save.readSaveDir(currentDir)
    const pilotText = await save.readSaveFile(pilots[1])
    const pilotData = await save.parseAndValidate(pilotText)

    console.log(pilotData.credits, pilotData.ships.rejected.length, pilotData.ships.valid.length)
  } catch (e) {
    console.log(e)
  }
}

start()
