
const personCreator = (arrOfPilots) => {
  const personStrings = arrOfPilots.map(createPerson)

  return personStrings
}

const createPerson = ({ships, ...pilot}) => {
  const ship = ships[0]

  const outfits = Object.keys(ship.outfits).reduce((acc, outfit) => {
    acc += `\t\t\t${outfit} ${ship.outfits[outfit]}\n`
    return acc
  }, '')

  const gun = ship.gun.reduce((acc, gun) => {
    acc += `\t\tgun ${gun}\n`
    return acc
  }, '')

  const turret = ship.turret.reduce((acc, turret) => {
    acc += `\t\tturret ${turret}\n`
    return acc
  }, '')

  return `
  
  Person ${pilot.name}
  \tgovernment ${pilot.faction}
  \tfrequency 10000
  \tpersonality
  \t\tplunders
  \tphrase
  \t\tword
  \t\t\t"I'm ${pilot.name} of the ${pilot.faction} and my fleet is level ${pilot.fleetLevel}"
  \tship ${ship.ship}
  \t\toutfits
${outfits}
${gun}
${turret}
  `
}

module.exports = {
  personCreator
}
