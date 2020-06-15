import React, { useContext } from 'react'
import Context from '~/presentation/contexts/form'

import Spinner from '~/presentation/components/spinner'

import Styles from './styles.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading ? (<Spinner className={Styles.spinner} />) : null}
      {state.messageToUser ? <span data-testid="msg-to-user" className={Styles.error}>{state.messageToUser}</span> : null}
    </div>
  )
}

export default FormStatus
