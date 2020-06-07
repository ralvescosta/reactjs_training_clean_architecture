import { HttpPostClient, HttpPostParams } from '~/data/protocols/http/http.post.client'

export class MockHttpPostClient implements HttpPostClient {
  public url?: string;
  public body?: object

  async post (params: HttpPostParams): Promise<any> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}
