import { HttpPostClient, HttpPostParams } from '../protocols/http/http.post.client'

export class HttpPostClientFake implements HttpPostClient {
  public url?: string;
  public body?: object

  async post (params: HttpPostParams): Promise<any> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}
