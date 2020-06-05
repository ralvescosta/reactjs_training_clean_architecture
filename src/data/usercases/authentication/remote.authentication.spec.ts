import { RemoteAuthentication } from './remote.authentication'
import { HttpClientFake }  from '../../fakes/mock.http.client'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClint with current URL', async ()=> {

    const url = 'some_url'
    const httpPostClientSpy = new HttpClientFake()
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth()
    
    expect(httpPostClientSpy.url).toEqual(url)
  })
})