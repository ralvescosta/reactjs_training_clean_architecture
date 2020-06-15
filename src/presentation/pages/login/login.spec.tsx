import React from 'react'
import faker from 'faker'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { ValidationStub } from '~/presentation/mocks/mock.validation'
import { AuthenticationSpy } from '~/presentation/mocks/mock.authentication'

import Login from './index'
import { InvalidCredentialsError } from '~/domain/erros/invalid.credentials.error'

type SutType = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
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

function populateEmail (
  sut: RenderResult,
  email = faker.internet.email()
): void {
  const emailInput = sut.getByTestId('email')

  fireEvent.input(emailInput, { target: { value: email } })
}

function populatePassword (
  sut: RenderResult,
  password = faker.internet.password()
): void {
  const passwordInput = sut.getByTestId('password')

  fireEvent.input(passwordInput, { target: { value: password } })
}

function simulateValidForm (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void {
  populateEmail(sut, email)
  populatePassword(sut, password)
}

function simulateValidFormAndSubmit (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void {
  simulateValidForm(sut, email, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
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

    populateEmail(sut)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🌑')
  })

  it('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populatePassword(sut)

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🌑')
  })

  it('Should show valid email state if Validation success', () => {
    const { sut } = makeSut()

    populateEmail(sut)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo Certo!')
    expect(emailStatus.textContent).toBe('💚')
  })

  it('Should show valid password state if Validation success', () => {
    const { sut } = makeSut()

    populatePassword(sut)

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo Certo!')
    expect(passwordStatus.textContent).toBe('💚')
  })

  it('Should enable button if form is valid', () => {
    const { sut } = makeSut()

    simulateValidForm(sut)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidFormAndSubmit(sut)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidFormAndSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('Should call authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidFormAndSubmit(sut)
    simulateValidFormAndSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('Should not call authentication with form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    populateEmail(sut)

    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('Should present Error with Authentication Fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    simulateValidFormAndSubmit(sut)

    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap) // observer to async dom render
    const messageToUser = sut.getByTestId('msg-to-user')

    expect(messageToUser.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })
})
