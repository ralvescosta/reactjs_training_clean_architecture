import React from 'react'
import ReactDOM from 'react-dom'

import Routes from '~/presentation/components/router'
import { makeLogin } from './factories/pages/login/login.factory'
import { makeSignUp } from './factories/pages/signUp/sign.up.factory'

ReactDOM.render(
  <Routes
    makeLogin={makeLogin}
    makeSignUp={makeSignUp}
  />,
  document.getElementById('main')
)
