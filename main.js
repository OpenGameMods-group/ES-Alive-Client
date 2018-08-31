const { currentDir } = require('scripts/config')
const save = require('scripts/data-tools/save')
const { api } = require('scripts/services')
const { formatShip } = require('scripts/data-tools/validate')

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

    const pilots = await save.readSaveDir(currentDir)
    const pilotFile = await save.readSaveFile(pilots[1])
    const pilotData = await save.parseAndValidate(pilotFile)

    // console.log(pilotData.credits, pilotData.ships.rejected.length, pilotData.ships.valid.length)

    const user = await api.handleAuth('signin', { username: 'grab', password: 'abc123' })

    // const pilot = await api.createPilot(user._id, {
    //   faction: pilotData.faction,
    //   credits: pilotData.credits,
    //   name: pilotData.name
    // })

    // const shipsToUpload = pilotData.ships.valid.slice(0, 10).map(formatShip)

    // TODO: store this in local config storage file
    // console.log(await api.updateShips(user._id, pilot._id, { ships: shipsToUpload }))

    // TODO: store person ids in local storage/config and generate plugin
    // console.log(await api.getPersons(user._id, 9999))

    // console.log(newPilot)
  } catch (err) {
    // show error message to user
    console.log(err)
  }
}

start()
