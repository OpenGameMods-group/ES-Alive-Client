// parseAndValidate.js - combines parse and validate
// to parse a pilot and validate the ships/outfits

const { validateShip, validateOutfits } = require('../validate')
const parsePilot = require('./parsePilot')

/**
 * parseAndValidate - combines parse and validate to parse a pilot and validate the ships/outfits
 * Returns object with parsed data and ships object with array of rejected and valid
 * @param {object} pilotText, filename
 * @returns {Object} - { ...parsedData, ships: { rejected: [], valid: [] } }
 */
const parseAndValidate = async ({ pilotText, filename }) => {
  try {
    const parsed = parsePilot({ pilotText, filename })
    const validatedShips = {
      rejected: [],
      valid: []
    }

    // determine if ship name/type exists in vanilla data
    parsed.ships.forEach(ship => {
      validateShip(ship)
        ? validatedShips.valid.push(ship)
        : validatedShips.rejected.push(ship)
    })

    // determine if all outfits name/type exists in vanilla data
    validatedShips.valid = validatedShips.valid.filter(ship => {
      const valid = validateOutfits(ship)

      if (!valid) {
        validatedShips.rejected.push(ship)
      }

      return valid
    })

    return {
      ...parsed,
      ships: validatedShips
    }

    // first & last .split(' ', 2)
  } catch (e) {
    console.log(e)
  }
}

module.exports = parseAndValidate
