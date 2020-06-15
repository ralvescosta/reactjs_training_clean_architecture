import React, { useState, useEffect } from 'react'

import Context from '~/presentation/contexts/form'

import Styles from './styles.scss'

import Header from '~/presentation/components/signHeader'
import Input from '~/presentation/components/inputMask'
import FormStatus from '~/presentation/components/formStatus'
import Footer from '~/presentation/components/footer'
import { Validation } from '~/presentation/protocols/validation'
import { Authentication } from '~/domain/usecases/authentication'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    isLoading: false,
    emailTitle: '',
    passwordTitle: '',
    messageToUser: ''
  })

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()

    if (state.isLoading) {
      return
    }

    setState({
      ...state,
      isLoading: true
    })
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  useEffect(() => {
    setState({
      ...state,
      emailTitle: validation.validate('email', state.email),
      passwordTitle: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.loginWrap}>
      <Header />
      <Context.Provider value={
        {
          state,
          setState
        }
      }>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha"/>

          <button data-testid="submit" disabled={!!state.emailTitle || !!state.passwordTitle} type="submit">Entrar</button>

          <span className={Styles.link}>Criar Conta</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
