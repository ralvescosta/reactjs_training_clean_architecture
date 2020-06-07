import faker from 'faker'
import { HttpPostParams } from '~/data/protocols/http/http.post.client'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
