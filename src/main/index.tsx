import React from 'react'
import ReactDOM from 'react-dom'

import Routes from '~/presentation/components/router'
import { makeLogin } from './factures/pages/login/login.factory'

ReactDOM.render(
  <Routes
    makeLogin={makeLogin}
  />,
  document.getElementById('main')
)
