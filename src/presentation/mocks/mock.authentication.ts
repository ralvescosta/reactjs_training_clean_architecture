import { Authentication, AuthenticationParams } from '~/domain/usecases/authentication'
import { mockAccountModel } from '~/domain/fakes/mock.account'
import { AccountModel } from '~/domain/models/account.models'

export class AuthenticationSpy implements Authentication {
  public account = mockAccountModel()
  public params: AuthenticationParams;

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
