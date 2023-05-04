import { FC, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Galery } from './components/Galery/Galery'
import { InvitePopup } from './components/InvitePopup/InvitePopup'
import { Quiz } from './components/Quiz/Quiz'
import { CurrencyConvector } from './components/СurrencyСonvector/CurrencyConvector'
import { MainLayout } from './layout/MainLayout'

const App: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [])

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Quiz />} />
        <Route path='popup' element={<InvitePopup />} />
        <Route path='convector' element={<CurrencyConvector />} />
        <Route path='galery' element={<Galery />} />
      </Route>
    </Routes>
  )
}

export default App
