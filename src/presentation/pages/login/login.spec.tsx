import React from 'react'
import faker from 'faker'
import 'jest-localstorage-mock'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'

import Login from './index'
import { ValidationStub } from '~/presentation/__test__/mock.validation'
import { AuthenticationSpy } from '~/presentation/__test__/mock.authentication'
import { InvalidCredentialsError } from '~/domain/erros/invalid.credentials.error'
import { SaveAccessTokenMock } from '~/presentation/__test__/mock.save.access.token'

type SutType = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

function makeSut (params?: SutParams): SutType {
  const validationStub = new ValidationStub()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
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

function mockValidForm (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void {
  populateEmail(sut, email)
  populatePassword(sut, password)
}

async function mockValidFormAndSubmit (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> {
  mockValidForm(sut, email, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form) // observer to async dom render
}

function testErrorWrapChildCount (sut: RenderResult, count: number): void {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

function testElementExist (sut: RenderResult, fieldName: string): void {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

describe('Login Component', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    testErrorWrapChildCount(sut, 0)

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

    mockValidForm(sut)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    await mockValidFormAndSubmit(sut)

    testElementExist(sut, 'spinner')
  })

  it('Should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await mockValidFormAndSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('Should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()

    await mockValidFormAndSubmit(sut)
    await mockValidFormAndSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('Should not call authentication with form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    await mockValidFormAndSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('Should present Error with Authentication Fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    await mockValidFormAndSubmit(sut)

    const messageToUser = sut.getByTestId('msg-to-user')

    testErrorWrapChildCount(sut, 1)
    expect(messageToUser.textContent).toBe(error.message)
  })

  it('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

    await mockValidFormAndSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('Should present Error with SaveAccessToken Fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(saveAccessTokenMock, 'save')
      .mockRejectedValueOnce(error)

    await mockValidFormAndSubmit(sut)

    const messageToUser = sut.getByTestId('msg-to-user')

    testErrorWrapChildCount(sut, 1)
    expect(messageToUser.textContent).toBe(error.message)
  })

  it('Should go to SignUp page', () => {
    const { sut } = makeSut()

    const register = sut.getByTestId('signup')

    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
