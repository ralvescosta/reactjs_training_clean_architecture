import { RemoteAuthentication } from '~/data/usercases/authentication/remote.authentication'
import { makeAxiosAdapter } from '~/main/factories/http/axios.http.adapter'
import { authUrl } from '~/main/factories/http/api.urls'

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  return new RemoteAuthentication(authUrl, makeAxiosAdapter())
}
