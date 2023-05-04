import { FC } from 'react'
import styles from './Galery.module.scss'

type PropsType = {
  name: string
  photos: string[]
}

export const Collection: FC<PropsType> = ({ name, photos }) => {
  return (
    <div className={styles.collection}>
      <img className={styles.collection__big} src={photos[0]} alt='Item' />
      <div className={styles.collection__bottom}>
        <img className={styles.collection__mini} src={photos[1]} alt='Item' />
        <img className={styles.collection__mini} src={photos[2]} alt='Item' />
        <img className={styles.collection__mini} src={photos[3]} alt='Item' />
      </div>
      <h4>{name}</h4>
    </div>
  )
}
