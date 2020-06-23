import React from 'react'
import faker from 'faker'
import 'jest-localstorage-mock'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'

import Login from './index'
import * as Helper from '~/presentation/__test__/form.helper'
import { ValidationStub } from '~/presentation/__test__/mock.validation'
import { AuthenticationSpy } from '~/presentation/__test__/mock.authentication'
import { InvalidCredentialsError } from '~/domain/errors/invalid.credentials.error'
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

function mockValidForm (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
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

describe('Login Component', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email', faker.internet.email())

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🌑')
  })

  it('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password', faker.internet.password())
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show valid email state if Validation success', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email', faker.internet.email())
    Helper.testStatusForField(sut, 'email')
  })

  it('Should show valid password state if Validation success', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password', faker.internet.password())
    Helper.testStatusForField(sut, 'password')
  })

  it('Should enable button if form is valid', () => {
    const { sut } = makeSut()

    mockValidForm(sut)
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    await mockValidFormAndSubmit(sut)

    Helper.testElementExist(sut, 'spinner')
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

    Helper.testChildCount(sut, 'error-wrap', 1)
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

    Helper.testChildCount(sut, 'error-wrap', 1)
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
