import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { Collection } from './Collection'
import styles from './Galery.module.scss'

type CollectionType = {
  category: number
  name: string
  photos: string[]
}

const categories = [
  { name: 'All' },
  { name: 'Sea' },
  { name: 'Mountains' },
  { name: 'Architecture' },
  { name: 'Cities' },
]

export const Galery: FC = () => {
  const [categoryId, setCategoryId] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [collections, setCollections] = useState<CollectionType[]>([])

  const getItems = async () => {
    const category = categoryId ? `&category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    try {
      const { data } = await axios.get(
        `https://63ecedf732a0811723a53996.mockapi.io/images?page=${currentPage}&limit=3${category}${search}`
      )
      setCollections(data)
    } catch (err) {
      console.warn(err)
      alert('Ups, somthing went wrong...')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getItems()
  }, [categoryId, currentPage, searchValue])

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str)
      setCurrentPage(1)
    }, 300),
    []
  )

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
      <h1>My photo collection</h1>
      <div className={styles.top}>
        <ul className={styles.tags}>
          {categories.map((obj, i) => (
            <li
              className={categoryId === i ? styles.active : ''}
              onClick={() => setCategoryId(i)}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={value}
          onChange={onChangeInput}
          className={styles.search_input}
          placeholder='Search by value'
        />
      </div>
      <div className={styles.content}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          collections.map((obj, i) => <Collection key={i} {...obj} />)
        )}
      </div>
      <div className={styles.pagination}>
        <ul>
          {[...Array(5)].map((_, i) => (
            <li
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.active : ''}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
