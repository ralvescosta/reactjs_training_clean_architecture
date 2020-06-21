import faker from 'faker'
import { FieldValidationSpy } from '../__test__/mock.field.validation'
import { ValidationComposite } from './validation.composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

function makeSut (fieldName: string): SutTypes {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)

    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.words())

    expect(error).toBe(errorMessage)
  })

  it('Should return falsy if any validation fails', () => {
    const fieldName = faker.database.column()

    const { sut } = makeSut(fieldName)

    const error = sut.validate('fieldName', faker.random.words())

    expect(error).toBeFalsy()
  })
})
