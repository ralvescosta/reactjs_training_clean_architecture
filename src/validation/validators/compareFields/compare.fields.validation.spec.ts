import faker from 'faker'
import { CompareFieldsValidation } from './compare.fields.validation'
import { InvalidFieldError } from '~/validation/errors/invalid.field.error'

function makeSut (valueToCompare: string): CompareFieldsValidation {
  return new CompareFieldsValidation(faker.database.column(), valueToCompare)
}

describe('CompareFieldsValidation', () => {
  it('Should return error if field compare is empty', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return falsy if compare is valid', () => {
    const value = faker.random.word()
    const sut = makeSut(value)
    const error = sut.validate(value)
    expect(error).toBeFalsy()
  })
})
