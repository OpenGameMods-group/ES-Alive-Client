const dataReader = require('scripts/data-tools/data-reader')

/**
 * Synchronous
 * Takes pilot file, parses it into JSON then returns the bits we want
 * @param {string} pilotFile - PilotFile as a string from readFile
 * @returns {Object} - Pilot object with relations {Object}, ships {Array}, and credits {string}
 */
const parsePilot = pilotFile => {
  try {
    // array of object blocks
    const pilotArrObj = dataReader(pilotFile)

    return {
      relations: pilotArrObj.find(block => block._value === '"reputation with"'),

      ships: pilotArrObj.filter(block => block._type === 'ship'),

      credits: pilotArrObj.find(block => block._value === 'account').credits
    }
  } catch (error) {
    throw error
  }
}

module.exports = parsePilot
