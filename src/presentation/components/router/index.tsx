import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '~/presentation/styles/global.scss'

import Login from '~/presentation/pages/login'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
