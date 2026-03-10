import { Route, Routes } from 'react-router-dom'
import './App.css'
import Rootlayout from './components/layout/RootLayout'

import NotFound from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'

function App() {
  return (
    <Routes>
      <Route element={<Rootlayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
