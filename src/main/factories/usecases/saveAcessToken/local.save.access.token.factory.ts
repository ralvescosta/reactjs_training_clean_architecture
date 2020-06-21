import { SaveAccessToken } from '~/domain/usecases/save.access.token'
import { LocalSaveAccessToken } from '~/data/usercases/saveAccessToken/local.save.access.token'
import { makeLocalStorageAdapter } from '../../cache/local.storage.adapter.factory'

export const makeLocalTokenSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
