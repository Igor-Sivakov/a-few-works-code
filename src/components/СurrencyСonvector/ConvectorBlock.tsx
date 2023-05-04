import { FC } from 'react'
import styles from './CurrencyConvector.module.scss'

const defaultCurrencies = ['UAH', 'USD', 'EUR', 'GBP']

type PropsType = {
  value: string
  currency: string
  onChangeValue: (value: string) => void
  onChangeCurrency: (value: string) => void
}

export const ConvectorBlock: FC<PropsType> = ({
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
}) => {
  return (
    <div className={styles.block}>
      <ul className={styles.currencies}>
        {defaultCurrencies.map((cur) => (
          <li
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? styles.active : ''}
            key={cur}
          >
            {cur}
          </li>
        ))}
        <li>
          <svg height='50px' viewBox='0 0 50 50' width='50px'>
            <rect fill='none' height='50' width='50' />
            <polygon points='47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 ' />
          </svg>
        </li>
      </ul>
      <input
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type='number'
        placeholder={'0'}
      />
    </div>
  )
}
