import { AxiosHttpAdapter } from '~/infra/http/axios.http.client'

export const makeAxiosAdapter = (): AxiosHttpAdapter => {
  return new AxiosHttpAdapter()
}
