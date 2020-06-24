import faker from 'faker'
import { EmailValidation } from './email.validation'
import { InvalidEmailField } from '~/validation/errors/invalid.email.field.error'

function makeSut (field: string): EmailValidation {
  return new EmailValidation(field)
}

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const field = faker.internet.email()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidEmailField())
  })

  it('Should return falsy if email is valid', () => {
    const field = faker.internet.email()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  it('Should return falsy if email is valid', () => {
    const field = faker.internet.email()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
