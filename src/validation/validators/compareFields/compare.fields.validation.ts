import { FieldValidation } from '~/validation/protocols/field.validation'
import { InvalidFieldError } from '~/validation/errors/invalid.field.error'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (value: string): Error {
    if (value === this.valueToCompare) {
      return null
    }

    return new InvalidFieldError()
  }
}
