import MainLayout from '@/components/layouts/MainLayout.tsx'
import { Route, Routes } from 'react-router-dom'
import Homepage from '@/pages/Homepage.tsx'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path={'/'} element={<Homepage/>}/>
      </Routes>
    </MainLayout>
  )
}

export default App
