import faker from 'faker'
import { EmailValidation } from './email.validation'
import { InvalidEmailField } from '~/validation/errors/invalid.email.field.error'

function makeSut (field: string = faker.random.word()): EmailValidation {
  return new EmailValidation(field)
}

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidEmailField())
  })

  it('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

  it('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
