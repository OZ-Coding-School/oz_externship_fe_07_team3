import type {
  GetProfileImagePresignedUrlRequest,
  GetProfileImagePresignedUrlResponse,
  PatchProfileImageRequest,
  PatchProfileImageResponse,
} from '@/types/mypage-type/profileImage'
import { api } from './api'
import { APIS_PATHS } from '@/constants/apisPaths'
import axios from 'axios'

/**
 * Presigned URL 발급
 */
export async function getProfileImagePresignedUrl(
  payload: GetProfileImagePresignedUrlRequest
) {
  const { data } = await api.put<GetProfileImagePresignedUrlResponse>(
    APIS_PATHS.PRESIGNED_URL,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return data
}

/**
 * S3 직접 업로드
 */
export async function uploadImageToAWS(params: {
  presignedUrl: string
  file: File
}) {
  await axios.put(params.presignedUrl, params.file, {
    headers: {
      'Content-Type': params.file.type,
    },
  })
}

/**
 * 업로드된 이미지 URL 서버에 저장
 */
export async function patchProfileImage(payload: PatchProfileImageRequest) {
  const { data } = await api.patch<PatchProfileImageResponse>(
    APIS_PATHS.PROFILE_IMAGE,
    payload
  )

  return data
}
