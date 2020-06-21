export enum HttpStatusCode {
  success = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  internalServerError = 500,
}

export type HttpPostResponse<BodyT> = {
  statusCode: HttpStatusCode
  body?: BodyT
}

export type HttpPostParams<BodyT = any, HeadersT = any> = {
  url: string
  body?: BodyT
  headers?: HeadersT
}

export interface HttpPostClient<DTO, Res> {
  post: (params: HttpPostParams<DTO>) => Promise<HttpPostResponse<Res>>
}
