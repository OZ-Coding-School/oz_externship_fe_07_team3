import axios from 'axios'

/**
 * axios - create
 * TODO: baseURL 수정 예정
 */
export const api = axios.create({
  baseURL: '/api/v1',
})
