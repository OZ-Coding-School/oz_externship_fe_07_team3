import { api } from './api'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/authStore'
import { postRefreshToken } from '@/api/auth'

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

let isRefreshing = false
let subscribers: ((token: string) => void)[] = []

const subscribe = (callback: (token: string) => void) => {
  subscribers.push(callback)
}

const notifySubscribers = (token: string) => {
  subscribers.forEach((cb) => cb(token))
  subscribers = []
}

export const setupInterceptors = () => {
  // ✅ 요청 시 토큰 자동 추가
  api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().accessToken

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  // ✅ 응답 처리 (401 → refresh → 재요청)
  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryConfig

      if (!originalRequest) return Promise.reject(error)

      const status = error.response?.status

      // 401 아니면 그냥 에러
      if (status !== 401) {
        return Promise.reject(error)
      }

      // 이미 재시도 했으면 종료 (무한루프 방지)
      if (originalRequest._retry) {
        useAuthStore.getState().logout()
        return Promise.reject(error)
      }

      originalRequest._retry = true

      // 이미 refresh 중이면 기다렸다가 재요청
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribe((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          })
        })
      }

      isRefreshing = true

      try {
        const { access_token } = await postRefreshToken()

        useAuthStore.getState().setAccessToken(access_token)

        notifySubscribers(access_token)

        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return api(originalRequest)
      } catch (err) {
        useAuthStore.getState().logout()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
  )
}
