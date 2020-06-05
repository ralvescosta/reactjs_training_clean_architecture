import { RemoteAuthentication } from './remote.authentication'
import { HttpPostClientFake }  from '../../fakes/mock.http.client'

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientFake
}

const makeSut = (url: string = 'some_url'): SutTypes  => {
  const httpPostClientSpy = new HttpPostClientFake();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => { 
  test('Should call HttpPostClint with current URL', async ()=> {
    const url = 'batata'
    const {sut, httpPostClientSpy} = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toEqual(url)
  })
})