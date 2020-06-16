import React from 'react'
import Login from '~/presentation/pages/login'
import { RemoteAuthentication } from '~/data/usercases/authentication/remote.authentication'
import { AxiosHttpAdapter } from '~/infra/http/axios.http.client'
import { ValidationComposite } from '~/validation/validators/validationComposite/validation.composite'
import { ValidationBuilder } from '~/validation/validators/builder/validation.builder'

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpAdapter = new AxiosHttpAdapter()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpAdapter)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
