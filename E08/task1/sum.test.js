const sum = require('./sum');

describe('sum', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
  test('adds 10 + 5 to equal 15', () => {
    expect(sum(10, 5)).toBe(15)
  })
})