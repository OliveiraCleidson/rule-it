// TODO: Adicionar gte e lte que significa maior ou igual e menor ou igual

/**
 * Operadores relacionais:
 *
 *      eq: igual
 *      ne: diferente
 *      gt: maior que
 *      ge: maior ou igual
 *      lt: menor que
 *      le: menor ou igual
 *      in: contido em
 *      ni: não contido em
 *      like: semelhante a
 *      between: entre
 *      or: ou     
 *      xor: ou exclusivo
 * 
 */
export type Operator = 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le' | 'in' | 'ni' | 'like' | 'between' | 'or' | 'xor'

const allowedStringOperators = ['eq', 'ne', 'like'] as const
export type StringOperator = typeof allowedStringOperators[number]

const allowedNumberOperators = ['eq', 'ne', 'gt', 'ge', 'lt', 'le', 'between'] as const
export type NumberOperator = typeof allowedNumberOperators[number]

const allowedBooleanOperators = ['eq', 'ne', 'or', 'xor'] as const
export type BooleanOperator = typeof allowedBooleanOperators[number]

const allowedDateOperators = ['eq', 'ne', 'gt', 'ge', 'lt', 'le', 'between'] as const
export type DateOperator = typeof allowedDateOperators[number]

const allowedArrayOperators = ['in', 'ni'] as const
export type ArrayOperator = typeof allowedArrayOperators[number]

export const allowedMap: Map<string, readonly Operator[]> = new Map().set('string', allowedStringOperators)
  .set('number', allowedNumberOperators)
  .set('boolean', allowedBooleanOperators)
  .set('date', allowedDateOperators)
  .set('array', allowedArrayOperators)

export type SelectOperator<T> = T extends string
  ? StringOperator
  : T extends number
    ? NumberOperator
    : T extends boolean
      ? BooleanOperator
      : T extends Date
        ? DateOperator
        : T extends any[]
          ? ArrayOperator
          : never
