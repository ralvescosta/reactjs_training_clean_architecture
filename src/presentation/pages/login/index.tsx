import React from 'react'
import Styles from './styles.scss'

import Header from '~/presentation/components/signHeader'
import Input from '~/presentation/components/inputMask'
import FormStatus from '~/presentation/components/formStatus'
import Footer from '~/presentation/components/footer'

const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <Header />

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha"/>

        <button type="submit">Entrar</button>

        <span className={Styles.link}>Criar Conta</span>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default Login
