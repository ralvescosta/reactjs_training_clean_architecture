export enum HttpStatusCode {
  success = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  internalServerError = 500,
}

export type HttpResponse<BodyT> = {
  statusCode: HttpStatusCode
  body?: BodyT
}
