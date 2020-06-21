import { SetStorage } from '~/data/protocols/localStorage/set.storage'
import { LocalStorageAdapter } from '~/infra/localStorage/local.storage.adapter'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
