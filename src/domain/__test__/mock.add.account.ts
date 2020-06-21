import { AddAccountParams } from '~/domain/usecases/addAccount'
import faker from 'faker'
import { AccountModel } from '../models/account.models'

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
})
