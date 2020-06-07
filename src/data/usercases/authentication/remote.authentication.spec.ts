import faker from 'faker'
import { MockHttpPostClient } from '~/data/fakes/mock.http.client'
import { mockAuthentication } from '~/domain/fakes/mock.authentication'
import { RemoteAuthentication } from './remote.authentication'

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
})
