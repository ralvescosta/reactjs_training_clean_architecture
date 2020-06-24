import { FieldValidation } from '~/validation/protocols/field.validation'
import { InvalidEmailField } from '~/validation/errors/invalid.email.field.error'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return (!input[this.field] || emailRegex.test(input[this.field])) ? null : new InvalidEmailField()
  }
}
