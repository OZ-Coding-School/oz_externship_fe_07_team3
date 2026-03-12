import { http, HttpResponse } from 'msw'

const API_BASE = '/api/v1'

// 인증 확인
const hasAuth = (request: Request) => {
  const auth = request.headers.get('Authorization')
  return !!auth?.startsWith('Bearer ')
}

// 공통 에러 응답
const unauthorized = () =>
  HttpResponse.json(
    { error_detail: '자격 인증 데이터가 제공되지 않았습니다.' },
    { status: 401 }
  )

const forbidden = (message = '권한이 없습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 403 })

const notFound = (message = '해당 정보를 찾을 수 없습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 404 })

const badRequest = (message = '유효하지 않은 요청입니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 400 })

const conflict = (message = '충돌이 발생했습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 409 })

const gone = (message = '시험이 종료되었습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 410 })

const locked = (message = '아직 응시할 수 없습니다.') =>
  HttpResponse.json({ error_detail: message }, { status: 423 })

// 쪽지시험 목록
const examDeployments = [
  {
    id: 101,
    submission_id: 333,
    exam: {
      id: 1,
      title: 'HTML 기초',
      thumbnail_img_url: 'https://cdn.ozcoding/mock/exam-html.png',
      subject: {
        id: 10,
        title: 'HTML',
        thumbnail_img_url: 'https://cdn.ozcoding/html.png',
      },
    },
    question_count: 10,
    total_score: 100,
    exam_info: {
      status: 'done',
      score: 80,
      correct_answer_count: 8,
    },
    is_done: true,
    duration_time: 20,
  },
  {
    id: 102,
    submission_id: null,
    exam: {
      id: 2,
      title: 'TypeScript 기본 문법 테스트',
      thumbnail_img_url: 'https://cdn.ozcoding/mock/exam-ts.png',
      subject: {
        id: 11,
        title: 'TypeScript',
        thumbnail_img_url: 'https://cdn.ozcoding/typescript.png',
      },
    },
    question_count: 5,
    total_score: 50,
    exam_info: {
      status: 'pending',
      score: null,
      correct_answer_count: null,
    },
    is_done: false,
    duration_time: 30,
  },
]

// 쪽지시험 문제 목록
const examQuestions = [
  {
    question_id: 1,
    number: 1,
    type: 'single_choice',
    question:
      'TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?',
    point: 10,
    prompt: null,
    blank_count: null,
    options: [
      '상위 타입 값을 하위 타입 변수에 할당',
      '하위 타입 값을 상위 타입 변수에 할당',
      '서로소 유니온 타입 간 값은 일부 유니온 타입 변수에 할당',
      '상위 타입과 하위 타입은 항상 양방향 할당 가능',
    ],
    answer_input: null,
  },
  {
    question_id: 2,
    number: 2,
    type: 'multiple_choice',
    question: '다음 중 TypeScript의 특징으로 올바른 것을 모두 고르시오.',
    point: 10,
    prompt: '',
    blank_count: null,
    options: [
      '정적 타입 검사 지원',
      '런타임 시에만 타입 검사',
      '자바스크립트와 호환됨',
      '인터페이스와 제네릭 지원',
    ],
    answer_input: [],
  },
  {
    question_id: 5,
    number: 5,
    type: 'fill_blank',
    question: '다음 빈칸을 채우세요.',
    point: 10,
    prompt:
      '변수나 함수의 매개변수, 반환값에 타입을 명시하는 것을 __ 이라고 한다. interface 또는 type 키워드를 사용하여 객체의 구조를 정의할 수 있는데, 이렇게 만든 타입을 __ 이라고 부른다.',
    blank_count: 2,
    options: null,
    answer_input: ['', ''],
  },
]

// 쪽지시험 결과
const submissionResult = {
  id: 3,
  submitter_id: 5,
  deployment_id: 8,
  exam: {
    id: 1,
    title: '중간고사',
    thumbnail_img_url: 'https://img.com',
  },
  questions: [
    {
      id: 3,
      question: '배고픈 사람은?',
      prompt: 'string',
      blank_count: 0,
      options: ['나', '너', '우리'],
      type: 'single_choice',
      answer: ['나'],
      point: 10,
      explanation: '아임 스틸 헝그리',
      is_correct: true,
      submitted_answer: ['나'],
    },
  ],
  cheating_count: 0,
  total_score: 10,
  correct_answer_count: 1,
  elapsed_time: 15,
  started_at: '2025-12-31T14:18:40.762Z',
  submitted_at: '2025-12-31T14:33:40.762Z',
}

export const handlers = [
  // 60. 쪽지시험 목록 조회 API
  http.get(`${API_BASE}/exams/deployments`, ({ request }) => {
    if (!hasAuth(request)) return unauthorized()

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const status = url.searchParams.get('status') ?? 'all'

    const filtered =
      status === 'all'
        ? examDeployments
        : examDeployments.filter((item) => item.exam_info.status === status)

    return HttpResponse.json({
      page,
      has_next: false,
      results: filtered,
    })
  }),

  // 61. 쪽지시험 참가 코드 검증 API
  http.post(
    `${API_BASE}/exams/deployments/:deploymentId/check-code`,
    async ({ request, params }) => {
      if (!hasAuth(request)) return unauthorized()

      if (params.deploymentId === '9999') {
        return notFound('배포 정보를 찾을 수 없습니다.')
      }

      const body = (await request.json()) as { code?: string }

      if (!body.code) {
        return HttpResponse.json(
          { error_detail: { code: '이 필드는 필수 항목입니다.' } },
          { status: 400 }
        )
      }

      if (body.code === 'LOCKED') {
        return locked('아직 응시할 수 없습니다.')
      }

      if (body.code !== '124312') {
        return badRequest('응시 코드가 일치하지 않습니다.')
      }

      return new HttpResponse(null, { status: 204 })
    }
  ),

  // 62. 쪽지시험 응시 문제풀이 API
  http.get(
    `${API_BASE}/exams/deployments/:deploymentId`,
    ({ request, params }) => {
      if (!hasAuth(request)) return unauthorized()

      if (params.deploymentId === '403') return forbidden()
      if (params.deploymentId === '404') {
        return notFound('해당 시험 정보를 찾을 수 없습니다.')
      }
      if (params.deploymentId === '410') {
        return gone('시험이 종료되었습니다.')
      }

      return HttpResponse.json({
        exam_id: 1,
        exam_name: 'TypeScript 기본 문법 테스트',
        duration_time: 30,
        elapsed_time: 0,
        cheating_count: 0,
        questions: examQuestions,
      })
    }
  ),

  // 63. 쪽지시험 상태 확인 API
  http.get(
    `${API_BASE}/exams/deployments/:deploymentId/status`,
    ({ request, params }) => {
      if (!hasAuth(request)) return unauthorized()

      if (params.deploymentId === '400') {
        return badRequest('유효하지 않은 시험 응시 세션입니다.')
      }
      if (params.deploymentId === '404') {
        return notFound('해당 시험 정보를 찾을 수 없습니다.')
      }
      if (params.deploymentId === '410') {
        return gone('시험이 이미 종료되었습니다.')
      }

      return HttpResponse.json({
        exam_status: 'activated',
        force_submit: false,
      })
    }
  ),

  // 64. 쪽지시험 제출 API
  http.post(`${API_BASE}/exams/submissions`, async ({ request }) => {
    if (!hasAuth(request)) return unauthorized()

    const body = (await request.json()) as {
      deployment_id?: number
      started_at?: string
      cheating_count?: number
      answers?: Array<{
        question_id: number
        type: string
        submitted_answer: unknown
      }>
    }

    if (
      !body.deployment_id ||
      !body.started_at ||
      !Array.isArray(body.answers)
    ) {
      return badRequest('유효하지 않은 시험 응시 세션입니다.')
    }

    if (body.deployment_id === 404) {
      return notFound('해당 시험 정보를 찾을 수 없습니다.')
    }

    if (body.deployment_id === 409) {
      return conflict('이미 제출된 시험입니다.')
    }

    return HttpResponse.json(
      {
        submission_id: 350,
        score: 85,
        correct_answer_count: 17,
        redirect_url: '/exam/result/350',
      },
      { status: 201 }
    )
  }),

  // 65. 쪽지시험 결과 확인 API
  http.get(
    `${API_BASE}/exams/submissions/:submissionId`,
    ({ request, params }) => {
      if (!hasAuth(request)) return unauthorized()

      if (params.submissionId === '400') {
        return badRequest('유효하지 않은 시험 응시 세션입니다.')
      }
      if (params.submissionId === '404') {
        return notFound('해당 시험 정보를 찾을 수 없습니다.')
      }

      return HttpResponse.json(submissionResult)
    }
  ),
]
