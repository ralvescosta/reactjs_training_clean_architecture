import { makeAxiosAdapter } from '~/main/factories/http/axios.http.adapter'
import { addAccountUrl } from '~/main/factories/http/api.urls'
import { AddAccount } from '~/domain/usecases/addAccount'
import { RemoteAddAccount } from '~/data/usercases/addAccount/remote.add.account'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(addAccountUrl, makeAxiosAdapter())
}
