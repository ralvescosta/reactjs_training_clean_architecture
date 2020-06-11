import React, { useContext } from 'react'

import Context from '~/presentation/contexts/form'

import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const MaskInput: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const title = state[`${props.name}Title`]

  function enableInput (e: React.FocusEvent<HTMLInputElement>): void {
    e.target.readOnly = false
  }

  function getStatus (): string {
    return title ? '🌑' : '💚'
  }

  function getTitle (): string {
    return title || 'Tudo Certo!'
  }

  function handleChange (e: React.FocusEvent<HTMLInputElement>): void {
    setState(
      {
        ...state,
        [e.target.name]: e.target.value
      })
  }

  return (
    <div className={Styles.inputWrap}>
      <input data-testid={props.name} {...props} readOnly onFocus={enableInput} onChange={handleChange}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default MaskInput
