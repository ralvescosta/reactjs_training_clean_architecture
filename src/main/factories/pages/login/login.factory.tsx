import React from 'react'
import Login from '~/presentation/pages/login'

import { makeRemoteAuthentication } from '~/main/factories/usecases/authentication/remote.authentication.factory'
import { makeLocalTokenSaveAccessToken } from '~/main/factories/usecases/saveAcessToken/local.save.access.token.factory'
import { makeLoginValidation } from './login.validation.factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalTokenSaveAccessToken()}
    />
  )
}
