import { API_BASE_URL } from '@/constants/apisPaths'
import axios from 'axios'

/**
 * axios - create
 * TODO: baseURL 수정 예정
 */

export const API_BASE = '/api/v1'

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
