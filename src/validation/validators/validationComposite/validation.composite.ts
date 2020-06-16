import { Validation } from '~/presentation/protocols/validation'
import { FieldValidation } from '~/validation/protocols/field.validation'

export class ValidationComposite implements Validation {
  private constructor (
    private readonly validators: FieldValidation[]
  ) {}

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, fieldValues: string): string {
    const fieldValidators = this.validators.filter(v => v.field === fieldName)

    if (!fieldValidators.length) return null

    for (const validator of fieldValidators) {
      const error = validator.validate(fieldValues)

      if (error) {
        return error.message
      }
    }
  }
}
