import { SetStorage } from '~/data/protocols/localStorage/set.storage'

export class SetStorageMock implements SetStorage {
  public key: string
  public value: string

  async set (key: string, value: string): Promise<void> {
    this.key = key
    this.value = value
  }
}
