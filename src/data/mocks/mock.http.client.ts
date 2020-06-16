import { HttpPostClient, HttpPostParams, HttpPostResponse, HttpStatusCode } from '~/data/protocols/http/http.post.client'

export class MockHttpPostClient<DTO, Res> implements HttpPostClient<DTO, Res> {
  public url?: string;
  public body?: DTO
  public response: HttpPostResponse<Res> = {
    statusCode: HttpStatusCode.success
  }

  async post (params: HttpPostParams<DTO>): Promise<HttpPostResponse<Res>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
