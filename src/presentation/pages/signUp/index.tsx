import React, { useState, useEffect } from 'react'

import Context from '~/presentation/contexts/form'

import Styles from './styles.scss'

import Header from '~/presentation/components/signHeader'
import Input from '~/presentation/components/inputMask'
import FormStatus from '~/presentation/components/formStatus'
import Footer from '~/presentation/components/footer'
import { Validation } from '~/presentation/protocols/validation'
import { AddAccount } from '~/domain/usecases/addAccount'
// import { Link } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isLoading: false,
    nameTitle: '',
    emailTitle: '',
    passwordTitle: '',
    passwordConfirmationTitle: '',
    messageToUser: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameTitle: validation.validate('name', state.name),
      emailTitle: validation.validate('email', state.name),
      passwordTitle: validation.validate('password', state.name),
      passwordConfirmationTitle: validation.validate('passwordConfirmation', state.name)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()

    if (state.isLoading) {
      return
    }

    setState({
      ...state,
      isLoading: true
    })
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
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

          <button
            data-testid="submit"
            disabled={
              !!state.nameTitle ||
            !!state.emailTitle ||
            !!state.passwordTitle ||
            !!state.passwordConfirmationTitle
            }
            type="submit"
          >
              Criar Conta
          </button>

          <a className={Styles.link}>Voltar Para Login</a>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
