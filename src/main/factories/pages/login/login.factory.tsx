import React from 'react'
import Login from '~/presentation/pages/login'
import { makeRemoteAuthentication } from '../../usecases/authentication/remote.authentication.factory'
import { makeLoginValidation } from './login.validation.factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
