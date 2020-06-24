import faker from 'faker'
import { RequiredFieldValidation } from './requiredField.validation'
import { RequiredFieldError } from '~/validation/errors/required.field.error'

function makeSut (field: string): RequiredFieldValidation {
  return new RequiredFieldValidation(field)
}

describe('RequiredFieldValidation', () => {
  it('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should return falsy if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })
})
