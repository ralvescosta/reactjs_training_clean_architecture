import faker from 'faker'
import { RemoteAddAccount } from './remote.add.account'

import { HttpStatusCode } from '~/data/protocols/http/http.post.client'
import { MockHttpPostClient } from '~/data/__test__/mock.http'

import { mockAddAccount } from '~/domain/__test__/mock.add.account'
import { AddAccountParams } from '~/domain/usecases/addAccount'
import { AccountModel } from '~/domain/models/account.models'
// import { InvalidCredentialsError } from '~/domain/errors/invalid.credentials.error'
// import { UnexpectedError } from '~/domain/errors/unexpected.error'
import { EmailAlreadyExistError } from '~/domain/errors/email.already.exist.error'

// SUT = System under test
type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: MockHttpPostClient<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new MockHttpPostClient<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('', () => {
  test('Should call HttpPostClint with current URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccount())
    expect(httpPostClientSpy.url).toEqual(url)
  })

  test('Should call HttpPostClint with current body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccount()
    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('Should throw Email already exist if HttpPostClint returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new EmailAlreadyExistError())
  })
})
