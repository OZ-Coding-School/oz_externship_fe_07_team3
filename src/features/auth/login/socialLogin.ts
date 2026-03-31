import { API_BASE_URL, APIS_PATHS } from '@/constants/apisPaths'

type Provider = 'kakao' | 'naver'

const SOCIAL_LOGIN_PATHS: Record<Provider, string> = {
  kakao: APIS_PATHS.SOCIAL_LOGIN_KAKAO,
  naver: APIS_PATHS.SOCIAL_LOGIN_NAVER,
}

export const redirectToSocialLogin = (provider: Provider) => {
  window.location.href = `${API_BASE_URL}${SOCIAL_LOGIN_PATHS[provider]}`
}
