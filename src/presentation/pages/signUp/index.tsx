import React, { useState, useEffect } from 'react'

import Context from '~/presentation/contexts/form'

import Styles from './styles.scss'

import Header from '~/presentation/components/signHeader'
import Input from '~/presentation/components/inputMask'
import FormStatus from '~/presentation/components/formStatus'
import SubmitButton from '~/presentation/components/submitButton'
import Footer from '~/presentation/components/footer'

import { Validation } from '~/presentation/protocols/validation'
import { AddAccount } from '~/domain/usecases/addAccount'
import { SaveAccessToken } from '~/domain/usecases/save.access.token'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isLoading: false,
    isFormInvalid: true,
    nameTitle: '',
    emailTitle: '',
    passwordTitle: '',
    passwordConfirmationTitle: '',
    messageToUser: ''
  })

  useEffect(() => {
    const nameTitle = validation.validate('name', state.name)
    const emailTitle = validation.validate('email', state.name)
    const passwordTitle = validation.validate('password', state.name)
    const passwordConfirmationTitle = validation.validate('passwordConfirmation', state.name)

    setState({
      ...state,
      nameTitle,
      emailTitle,
      passwordTitle,
      passwordConfirmationTitle,
      isFormInvalid: !!nameTitle || !!emailTitle || !!passwordTitle || !!passwordConfirmationTitle
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

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

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
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

  return (
    <div className={Styles.signUpWrap}>
      <Header />
      <Context.Provider value={
        {
          state,
          setState
        }
      }>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>SignUp</h2>

          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>

          <SubmitButton text="Criar Conta" />

          <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar Para Login</Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
