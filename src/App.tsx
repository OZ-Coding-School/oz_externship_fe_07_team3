import { Route, Routes } from 'react-router-dom'
import './App.css'
import Rootlayout from './components/layout/RootLayout'
import { ROUTES_PATHS } from './constants/routesPaths'
import NotFound from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import QuizPage from './pages/QuizPage'
import LoginPage from './pages/LoginPage'
import MyPage from './pages/MyPage'

function App() {
  return (
    <Routes>
      <Route element={<Rootlayout />}>
        <Route path={ROUTES_PATHS.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES_PATHS.TEST_PAGE} element={<TestPage />} />
        <Route path={ROUTES_PATHS.QUIZ_PAGE} element={<QuizPage />} />
        <Route path={ROUTES_PATHS.LOGIN_PAGE} element={<LoginPage />} />
        <Route path={ROUTES_PATHS.MY_PAGE} element={<MyPage />} />
      </Route>
      <Route path={ROUTES_PATHS.PAGE_NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default App
