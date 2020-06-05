import { HttpPostClient } from '../../protocols/http/http.post.client'
import { RemoteAuthentication } from './remote.authentication'


describe('RemoteAuthentication', () => {
  test('Should call HttpPostClint with current URL', async ()=> {
    class HttpClientSpy implements HttpPostClient {
      public url?: string;

      async post(url: string): Promise<any> {
        this.url = url;
        return {}
      }
    }

    const url = 'some_url'
    const httpPostClientSpy = new HttpClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth()
    
    expect(httpPostClientSpy.url).toEqual(url)
  })
})