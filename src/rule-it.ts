import { type SelectOperator, type Operator, allowedMap } from './types'

export class RuleIt {
  static expression<T>(operator: SelectOperator<T>, a: T, b: T): boolean

  /**
   * Constrói uma expressão baseada em um operador e dois valores, os valores são sensíveis ao tipo de dado
   * e ao operador, por exemplo, o operador `eq` (igual) não pode ser usado com um array, pois não faz sentido
   *
   * @param operator Operador relacional
   * @param a Valor 1
   * @param b Valor 2
   */
  static expression<T>(operator: Operator, a: T, b: T): boolean {
    const typeofA = typeof a
    const typeofB = typeof b
    if (typeofA !== typeofB) {
      throw new Error('Os tipos de dados devem ser iguais')
    }

    const isArray = Array.isArray(a)
    const isDate = a instanceof Date
    const type = isArray ? 'array' : isDate ? 'date' : typeofA
    const allowedOperators = allowedMap.get(type)
    if (!((allowedOperators?.includes(operator)) ?? false)) {
      throw new Error(`Operador ${operator} não permitido para o tipo ${type}`)
    }

    switch (operator) {
      case 'eq':
        return isDate ? (a as Date).getTime() === (b as Date).getTime() : a === b
      case 'ne':
        return isDate ? (a as Date).getTime() !== (b as Date).getTime() : a !== b
      case 'gt':
        return a > b
      case 'ge':
        return a >= b
      case 'lt':
        return a < b
      case 'le':
        return a <= b
      case 'in':
        return (b as T[]).includes(a)
      case 'ni':
        return !(b as T[]).includes(a)
      case 'like':
        return (a as string).includes(b as string)
      case 'between':
        return (a as Date) >= (b as Date)
      case 'or':
          return (a as boolean) || (b as boolean)
      case 'xor':
        return Boolean(Number((a as boolean)) ^ Number((b as boolean)))
      default:
        throw new Error('Operador inválido ou não registrado')
    }
  }
}
