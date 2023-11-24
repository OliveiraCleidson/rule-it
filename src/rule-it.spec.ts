import { RuleIt } from './rule-it'

describe('Rule It - Unit Test', () => {
  let sut: typeof RuleIt
  beforeEach(() => {
    sut = RuleIt
  })

  describe('String Operators', () => {
    it.each([
      { operator: 'eq', a: 'a', b: 'a', expected: true },
      { operator: 'eq', a: 'a', b: 'b', expected: false },
      { operator: 'ne', a: 'a', b: 'a', expected: false },
      { operator: 'ne', a: 'a', b: 'b', expected: true },
      { operator: 'like', a: 'some love story', b: 'love', expected: true },
      { operator: 'like', a: 'some Love story', b: 'love', expected: false },
      { operator: 'like', a: 'a', b: 'a', expected: true },
      { operator: 'like', a: 'a', b: 'b', expected: false }
    ] as const)('%# - %o', ({ operator, a, b, expected }) => {
      expect(sut.expression(operator, a, b)).toEqual(expected)
    })
  })

  describe('Numbers Operators', () => {
    it.each([
      { operator: 'eq', a: 1, b: 1, expected: true },
      { operator: 'eq', a: 1, b: 2, expected: false },
      { operator: 'ne', a: 1, b: 1, expected: false },
      { operator: 'ne', a: 1, b: 2, expected: true },
      { operator: 'gt', a: 2, b: 1, expected: true },
      { operator: 'gt', a: 1, b: 2, expected: false },
      { operator: 'ge', a: 2, b: 1, expected: true },
      { operator: 'ge', a: 1, b: 2, expected: false },
      { operator: 'lt', a: 1, b: 2, expected: true },
      { operator: 'lt', a: 2, b: 1, expected: false },
      { operator: 'le', a: 1, b: 2, expected: true },
      { operator: 'le', a: 2, b: 1, expected: false }
    ] as const)('%# - %o', ({ operator, a, b, expected }) => {
      expect(sut.expression(operator, a, b)).toEqual(expected)
    })
  })
})
