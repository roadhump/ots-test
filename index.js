const denominations = [
  100,
  50,
  20,
  10,
  5,
  2,
  1
]

const getOptimalChangeFor = (value) => {
  let remainder = value
  let i = 0
  let result = Object.create(null)

  while (remainder) {
    const denomination = denominations[i]
    const count = Math.floor(remainder / denomination)

    i++

    if (!count) continue

    remainder -= denomination * count
    result[denomination] = count
  }

  return result
}

const defaultInventory = {
  100: 11,
  50: 24,
  20: 0,
  10: 99,
  5: 200,
  2: 11,
  1: 23
}

const getChangeFor = (value, inventory = defaultInventory) => {
  const inventoryProcessed = Object.keys(inventory)
    .map((denomination) => ({
      denomination: parseInt(denomination, 10),
      count: inventory[denomination]
    }))
    .sort((a, b) => a.denomination < b.denomination)

  let result = Object.create(null)
  let remainder = value
  let i = 0

  while (remainder) {
    const inventoryItem = inventoryProcessed[i]

    if (!inventoryItem) throw new Error('Not enough coins in inventory')

    const denomination = inventoryItem.denomination
    const denominationCount = Math.min(inventoryItem.count, Math.floor(remainder / denomination))

    i++

    if (!denominationCount) continue

    result[denomination] = denominationCount
    remainder -= denomination * denominationCount
    inventoryItem.count -= denominationCount
  }

  const resInventory = Object.create(null)
  inventoryProcessed.forEach(({denomination, count}) => {
    resInventory[denomination] = count
  })

  return {result, inventory: resInventory}
}

module.exports = {
  getOptimalChangeFor,
  getChangeFor
}
