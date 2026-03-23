import {
  getProfileImagePresignedUrl,
  patchProfileImage,
  uploadImageToAWS,
} from '@/api/profileImage'
import { useMutation } from '@tanstack/react-query'

export function useGetProfileImagePresignedUrl() {
  return useMutation({
    mutationFn: getProfileImagePresignedUrl,
  })
}

export function usePatchProfileImage() {
  return useMutation({
    mutationFn: patchProfileImage,
  })
}

/**
 * 프로필 이미지 업로드 전체 플로우
 * 1. presigned url 발급
 * 2. S3 업로드
 * 3. img_url 서버 저장
 */
export function useUploadProfileImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const { presigned_url, img_url, key } = await getProfileImagePresignedUrl(
        {
          file_name: file.name,
        }
      )

      await uploadImageToAWS({
        presignedUrl: presigned_url,
        file,
      })

      await patchProfileImage({
        profile_img_url: img_url,
      })

      return {
        img_url,
        key,
      }
    },
  })
}
