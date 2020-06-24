import faker from 'faker'
import { MinLengthValidation } from './min.length.validation'
import { MinLengthError } from '~/validation/errors/min.length.error'

function makeSut (field: string, minLength: number = 5): MinLengthValidation {
  return new MinLengthValidation(field, minLength)
}

describe('MinLengthValidator', () => {
  it('Should return error if value is invalid', () => {
    const filed = faker.database.column()
    const sut = makeSut(filed, 5)
    const error = sut.validate({ [filed]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new MinLengthError())
  })

  it('Should return falsy if value is valid', () => {
    const filed = faker.database.column()
    const sut = makeSut(filed, 3)
    const error = sut.validate({ [filed]: faker.random.alphaNumeric(3) })
    expect(error).toBeFalsy()
  })

  it('Should return falsy if field does not exists in schema', () => {
    const filed = faker.database.column()
    const sut = makeSut(filed, 3)
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(3) })
    expect(error).toBeFalsy()
  })
})
