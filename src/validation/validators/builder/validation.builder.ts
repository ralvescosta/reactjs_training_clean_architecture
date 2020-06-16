import { FieldValidation } from '~/validation/protocols/field.validation'
import { RequiredFieldValidation } from '../requiredField/requiredField.validation'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (filedName: string): ValidationBuilder {
    return new ValidationBuilder(filedName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
