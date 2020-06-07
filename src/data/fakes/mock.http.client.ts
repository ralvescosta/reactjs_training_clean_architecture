import { HttpPostClient, HttpPostParams } from '~/data/protocols/http/http.post.client'
import { HttpResponse, HttpStatusCode } from '~/data/protocols/http/http.response'

export class MockHttpPostClient implements HttpPostClient {
  public url?: string;
  public body?: object
  public response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
