import type { EnrolledCourseResponse, MyInfoResponse } from '@/types'
import { http, HttpResponse } from 'msw'

let myInfoMock: MyInfoResponse = {
  id: 1,
  email: 'ozschool1234@gmail.com',
  nickname: '오조오조',
  name: '김오조',
  phone_number: '010-1234-1234',
  birthday: '2000-12-25',
  gender: 'M',
  profile_img_url: null,
  created_at: '2025-10-30T14:01:57.505250+09:00',
}

const enrolledCoursesMock: EnrolledCourseResponse[] = [
  {
    cohort: {
      id: 1,
      number: 1,
      start_date: '2025-12-20T00:00:05.875842+09:00',
      end_date: '2025-12-20T00:00:05.875842+09:00',
      status: 'PENDING',
    },
    course: {
      id: 1,
      name: '프론트엔드 심화 부트캠프',
      tag: 'FE',
      thumbnail_img_url: '',
    },
  },
]

export const mypageHandlers = [
  http.get('/api/v1/accounts/me', async () => {
    return HttpResponse.json(myInfoMock, { status: 200 })
  }),

  http.patch('/api/v1/accounts/me', async ({ request }) => {
    const body = (await request.json()) as Partial<MyInfoResponse>

    myInfoMock = {
      ...myInfoMock,
      ...body,
    }

    return HttpResponse.json(myInfoMock, { status: 200 })
  }),

  http.get('/api/v1/accounts/me/enrolled-courses', async () => {
    return HttpResponse.json(enrolledCoursesMock, { status: 200 })
  }),

  /**
   * 회원 탈퇴
   */
  http.delete('/api/v1/accounts/me', async ({ request }) => {
    const body = (await request.json()) as {
      reason?: string
      reason_detail?: string
    }

    const validReasons = [
      'GRADUATION',
      'TRANSFER',
      'NO_LONGER_NEEDED',
      'SERVICE_DISSATISFACTION',
      'PRIVACY_CONCERN',
      'OTHER',
    ]

    if (!body?.reason) {
      return HttpResponse.json(
        {
          error_detail: 'reason은 필수입니다.',
        },
        { status: 400 }
      )
    }

    if (!validReasons.includes(body.reason)) {
      return HttpResponse.json(
        {
          error_detail: '유효하지 않은 탈퇴 사유입니다.',
        },
        { status: 400 }
      )
    }

    return new HttpResponse(null, {
      status: 204,
    })
  }),
]
