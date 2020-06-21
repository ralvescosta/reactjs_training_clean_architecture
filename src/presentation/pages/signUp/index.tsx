import React from 'react'

import Context from '~/presentation/contexts/form'

import Styles from './styles.scss'

import Header from '~/presentation/components/signHeader'
import Input from '~/presentation/components/inputMask'
import FormStatus from '~/presentation/components/formStatus'
import Footer from '~/presentation/components/footer'
import { Link } from 'react-router-dom'

type Props = {
}

const SignUp: React.FC<Props> = () => {
  return (
    <div className={Styles.signUpWrap}>
      <Header />
      <Context.Provider value={
        {
          state: {}
        }
      }>
        <form data-testid="form" className={Styles.form} onSubmit={() => {}}>
          <h2>SignUp</h2>

          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>

          <button type="submit">Criar Conta</button>

          <Link to="/login" className={Styles.link}>Voltar Para Login</Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
