import { FieldValidation } from '~/validation/protocols/field.validation'
import { InvalidFieldError } from '~/validation/errors/invalid.field.error'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: object): Error {
    if (input[this.field] === input[this.fieldToCompare]) {
      return null
    }

    return new InvalidFieldError()
  }
}
