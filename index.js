/**
 * List of available denominations
 */
const denominations = [
  100,
  50,
  20,
  10,
  5,
  2,
  1
]

/**
 * Append value to array count times
 *
 * @example
 * // returns [1, 2, 'foo', 'foo']
 * appendByCount([1, 2], 'foo', 2)
 *
 * @param {Array} arr
 * @param {*} value
 * @param {integer} count
 * @returns {Array}
 */
const appendByCount = (arr, value, count) =>
  arr.concat([...new Array(count)].map(() => value))

/**
 * Calculate list of optimal coins for incoming value
 *
 * @param {integer} value Amount to split
 * @returns {integer[]} List of coins
 */
const getOptimalChangeFor = (value) => {
  let remainder = value
  let i = 0
  let result = []

  while (remainder) {
    const denomination = denominations[i]
    const count = Math.floor(remainder / denomination)

    i++

    if (!count) continue

    remainder -= denomination * count
    result = appendByCount(result, denomination, count)
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

/**
 * Split value to coins limited by inventory
 *
 * Returns list of coins and new inventory without that coins
 *
 * @param {integer} value Value to split
 * @param {Object} inventory Object with keys for denominations and values for count
 * @returns {Object} Object with fields `result` - list of coins, `inventory` - new inventory
 */
const getChangeFor = (value, inventory = defaultInventory) => {
  const inventoryProcessed = Object.keys(inventory)
    .map((denomination) => ({
      denomination: parseInt(denomination, 10),
      count: inventory[denomination]
    }))
    .sort((a, b) => a.denomination < b.denomination)

  let result = []
  let remainder = value
  let i = 0

  while (remainder) {
    const inventoryItem = inventoryProcessed[i]

    if (!inventoryItem) throw new Error('Not enough coins in inventory')

    const denomination = inventoryItem.denomination
    const denominationCount = Math.min(inventoryItem.count, Math.floor(remainder / denomination))

    i++

    if (!denominationCount) continue

    result = appendByCount(result, denomination, denominationCount)
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
