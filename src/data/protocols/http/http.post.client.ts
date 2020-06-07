import { HttpResponse } from './http.response'

export type HttpPostParams<BodyT = any, HeadersT = any> = {
  url: string
  body?: BodyT
  headers?: HeadersT
}

export interface HttpPostClient {
  post<ResponseT = any>(params: HttpPostParams): Promise<HttpResponse<ResponseT>>
}
