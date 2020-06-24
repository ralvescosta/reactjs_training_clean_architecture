import React from 'react'
import { RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import SignUp from './index'
import * as Helper from '~/presentation/__test__/form.helper'
import { ValidationStub } from '~/presentation/__test__/mock.validation'
import { AddAccountSpy } from '~/presentation/__test__/mock.add.account'
import { EmailAlreadyExistError } from '~/domain/errors/email.already.exist.error'
import { SaveAccessTokenMock } from '~/presentation/__test__/mock.save.access.token'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

function makeSut (params?: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <Router history={history}>
      <SignUp
        validation={validationStub}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock
  }
}

async function mockValidFormAndSubmit (
  sut: RenderResult,
  name = faker.internet.email(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> {
  Helper.populateField(sut, 'name',name)
  Helper.populateField(sut, 'email',email)
  Helper.populateField(sut, 'password',password)
  Helper.populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form) // observer to async dom render
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  it('Should start with initial state', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('Should show name error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')

    Helper.testStatusForField(sut, 'name', validationError)
  })

  it('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')

    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')

    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'passwordConfirmation')

    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('Should show valid name state if Validation success', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  it('Should show valid email state if Validation success', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('Should show valid password state if Validation success', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('Should show valid passwordConfirmation state if Validation success', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('Should enable button if form is valid', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    await mockValidFormAndSubmit(sut)

    Helper.testElementExist(sut, 'spinner')
  })

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await mockValidFormAndSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()

    await mockValidFormAndSubmit(sut)
    await mockValidFormAndSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('Should call AddAccount only once', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })

    await mockValidFormAndSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('Should present Error with AddAccount Fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailAlreadyExistError()

    jest.spyOn(addAccountSpy, 'add')
      .mockRejectedValueOnce(error)

    await mockValidFormAndSubmit(sut)

    const messageToUser = sut.getByTestId('msg-to-user')

    Helper.testChildCount(sut, 'error-wrap', 1)
    expect(messageToUser.textContent).toBe(error.message)
  })

  it('Should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()

    await mockValidFormAndSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('Should present Error with SaveAccessToken Fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new EmailAlreadyExistError()

    jest.spyOn(saveAccessTokenMock, 'save')
      .mockRejectedValueOnce(error)

    await mockValidFormAndSubmit(sut)

    const messageToUser = sut.getByTestId('msg-to-user')

    Helper.testChildCount(sut, 'error-wrap', 1)
    expect(messageToUser.textContent).toBe(error.message)
  })

  it('Should go to SignUp page', () => {
    const { sut } = makeSut()

    const loginLink = sut.getByTestId('login-link')

    fireEvent.click(loginLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
