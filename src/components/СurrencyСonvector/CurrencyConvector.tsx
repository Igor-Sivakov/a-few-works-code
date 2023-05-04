import { FC, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ConvectorBlock } from './ConvectorBlock'
import styles from './CurrencyConvector.module.scss'

type RateType = {
  cc: string
  exchangedate: string
  r030: number
  rate: number
  txt: string
}

const UAH = {
  cc: 'UAH',
  exchangedate: '28.02.2023',
  r030: 965,
  rate: 1,
  txt: 'Украинская гривна',
}

export const CurrencyConvector: FC = () => {
  const [fromCurrency, setFromCurrency] = useState('UAH')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState('0')
  const [toPrice, setToPrice] = useState('0')

  const ratesRef = useRef<RateType[]>([])

  const fetchRates = async () => {
    try {
      const { data } = await axios.get(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      )

      ratesRef.current = data
      ratesRef.current = [...ratesRef.current, UAH]
    } catch (err) {
      console.warn(err)
      alert('Ups, somthing went wrong...')
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  const rateFrom = ratesRef.current.find((obj) => obj.cc === fromCurrency)
  const rateTo = ratesRef.current.find((obj) => obj.cc === toCurrency)

  const onChangeFromPrice = (value: string) => {
    if (rateFrom && rateTo) {
      const result = (Number(value) / rateTo.rate) * rateFrom.rate

      setToPrice(result.toFixed(3).toString())
    }

    setFromPrice(value)
  }

  const onChangeToPrice = (value: string) => {
    if (rateFrom && rateTo) {
      const result = (rateTo.rate / rateFrom.rate) * Number(value)

      setFromPrice(result.toFixed(3).toString())
    }
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <ConvectorBlock
            value={fromPrice}
            currency={fromCurrency}
            onChangeCurrency={setFromCurrency}
            onChangeValue={onChangeFromPrice}
          />
          <ConvectorBlock
            value={toPrice}
            currency={toCurrency}
            onChangeCurrency={setToCurrency}
            onChangeValue={onChangeToPrice}
          />
        </div>
      </div>
    </div>
  )
}
