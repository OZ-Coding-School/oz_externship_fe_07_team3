import { Route, Routes } from 'react-router-dom'
import './App.css'
import Rootlayout from './components/layout/RootLayout'

import NotFound from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import { ROUTES_PATHS } from './constants/routesPaths'

function App() {
  return (
    <Routes>
      <Route element={<Rootlayout />}>
        <Route path={ROUTES_PATHS.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES_PATHS.TEST_PAGE} element={<TestPage />} />
      </Route>
      <Route path={ROUTES_PATHS.PAGE_NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default App
