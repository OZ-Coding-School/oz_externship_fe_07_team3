import { delay, http, HttpResponse } from 'msw'

type ChangePasswordBody = {
  old_password: string
  new_password: string
}

export const changePasswordHandlers = [
  http.post('/api/v1/accounts/change-password', async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as ChangePasswordBody

    const fieldErrors: Record<string, string[]> = {}

    if (!body.old_password.trim()) {
      fieldErrors.old_password = ['이 필드는 필수 항목입니다.']
    }

    if (!body.new_password.trim()) {
      fieldErrors.new_password = ['이 필드는 필수 항목입니다.']
    }

    if (Object.keys(fieldErrors).length > 0) {
      return HttpResponse.json(
        {
          error_detail: fieldErrors,
        },
        { status: 400 }
      )
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{6,15}$/.test(body.new_password)
    ) {
      return HttpResponse.json(
        {
          error_detail: {
            new_password: [
              '영문, 숫자, 특수문자를 포함한 6~15자로 입력해주세요.',
            ],
          },
        },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      {
        detail: '비밀번호 변경 성공.',
      },
      { status: 200 }
    )
  }),
]
