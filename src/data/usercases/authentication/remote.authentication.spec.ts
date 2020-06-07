import faker from 'faker'
import { MockHttpPostClient } from '~/data/fakes/mock.http.client'
import { mockAuthentication } from '~/domain/fakes/mock.authentication'
import { RemoteAuthentication } from './remote.authentication'
import { InvalidCredentialsError } from '~/domain/erros/invalid.credentials.error'
import { HttpStatusCode } from '~/data/protocols/http/http.response'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: MockHttpPostClient
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new MockHttpPostClient()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClint with current URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toEqual(url)
  })

  test('Should call HttpPostClint with current body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsError if HttpPostClint returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
