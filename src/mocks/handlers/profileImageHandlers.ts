import { http, HttpResponse } from 'msw'

const MOCK_PRESIGNED_URL =
  'https://mock-s3.ap-northeast-2.amazonaws.com/uploads/images/profiles/mock-profile.png?AWSAccessKeyId=mock&Signature=mock'

const MOCK_IMG_URL =
  'https://mock-s3.ap-northeast-2.amazonaws.com/uploads/images/profiles/mock-profile.png'

export const profileImageHandlers = [
  /**
   * Presigned URL 발급
   */
  http.put('/api/v1/questions/presigned-url', async ({ request }) => {
    const body = (await request.json()) as {
      file_name?: string
    }

    if (!body.file_name) {
      return HttpResponse.json(
        {
          error_detail: {
            file_name: ['이 필드는 필수 항목입니다.'],
          },
        },
        { status: 400 }
      )
    }

    const fileName = body.file_name.toLowerCase()
    const isSupportedFile =
      fileName.endsWith('.png') ||
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg')

    if (!isSupportedFile) {
      return HttpResponse.json(
        {
          error_detail: '지원하지 않는 파일 형식입니다.',
        },
        { status: 400 }
      )
    }

    return HttpResponse.json({
      presigned_url: MOCK_PRESIGNED_URL,
      img_url: MOCK_IMG_URL,
      key: 'uploads/images/profiles/mock-profile.png',
    })
  }),

  /**
   * S3 업로드 mock
   * presigned url 전체 문자열 매칭이 까다로우니 와일드카드로 받음
   */
  http.put('https://mock-s3.ap-northeast-2.amazonaws.com/*', async () => {
    return new HttpResponse(null, { status: 200 })
  }),

  /**
   * 프로필 이미지 저장
   */
  http.patch('/api/v1/accounts/me/profile-image', async ({ request }) => {
    const body = (await request.json()) as {
      profile_img_url?: string
    }

    if (!body.profile_img_url) {
      return HttpResponse.json(
        {
          error_detail: {
            profile_img_url: ['이 필드는 필수 항목입니다.'],
          },
        },
        { status: 400 }
      )
    }

    return HttpResponse.json({
      detail: '프로필 사진이 등록되었습니다.',
    })
  }),
]
