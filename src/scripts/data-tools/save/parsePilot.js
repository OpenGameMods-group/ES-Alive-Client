const dataReader = require('scripts/data-tools/data-reader')

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
