import faker from 'faker'
import { LocalSaveAccessToken } from './local.save.access.token'
import { SetStorageSpy } from '~/data/mocks/mock.set.storage'

type SutType = {
  setStorageSpy: SetStorageSpy
  sut: LocalSaveAccessToken
}

function makeSut (): SutType {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    setStorageSpy,
    sut
  }
}

describe('LocalSaveAccessToken', () => {
  it('Should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
