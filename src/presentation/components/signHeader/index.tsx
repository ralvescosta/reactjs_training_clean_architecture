import React, { memo } from 'react'

import Logo from '~/presentation/components/logo'

import Styles from './styles.scss'

const SignHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export default memo(SignHeader)
