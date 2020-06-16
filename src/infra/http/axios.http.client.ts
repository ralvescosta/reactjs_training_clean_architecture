import { HttpPostParams, HttpPostResponse, HttpPostClient } from '~/data/protocols/http/http.post.client'
import axios from 'axios'

export class AxiosHttpAdapter implements HttpPostClient<any, any> {
  async post (params: HttpPostParams): Promise<HttpPostResponse<any>> {
    try {
      const { status, data } = await axios.post(params.url, params.body)
      return {
        statusCode: status,
        body: data
      }
    } catch (err) {
      return {
        statusCode: err.response.status,
        body: err.response.data
      }
    }
  }
}
