const { currentDir } = require('scripts/config')
const save = require('scripts/data-tools/save')
const { api } = require('scripts/services')

const start = async () => {
  try {
    // TODO: Sync Up
    // 1. click scan saves btn
    // 2. user chooses a save to update / create pilot on server
    // 3. pilot is parsed and info is displayed
    // 4. if at least one valid ship and step 5 passes
    // 5. if newly scanned pilot data is different than old stored data on FS
    // 6. then have option to send to server
    // 7. Send to server using stored pilot id or find by name & owner
    // 8. If pilot not found create a new one, otherwise update pilot
    // 9. Store returned data in file storage

    // const pilots = await save.readSaveDir(currentDir)
    // const pilotText = await save.readSaveFile(pilots[1])
    // const pilotData = await save.parseAndValidate(pilotText)

    // console.log(pilotData.credits, pilotData.ships.rejected.length, pilotData.ships.valid.length)

    const user = await api.handleAuth('signin', { username: 'abc123', password: 'abc123' })
    const newPilot = await api.createPilot(user.id, { name: 'Test123', credits: 10000 })

    console.log(newPilot)
  } catch (err) {
    // show error message to user
    console.log(err)
  }
}

start()
