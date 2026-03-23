import { API_BASE_URL } from '@/constants/apisPaths'
import axios from 'axios'

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

//요청
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

//응답, 오류처리
