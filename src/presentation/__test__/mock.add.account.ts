import { mockAccountModel } from '~/domain/__test__/mock.account'
import { AccountModel } from '~/domain/models/account.models'
import { AddAccount, AddAccountParams } from '~/domain/usecases/addAccount'

export class AddAccountSpy implements AddAccount {
  public account = mockAccountModel()
  public params: AddAccountParams
  public callsCount: number = 0

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount += 1
    return Promise.resolve(this.account)
  }
}
