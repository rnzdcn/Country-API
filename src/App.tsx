import MainLayout from '@/components/layouts/MainLayout.tsx'
import { Route, Routes } from 'react-router-dom'
import Homepage from '@/pages/Homepage.tsx'
import Country from '@/pages/Country.tsx'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path={'/'} element={<Homepage/>}/>
        <Route path={'/:country'} element={<Country/>}/>
      </Routes>
    </MainLayout>
  )
}

export default App
