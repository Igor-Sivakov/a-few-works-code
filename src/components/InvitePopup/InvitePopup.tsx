import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import cn from 'classnames'
import { UserOutlined } from '@ant-design/icons'
import { Users } from './Users/Users'
import { Success } from './Success'
import styles from './InvitePopup.module.scss'

export type UsersType = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export const InvitePopup: FC = () => {
  const [users, setUsers] = useState<UsersType[]>([
    {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    },
  ])
  const [invites, setInvites] = useState<number[]>([0])
  const [isLoading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users')
      .then((res) => {
        setUsers(res.data.data)
      })
      .catch((err) => {
        console.warn(err)
        alert('Ups, somthing went wrong :(')
      })
      .finally(() => setLoading(false))
  }, [])

  const onClickInvite = (id: number) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id))
    } else {
      setInvites((prev) => [...prev, id])
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className={styles.root}>
      <button className={styles.open_btn} onClick={() => setOpen(!open)}>
        Invite peoples
        <UserOutlined />
      </button>
      <div className={cn(styles.container, { [styles.show]: open })}>
        {success ? (
          <Success
            setSuccess={setSuccess}
            setOpen={setOpen}
            setInvites={setInvites}
            count={invites.length - 1}
          />
        ) : (
          <Users
            searchValue={searchValue}
            invites={invites}
            items={users}
            isLoading={isLoading}
            setSearchValue={setSearchValue}
            onClickInvite={onClickInvite}
            onClickSendInvites={onClickSendInvites}
            setOpen={setOpen}
          />
        )}
      </div>
    </div>
  )
}
