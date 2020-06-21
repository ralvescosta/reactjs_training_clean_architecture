import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import SignUp from './index'
import * as Helper from '~/presentation/__test__/form.helper'

function makeSut (): RenderResult {
  const sut = render(
    <SignUp />
  )

  return sut
}

describe('SignUp Component', () => {
  it('Should start with initial state', () => {
    const sut = makeSut()
    const validationError = 'Campo Obrigatorio'

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
