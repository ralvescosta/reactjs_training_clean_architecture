import { HttpPostClient } from '~/data/protocols/http/http.post.client'
import { AuthenticationParams, Authentication } from '~/domain/usecases/authentication'
import { HttpStatusCode } from '~/data/protocols/http/http.response'
import { InvalidCredentialsError } from '~/domain/erros/invalid.credentials.error'
import { UnexpectedError } from '~/domain/erros/unexpected.error'
import { AccountModel } from '~/domain/models/account.models'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
