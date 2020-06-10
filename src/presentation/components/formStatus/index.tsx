import React from 'react'
import Spinner from '~/presentation/components/spinner'

import Styles from './styles.scss'

const FormStatus: React.FC = () => {
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  )
}

export default FormStatus
