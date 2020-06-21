import { AddAccount, AddAccountParams } from '~/domain/usecases/addAccount'
import { HttpPostClient, HttpStatusCode } from '~/data/protocols/http/http.post.client'
import { AccountModel } from '~/domain/models/account.models'
import { UnexpectedError } from '~/domain/errors/unexpected.error'
import { EmailAlreadyExistError } from '~/domain/errors/email.already.exist.error'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        return httpResponse.body

      case HttpStatusCode.forbidden:
        throw new EmailAlreadyExistError()

      default:
        throw new UnexpectedError()
    }
  }
}
