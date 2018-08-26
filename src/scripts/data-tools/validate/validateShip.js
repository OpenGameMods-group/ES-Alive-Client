const ships = require('data/json/sorted-game-data/ship.json')

const validateShip = shipObj => {
  if (shipObj.attributes.automaton) return false

  return !!ships
    .find(ship => shipObj._value.replace(/"/g, '') === ship._value.replace(/"/g, ''))
}

module.exports = validateShip
