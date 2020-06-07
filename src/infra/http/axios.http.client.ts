import { HttpPostParams } from '~/data/protocols/http/http.post.client'
import axios from 'axios'

export class AxiosHttpClient {
  async post (params: HttpPostParams): Promise<any> {
    await axios(params.url)
  }
}
