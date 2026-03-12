import { HttpResponse } from 'msw'

export const hasAuth = (request: Request) => {
  const auth = request.headers.get('Authorization')
  return !!auth?.startsWith('Bearer ')
}

export const unauthorized = () =>
  HttpResponse.json(
    { error_detail: '자격 인증 데이터가 제공되지 않았습니다.' },
    { status: 401 }
  )

export const forbidden = (message = '권한이 없습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 403 })

export const notFound = (message = '해당 정보를 찾을 수 없습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 404 })

export const badRequest = (message = '유효하지 않은 요청입니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 400 })

export const conflict = (message = '충돌이 발생했습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 409 })

export const gone = (message = '시험이 종료되었습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 410 })

export const locked = (message = '아직 응시할 수 없습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 423 })
