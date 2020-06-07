import { HttpPostParams, HttpPostResponse, HttpPostClient } from '~/data/protocols/http/http.post.client'
import axios from 'axios'

export class AxiosHttpAdapter implements HttpPostClient<any, any> {
  async post (params: HttpPostParams): Promise<HttpPostResponse<any>> {
    const { status, data } = await axios.post(params.url, params.body)

    return {
      statusCode: status,
      body: data
    }
  }
}
