const dataReader = require('../data-reader')

/**
 * Synchronous
 * Takes pilot file, parses it into JSON then returns the bits we want
 * @param {string} pilotFile - PilotFile as a string from readFile
 * @returns {Object} - Pilot object with relations {Object}, ships {Array}, and credits {string}
 */
const parsePilot = ({pilotText, filename}) => {
  try {
    // array of object blocks
    const pilotArrObj = dataReader(pilotText)
    const playerFactions = [ '"Free Worlds"', 'Republic', 'Syndicate', 'Pirate' ]
    const relations = pilotArrObj.find(block => block._value === '"reputation with"')

    const faction = Object.keys(relations)
      .filter(key => playerFactions.includes(key))
      .reduce((a, b) => relations[a] > relations[b] ? a : b, '"Free Worlds"')

    return {
      faction,

      ships: pilotArrObj.filter(block => block._type === 'ship'),

      credits: pilotArrObj.find(block => block._value === 'account').credits,

      name: filename
    }
  } catch (error) {
    throw error
  }
}

module.exports = parsePilot
