import { http, HttpResponse } from 'msw'

type VerifyRequestBody = {
  phone_number: string
  code: string
}

type SendRequestBody = {
  phone_number: string
}

type ChangePhoneRequestBody = {
  phone_verify_token: {
    token: string
  }
}

const MOCK_SMS_CODE = '123123'
const MOCK_PHONE_VERIFY_TOKEN = '123456'

export const changePhoneHandlers = [
  http.post('/api/v1/accounts/verification/send-sms', async ({ request }) => {
    const body = (await request.json()) as SendRequestBody

    if (!body.phone_number || body.phone_number.length !== 11) {
      return HttpResponse.json(
        {
          error_detail: {
            phone_number: ['휴대전화 번호는 11자리여야 합니다.'],
          },
        },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      {
        detail: '인증번호가 전송되었습니다.',
      },
      { status: 200 }
    )
  }),

  http.post('/api/v1/accounts/verification/verify-sms', async ({ request }) => {
    const body = (await request.json()) as VerifyRequestBody

    if (!body.phone_number || !body.code) {
      return HttpResponse.json(
        {
          error_detail: '잘못된 요청입니다.',
        },
        { status: 400 }
      )
    }

    if (body.code !== MOCK_SMS_CODE) {
      return HttpResponse.json(
        {
          error_detail: '인증번호가 유효하지 않습니다.',
        },
        { status: 401 }
      )
    }

    return HttpResponse.json(
      {
        detail: '휴대전화 인증에 성공했습니다.',
        token: '123456',
      },
      { status: 200 }
    )
  }),

  http.patch('/api/v1/accounts/change-phone', async ({ request }) => {
    const body = (await request.json()) as ChangePhoneRequestBody

    const token = body.phone_verify_token?.token

    if (!token) {
      return HttpResponse.json(
        {
          error_detail: {
            phone_number: ['이 필드는 필수 항목입니다.'],
          },
        },
        { status: 400 }
      )
    }

    if (token === 'expired-token') {
      return HttpResponse.json(
        {
          error_detail: '자격 인증 데이터가 제공되지 않았습니다.',
        },
        { status: 401 }
      )
    }

    if (token === 'duplicated-phone-token') {
      return HttpResponse.json(
        {
          error_detail: '이미 등록된 휴대폰 번호입니다.',
        },
        { status: 409 }
      )
    }

    if (token !== MOCK_PHONE_VERIFY_TOKEN) {
      return HttpResponse.json(
        {
          error_detail: '휴대폰 인증 실패 - 인증토큰이 유효하지 않습니다.',
        },
        { status: 401 }
      )
    }

    return HttpResponse.json(
      {
        detail: '휴대폰 번호 변경에 성공하였습니다.',
        phone_number: '01011112222',
      },
      { status: 200 }
    )
  }),
]
