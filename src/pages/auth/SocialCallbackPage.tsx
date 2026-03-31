import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthBootstrap } from '@/features/auth/useAuthBootstrap'
import { useAuthStore } from '@/store/authStore'
import { ROUTES_PATHS } from '@/constants/routesPaths'

const SocialCallbackPage = () => {
  const navigate = useNavigate()
  const authInitialized = useAuthStore((state) => state.isAuthInitialized)
  const user = useAuthStore((state) => state.user)

  useAuthBootstrap()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const isSuccess = params.get('is_success')

    if (isSuccess !== 'true') {
      navigate(ROUTES_PATHS.LOGIN_PAGE)
    }
  }, [navigate])

  useEffect(() => {
    if (!authInitialized) return

    if (user) {
      navigate(ROUTES_PATHS.HOME_PAGE)
      return
    }

    navigate(ROUTES_PATHS.LOGIN_PAGE)
  }, [authInitialized, user, navigate])

  return <div>로그인 처리 중...</div>
}

export default SocialCallbackPage
