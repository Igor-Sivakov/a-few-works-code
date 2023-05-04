import { FC } from 'react'
import close from '../../../assets/img/plus.svg'
import { UsersType } from '../InvitePopup'
import { Skeleton } from './Skeleton'
import { User } from './User'
import styles from '../InvitePopup.module.scss'

type PropsType = {
  items: UsersType[]
  invites: number[]
  isLoading: boolean
  searchValue: string
  setSearchValue: (value: string) => void
  onClickInvite: (id: number) => void
  onClickSendInvites: () => void
  setOpen: (value: boolean) => void
}

export const Users: FC<PropsType> = ({
  items,
  isLoading,
  setSearchValue,
  searchValue,
  onClickInvite,
  invites,
  onClickSendInvites,
  setOpen,
}) => {
  return (
    <>
      <img
        className={styles.close_icon}
        onClick={() => setOpen(false)}
        src={close}
        alt='close'
      />
      <div className={styles.search}>
        <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
        </svg>
        <input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Find user...'
        />
      </div>
      {isLoading ? (
        <div className={styles.skeleton_list}>
          {items.map((obj) => (
            <Skeleton key={obj.id} />
          ))}
        </div>
      ) : (
        <ul className={styles.users_list}>
          {items
            .filter((obj) => {
              const fullName = (
                obj.first_name + obj.last_name
              ).toLocaleLowerCase()

              const value = searchValue.toLocaleLowerCase()

              return (
                fullName.includes(value) ||
                obj.email.toLocaleLowerCase().includes(value)
              )
            })
            .map((obj) => (
              <User
                isInvited={invites.includes(obj.id)}
                onClickInvite={onClickInvite}
                key={obj.id}
                {...obj}
              />
            ))}
        </ul>
      )}
      {invites.length > 1 && (
        <button onClick={onClickSendInvites} className={styles.send_invite_btn}>
          Send an invitation
        </button>
      )}
    </>
  )
}
