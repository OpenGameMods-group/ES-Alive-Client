const outfitsVanilla = require('../../data/json/sorted-game-data/outfit.json')

const validateOutfits = shipObj => {
  const outfits = Object.keys(shipObj.outfits)

  return outfits
    .every(outfit => !!outfitsVanilla
      .find(vanilla => outfit.replace(/["`]/g, '') === vanilla._value.replace(/["`]/g, '')))
}

module.exports = validateOutfits
