// old data reader project TODO: needs updating

const firstNonQuotedSpace = (str) => {
  str = str.trim()
  let quoteBalance = 0
  let tildeBalance = 0

  // no quotes
  if (!/"/g.test(str)) return str.indexOf(' ')

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const charIsQuote = char === '"'
    const charIsTilde = char === '`'

    if (charIsQuote) quoteBalance++
    if (charIsTilde) tildeBalance++

    const balancedQuotes = quoteBalance % 2 === 0
    const balancedTilde = tildeBalance % 2 === 0

    if (char === ' ' && balancedQuotes && balancedTilde) return i
  }

  return -1
}

const dataReader = input => {
  // go line by line count indents
  const lines = input.split('\n').filter(line => line.trim().length > 1)
  const parsedData = []
  let objectQue = []
  let line

  for (let i = 0; i < lines.length; i++) {
    try {
      if (i === lines.length - 1 && objectQue.length) {
        // last object
        parsedData.push(objectQue[0])
        break
      }

      line = lines[i]
      const indentMatch = line.match(/\t+/)
      const indentCount = indentMatch ? indentMatch[0].length : 0
      const nextIndentMatch = lines[i + 1].match(/\t+/)
      const nextIndentCount = nextIndentMatch ? nextIndentMatch[0].length : 0
      const currentObject = objectQue[objectQue.length - 1]

      // remove indents now
      line = line.trim()

      // if empty line skip
      if (!line.length || line[0] === '#') continue

      const firstSpace = firstNonQuotedSpace(line)
      const attr = line.substr(0, firstSpace)
      const val = line.substr(firstSpace + 1)

      if (indentCount === 0) {
        // if no indents it's a root object
        if (objectQue.length > 0) {
          // if back to 0 indents then clear list
          // & add to data, it's a new object
          parsedData.push(objectQue[0])
          objectQue = []
        }

        objectQue.push({
          _type: attr,
          _value: val
        })

        continue
      }

      const isParentObj = nextIndentCount > indentCount

      if (attr && val && !isParentObj) {
        const existingVal = currentObject[attr]
        // key: val i.e hull: 400
        existingVal
          ? Array.isArray(existingVal)
            ? existingVal.push(val)
            : currentObject[attr] = [existingVal, val]

          : currentObject[attr] = val
      } else if (indentCount > 0 && isParentObj) {
        objectQue.length = indentCount
        const parent = objectQue[objectQue.length - 1]

        if (attr) {
          const node = { _value: val }

          parent[attr] = attr in parent
            ? Array.isArray(parent[attr])
              ? [ ...parent[attr], node ]
              : [ parent[attr], node ]
            : node

          Array.isArray(parent[attr])
            ? objectQue.push(parent[attr][parent[attr].length - 1])
            : objectQue.push(parent[attr])
        } else {
          const node = {}

          parent[val] = val in parent
            ? Array.isArray(parent[val])
              ? [ ...parent[val], node ]
              : [ parent[val], node ]
            : node

          Array.isArray(parent[val])
            ? objectQue.push(parent[val][parent[val].length - 1])
            : objectQue.push(parent[val])
        }

        // new sub object i.e outfits {}
        // objectQue.length = indentCount
        // const parent = objectQue[objectQue.length - 1]

        // parent[val] = {}
        // objectQue.push(parent[val])
      } else {
        // single values i.e outfits with no numbers
        objectQue[objectQue.length - 1][val] = 1
      }

      if (nextIndentCount < indentCount && nextIndentCount > 0) {
        objectQue.length = nextIndentCount
      }
    } catch (error) {
      console.log('ERROR: ', error)
      // console.log(line, objectQue[0])
    }
  }

  // return JSON object
  return parsedData
}

module.exports = dataReader
