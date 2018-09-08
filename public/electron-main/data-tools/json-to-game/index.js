// jsonToGame - Convert objects to a string that matches the game format
// from an old program so doesn't work 100%
// TODO: create a new one.

// convert an array of objects to game strings
const objArrToGame = (arr) => {
  return arr.map(obj => objToGame(obj)).join('\n')
}

// takes in an object and returns game formatted string
const objToGame = (obj) => {
  // initialize the string and add the first line
  let gameStr = obj._type + ' ' + obj._value + '\n'
  delete obj._value
  delete obj._type

  // begin looping the attributes starting at indent 1 ( 1 tab )
  gameStr += objLooper(obj, 1)

  return gameStr
}

const objLooper = (obj, indent) => {
  let gameStr = ''

  for (let key in obj) {
    const value = obj[key]
    const tabs = '\t'.repeat(indent)

    if (typeof value !== 'object') {
      // string & numerical values | "attr" value
      gameStr += tabs + key + ' ' + value + '\n'
    } else if (typeof value === 'object' && Array.isArray(value)) {
      // array value | prepend the key except for singles
      key = key !== 'singles' ? key + ' ' : ''

      gameStr += value.reduce((str, val) =>
        str + tabs + key + val + '\n',
      '')
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      const _value = value._value
        ? ' ' + value._value
        : ''

      delete value._value

      // object value | loop deeper and if it has its own _value add it
      gameStr += tabs + key + _value + '\n' + objLooper(value, indent + 1)
    }
  }

  return gameStr
}

module.exports = {
  objToGame,
  objArrToGame
}
