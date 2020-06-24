import { makeSignUpValidation } from './sign.up.validation.factory'
import { ValidationComposite } from '~/validation/validators/validationComposite/validation.composite'
import { ValidationBuilder } from '~/validation/validators/builder/validation.builder'

describe('SignUpalidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().min(5).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().build()
    ]))
  })
})
