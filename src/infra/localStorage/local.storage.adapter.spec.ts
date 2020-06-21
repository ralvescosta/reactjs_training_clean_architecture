import faker from 'faker'
import { LocalStorageAdapter } from './local.storage.adapter'
import 'jest-localstorage-mock'

function makeSut (): LocalStorageAdapter {
  return new LocalStorageAdapter()
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('Should call localStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const token = faker.random.uuid()
    await sut.set(key, token)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, token)
  })
})
