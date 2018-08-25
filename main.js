const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const save = require('scripts/data-tools/save')
const { currentDir } = require('scripts/config')
const { validateShip, validateOutfits } = require('scripts/data-tools/validate')

const start = async () => {
  try {
    const pilots = await save.readSaveDir(currentDir)
    const pilotText = await readFile(path.join(currentDir, 'saves', pilots[1] + '.txt'), 'utf-8')
    const parsed = save.parsePilot(pilotText)
    const validatedShips = {
      rejected: [],
      valid: []
    }

    parsed.ships.forEach(ship => {
      validateShip(ship)
        ? validatedShips.valid.push(ship)
        : validatedShips.rejected.push(ship)
    })

    validatedShips.valid = validatedShips.valid.filter(ship => {
      const valid = validateOutfits(ship)

      if (!valid) {
        validatedShips.rejected.push(ship)
      }

      return valid
    })

    console.log(validatedShips.rejected.length, validatedShips.valid.length)

    // first & last .split(' ', 2)
  } catch (e) {
    console.log(e)
  }
}

start()
