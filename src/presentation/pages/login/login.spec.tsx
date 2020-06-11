import React from 'react'
import faker from 'faker'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import { ValidationStub } from '~/presentation/mocks/mock.validation'

import Login from './index'
import { Authentication, AuthenticationParams } from '~/domain/usecases/authentication'
import { AccountModel } from '~/domain/models/account.models'
import { mockAccountModel } from '~/domain/fakes/mock.account'

type SutType = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

class AuthenticationSpy implements Authentication {
  public account = mockAccountModel()
  public params: AuthenticationParams;

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}

function makeSut (params?: SutParams): SutType {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy}/>
  )

  return {
    sut,
    authenticationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)

    expect(submitButton.disabled).toBe(true)

    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🌑')

    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🌑')
  })

  it('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🌑')
  })

  it('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🌑')
  })

  it('Should show valid email state if Validation success', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo Certo!')
    expect(emailStatus.textContent).toBe('💚')
  })

  it('Should show valid password state if Validation success', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo Certo!')
    expect(passwordStatus.textContent).toBe('💚')
  })

  it('Should enable button if form is valid', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
