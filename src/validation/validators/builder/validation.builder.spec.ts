import faker from 'faker'
import { RequiredFieldValidation } from '../requiredField/requiredField.validation'
import { ValidationBuilder } from './validation.builder'
import { EmailValidation } from '../email/email.validation'
import { MinLengthValidation } from '../minLength/min.length.validation'
import { CompareFieldsValidation } from '../compareFields/compare.fields.validation'

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('Should return EmailValidation', () => {
    const field = faker.database.column()

    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  it('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = ValidationBuilder.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  it('Should return CompareFieldValidation', () => {
    const field = faker.database.column()
    const compareField = faker.database.column()
    const validations = ValidationBuilder.field(field).sameAs(compareField).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, compareField)])
  })

  it('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.number()

    const validations = ValidationBuilder.field(field).required().min(length).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
