import { SetStorage } from '~/data/protocols/localStorage/set.storage'

export class LocalStorageAdapter implements SetStorage {
  async set (key: string, value: string): Promise<void> {
    localStorage.setItem(key, value)
  }
}
