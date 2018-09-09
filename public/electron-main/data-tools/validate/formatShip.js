// format a ship from save file for uploading
const formatShip = ship => {
  const { _value, sprite, attributes, name, outfits, engine, gun, turret, explode } = ship
  const spriteIsObj = typeof sprite === 'object'
  const attrKeys = Object.keys(attributes)

  const quotedAttr = attrKeys
    .map(key => /".+"/g.test(key) ? key : `"${key}"`)
    .reduce((acc, key, i) => {
      acc[key] = attributes[attrKeys[i]]
      return acc
    }, {})

  return {
    name,
    outfits,
    engine,
    gun,
    turret,
    explode,

    ship: _value,
    sprite: spriteIsObj ? sprite : {
      _value: sprite
    },
    attributes: quotedAttr
  }
}

module.exports = formatShip
