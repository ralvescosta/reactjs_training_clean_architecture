import { FieldValidation } from '~/validation/protocols/field.validation'
import { RequiredFieldValidation } from '../requiredField/requiredField.validation'
import { EmailValidation } from '../email/email.validation'
import { MinLengthValidation } from '../minLength/min.length.validation'

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

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min (minLength: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, minLength))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
