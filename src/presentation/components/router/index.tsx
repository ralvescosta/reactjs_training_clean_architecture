import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '~/presentation/styles/global.scss'

type Factories = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factories> = ({ makeLogin, makeSignUp }: Factories) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin}/>
        <Route path="/signup" component={makeSignUp}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
