import React from 'react'

import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const MaskInput: React.FC<Props> = (props: Props) => {
  function enableInput (e: React.FocusEvent<HTMLInputElement>): void {
    e.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput}/>
      <span className={Styles.status}>🌑</span>
    </div>
  )
}

export default MaskInput
