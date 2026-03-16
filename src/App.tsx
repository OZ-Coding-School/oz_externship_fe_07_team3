import { Route, Routes } from 'react-router-dom'
import './App.css'
import Rootlayout from './components/layout/RootLayout'
import { ROUTES_PATHS } from './constants/routesPaths'
import NotFound from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import LoginPage from './pages/LoginPage'
import MyPage from './pages/MyPage'
import QuizLayout from './components/layout/quiz/QuizLayout'
import QuizPage from './pages/QuizPage'
import QuizResultPage from './pages/QuizResultPage'

function App() {
  return (
    <Routes>
      <Route element={<Rootlayout />}>
        <Route path={ROUTES_PATHS.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES_PATHS.TEST_PAGE} element={<TestPage />} />
        <Route path={ROUTES_PATHS.LOGIN_PAGE} element={<LoginPage />} />
        <Route path={ROUTES_PATHS.MY_PAGE} element={<MyPage />} />
      </Route>

      <Route element={<QuizLayout />}>
        <Route path={ROUTES_PATHS.QUIZ_PAGE} element={<QuizPage />} />
        <Route
          path={ROUTES_PATHS.QUIZ_RESULT_PAGE}
          element={<QuizResultPage />}
        />
      </Route>
      <Route path={ROUTES_PATHS.PAGE_NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default App
