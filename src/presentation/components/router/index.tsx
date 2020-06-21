import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '~/presentation/styles/global.scss'
import SignUp from '~/presentation/pages/signUp'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin}/>
        <Route path="/signup" component={SignUp}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
