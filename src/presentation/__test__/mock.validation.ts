import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  public errorMessage: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}
