import axios from 'axios'
import { API_BASE_URL, APIS_PATHS } from '@/constants/apisPaths'
import { useAuthStore } from '@/store/authStore'

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export const privateApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(APIS_PATHS.REFRESH_TOKEN)
    ) {
      originalRequest._retry = true

      try {
        const { data } = await publicApi.post(APIS_PATHS.REFRESH_TOKEN)
        const newToken = data.access_token

        useAuthStore.getState().setAccessToken(newToken)

        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return privateApi(originalRequest)
      } catch (refreshError) {
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
export const api = privateApi
