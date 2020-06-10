import React from 'react'
import Styles from './styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={[Styles.ellipsis, props.className].join(' ')} >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
