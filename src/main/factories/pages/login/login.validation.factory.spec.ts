import { makeLoginValidation } from './login.validation.factory'
import { ValidationComposite } from '~/validation/validators/validationComposite/validation.composite'
import { RequiredFieldValidation } from '~/validation/validators/requiredField/requiredField.validation'
import { EmailValidation } from '~/validation/validators/email/email.validation'
import { MinLengthValidation } from '~/validation/validators/minLength/min.length.validation'

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5)
    ]))
  })
})
