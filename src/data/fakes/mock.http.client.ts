import { HttpPostClient, HttpPostParams } from '~/data/protocols/http/http.post.client'
import { HttpResponse, HttpStatusCode } from '~/data/protocols/http/http.response'

export class MockHttpPostClient<DTO, Res> implements HttpPostClient<DTO, Res> {
  public url?: string;
  public body?: DTO
  public response: HttpResponse<Res> = {
    statusCode: HttpStatusCode.success
  }

  async post (params: HttpPostParams<DTO>): Promise<HttpResponse<Res>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
