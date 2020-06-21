import React, { useState } from 'react'

import Context from '~/presentation/contexts/form'

import Styles from './styles.scss'

import Header from '~/presentation/components/signHeader'
import Input from '~/presentation/components/inputMask'
import FormStatus from '~/presentation/components/formStatus'
import Footer from '~/presentation/components/footer'
// import { Link } from 'react-router-dom'

type Props = {
}

const SignUp: React.FC<Props> = () => {
  const [state] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isLoading: false,
    nameTitle: 'Campo Obrigatorio',
    emailTitle: 'Campo Obrigatorio',
    passwordTitle: 'Campo Obrigatorio',
    passwordConfirmationTitle: 'Campo Obrigatorio',
    messageToUser: ''
  })

  return (
    <div className={Styles.signUpWrap}>
      <Header />
      <Context.Provider value={
        {
          state
        }
      }>
        <form data-testid="form" className={Styles.form} onSubmit={() => {}}>
          <h2>SignUp</h2>

          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>

          <button data-testid="submit" disabled type="submit">Criar Conta</button>

          <a className={Styles.link}>Voltar Para Login</a>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
