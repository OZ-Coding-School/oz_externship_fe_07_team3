import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from '../mypage'

export const MY_INFO_QUERY_KEY = ['my-info']

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: MY_INFO_QUERY_KEY,
    queryFn: getMyInfo,
  })
}
