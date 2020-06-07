import { HttpPostClient, HttpPostParams } from '../protocols/http/http.post.client'

export class HttpPostClientFake implements HttpPostClient {
  public url?: string;

  async post (params: HttpPostParams): Promise<any> {
    this.url = params.url
    return Promise.resolve()
  }
}
