import { Route, Routes } from 'react-router-dom'

import './App.css'
import QuizLayout from './components/layout/QuizLayout'
import Rootlayout from './components/layout/RootLayout'
import { ROUTES_PATHS } from './constants/routesPaths'
import { useAuthBootstrap } from './features/auth/useAuthBootstrap'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MyPage from './pages/MyPage'
import NotFound from './pages/NotFoundPage'
import QuizPage from './pages/QuizPage'
import QuizResultPage from './pages/ResultPage'
import SignupPage from './pages/SignupPage'
import TestPage from './pages/TestPage'
import SocialCallbackPage from './pages/auth/SocialCallbackPage'

function App() {
  useAuthBootstrap()

  return (
    <Routes>
      <Route element={<Rootlayout />}>
        <Route path={ROUTES_PATHS.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES_PATHS.TEST_PAGE} element={<TestPage />} />
        <Route path={ROUTES_PATHS.LOGIN_PAGE} element={<LoginPage />} />
        <Route path={ROUTES_PATHS.SIGNUP_PAGE} element={<SignupPage />} />
        <Route path={ROUTES_PATHS.MY_PAGE} element={<MyPage />} />
      </Route>

      <Route path="/auth/callback" element={<SocialCallbackPage />} />

      <Route element={<QuizLayout />}>
        <Route
          path={`${ROUTES_PATHS.QUIZ_PAGE}/:deploymentId`}
          element={<QuizPage />}
        />
        <Route
          path={`${ROUTES_PATHS.RESULT_PAGE}/:submissionId`}
          element={<QuizResultPage />}
        />
      </Route>

      <Route path={ROUTES_PATHS.PAGE_NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default App
