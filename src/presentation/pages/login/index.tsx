import React, { useState, useEffect } from 'react'

import Context from '~/presentation/contexts/form'

import Styles from './styles.scss'

import Header from '~/presentation/components/signHeader'
import Input from '~/presentation/components/inputMask'
import FormStatus from '~/presentation/components/formStatus'
import Footer from '~/presentation/components/footer'
import { Validation } from '~/presentation/protocols/validation'
import { Authentication } from '~/domain/usecases/authentication'
import { Link, useHistory } from 'react-router-dom'
import { SaveAccessToken } from '~/domain/usecases/save.access.token'
import SubmitButton from '~/presentation/components/submitButton'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    email: '',
    password: '',
    isLoading: false,
    isFormInvalid: true,
    emailTitle: '',
    passwordTitle: '',
    messageToUser: ''
  })

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        messageToUser: err.message
      })
    }
  }

  useEffect(() => {
    const formData = {
      email: state.email,
      password: state.password
    }
    const emailTitle = validation.validate('email', formData)
    const passwordTitle = validation.validate('password', formData)
    setState({
      ...state,
      emailTitle,
      passwordTitle,
      isFormInvalid: !!emailTitle || !!passwordTitle
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
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha"/>

          <SubmitButton text="SignIn"/>

          <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar Conta</Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
