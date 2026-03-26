import { http, HttpResponse } from 'msw'

type CheckNicknameBody = {
  nickname?: string
}

const duplicatedNicknames = ['관리자', 'admin', '오조오조']

export const checkNickNameHandlers = [
  http.post('*/api/v1/accounts/check-nickname', async ({ request }) => {
    const body = (await request.json()) as CheckNicknameBody
    const nickname = body.nickname?.trim()

    if (!nickname) {
      return HttpResponse.json(
        {
          error_detail: {
            nickname: ['이 필드는 필수 항목입니다.'],
          },
        },
        { status: 400 }
      )
    }

    if (duplicatedNicknames.includes(nickname)) {
      return HttpResponse.json(
        {
          error_detail: '중복된 닉네임이 존재합니다.',
        },
        { status: 409 }
      )
    }

    return HttpResponse.json(
      {
        detail: '사용가능한 닉네임 입니다.',
      },
      { status: 200 }
    )
  }),
]
