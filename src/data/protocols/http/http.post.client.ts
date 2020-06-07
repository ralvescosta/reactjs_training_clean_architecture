import { HttpResponse } from './http.response'

export type HttpPostParams<BodyT = any, HeadersT = any> = {
  url: string
  body?: BodyT
  headers?: HeadersT
}

export interface HttpPostClient<DTO, Res> {
  post(params: HttpPostParams<DTO>): Promise<HttpResponse<Res>>
}
