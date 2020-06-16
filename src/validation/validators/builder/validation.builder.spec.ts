import { RequiredFieldValidation } from '../requiredField/requiredField.validation'
import { ValidationBuilder } from './validation.builder'

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
