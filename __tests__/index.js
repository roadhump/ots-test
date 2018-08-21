/* eslint-env jest */
const {getOptimalChangeFor, getChangeFor} = require('../index')

test.each([
  [100, [100]],
  [99, [50, 20, 20, 5, 2, 2]],
  [98, [50, 20, 20, 5, 2, 1]],
  [90, [50, 20, 20]],
  [10, [10]],
  [9, [5, 2, 2]],
  [4, [2, 2]],
  [2, [2]],
  [0, []],
  [55, [50, 5]]
])('getOptimalChangeFor(%d)', (value, expected) =>
  expect(getOptimalChangeFor(value)).toEqual(expected))

test.each([
  [100, {100: 1}, {result: [100], inventory: {100: 0}}],
  [5, {1: 5}, {result: [1, 1, 1, 1, 1], inventory: {1: 0}}],
  [20, {5: 10, 1: 20}, {result: [5, 5, 5, 5], inventory: {5: 6, 1: 20}}],
  [20, {20: 1, 5: 10, 1: 20}, {result: [20], inventory: {20: 0, 5: 10, 1: 20}}],
  [20, {50: 1, 5: 10, 1: 20}, {result: [5, 5, 5, 5], inventory: {50: 1, 5: 6, 1: 20}}],
  [9, {50: 1, 4: 1, 2: 10, 1: 20}, {result: [4, 2, 2, 1], inventory: {50: 1, 4: 0, 2: 8, 1: 19}}]
])('getChangeFor(%d, %o)', (value, inventory, expected) =>
  expect(getChangeFor(value, inventory)).toEqual(expected))

test.each([
  [100, {
    result: [100],
    inventory: {
      100: 10,
      50: 24,
      20: 0,
      10: 99,
      5: 200,
      2: 11,
      1: 23
    }
  }],
  [20, {
    result: [10, 10],
    inventory: {
      100: 11,
      50: 24,
      20: 0,
      10: 97,
      5: 200,
      2: 11,
      1: 23
    }
  }]
])('getChangeFor(%d) with default inventory', (value, expected) =>
  expect(getChangeFor(value)).toEqual(expected))

test('will throw if no enough coins', () =>
  expect(() => getChangeFor(50, {20: 2})).toThrowError('Not enough coins in inventory')
)
