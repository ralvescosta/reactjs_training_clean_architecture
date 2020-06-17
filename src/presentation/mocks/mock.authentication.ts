import { Authentication, AuthenticationParams } from '~/domain/usecases/authentication'
import { mockAccountModel } from '~/domain/fakes/mock.account'
import { AccountModel } from '~/domain/models/account.models'

export class AuthenticationSpy implements Authentication {
  public account = mockAccountModel()
  public params: AuthenticationParams
  public callsCount: number = 0

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount += 1
    return Promise.resolve(this.account)
  }
}
