import faker from 'faker'
import { CompareFieldsValidation } from './compare.fields.validation'
import { InvalidFieldError } from '~/validation/errors/invalid.field.error'

function makeSut (field: string, fieldToCompare: string): CompareFieldsValidation {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  it('Should return error if field compare is empty', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
