/**
 * ROUTES 경로
 */
export const ROUTES_PATHS = {
  HOME_PAGE: '/',
  TEST_PAGE: '/test',
  PAGE_NOT_FOUND: '*',
  QUIZ_PAGE: '/quiz',
  QUIZ_RESULT_PAGE: '/quiz/result',
  LOGIN_PAGE: '/login',
  SIGNUP_PAGE: '/signup',
  MY_PAGE: '/mypage',
}

// 상수대로 사용하면서 동적경로 분리방법
export const getQuizPage = (id: number | string) =>
  `${ROUTES_PATHS.QUIZ_PAGE}/${id}`

export const getQuizResultPage = (id: number | string) =>
  `${ROUTES_PATHS.QUIZ_RESULT_PAGE}/${id}`

export const getMyPageTab = (tab: string) =>
  `${ROUTES_PATHS.MY_PAGE}?tab=${tab}`
