import { useEffect, useRef } from 'react'
import { postRefreshToken } from '@/api/auth'
import { getMyInfo } from '@/api/mypage'
import { useAuthStore } from '@/store/authStore'

export const useAuthBootstrap = () => {
  const hasRun = useRef(false)

  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setUser = useAuthStore((state) => state.setUser)
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const initAuth = async () => {
      try {
        const { access_token } = await postRefreshToken()
        setAccessToken(access_token)

        const user = await getMyInfo()
        setUser(user)
      } catch {
        setAccessToken(null)
        setUser(null)
      } finally {
        setAuthInitialized(true)
      }
    }

    void initAuth()
  }, [setAccessToken, setUser, setAuthInitialized])
}
