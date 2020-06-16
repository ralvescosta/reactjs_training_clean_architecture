import faker from 'faker'
import { MinLengthValidation } from './min.length.validation'
import { MinLengthError } from '~/validation/errors/min.length.error'

function makeSut (minLength: number = 5): MinLengthValidation {
  return new MinLengthValidation(faker.database.column(), minLength)
}

describe('MinLengthValidator', () => {
  it('Should return error if value is invalid', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new MinLengthError())
  })

  it('Should return falsy if value is valid', () => {
    const sut = makeSut(3)
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toBeFalsy()
  })
})
