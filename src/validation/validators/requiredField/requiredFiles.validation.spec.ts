import faker from 'faker'
import { RequiredFieldValidation } from './requiredField.validation'
import { RequiredFieldError } from '~/validation/errors/required.field.error'

function makeSut (field: string = faker.database.column()): RequiredFieldValidation {
  return new RequiredFieldValidation(field)
}

describe('RequiredFieldValidation', () => {
  it('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
