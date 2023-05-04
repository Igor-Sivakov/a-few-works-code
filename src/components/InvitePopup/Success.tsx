import { FC } from 'react'
import successImg from '../../assets/img/success.svg'
import styles from './InvitePopup.module.scss'

type PropsType = {
  count: number
  setOpen: (value: boolean) => void
  setSuccess: (value: boolean) => void
  setInvites: (value: number[]) => void
}

export const Success: FC<PropsType> = ({
  count,
  setOpen,
  setSuccess,
  setInvites,
}) => {
  const onClickClose = () => {
    setOpen(false)
    setSuccess(false)
    setInvites([0])
  }

  return (
    <div className={styles.success_block}>
      <img src={successImg} alt='Success' />
      <h3>Successfully!</h3>
      <p>An invitation has been sent to all {count} users.</p>
      <button onClick={onClickClose} className={styles.send_invite_btn}>
        Go back
      </button>
    </div>
  )
}
