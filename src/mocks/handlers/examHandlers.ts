import { http, HttpResponse } from 'msw'
import {
  examDeployments,
  examQuestions,
  submissionResult,
} from '@/mocks/data/examData'
import {
  badRequest,
  conflict,
  forbidden,
  gone,
  hasAuth,
  locked,
  notFound,
  unauthorized,
} from '@/mocks/utils/response'

const API_BASE = '/api/v1'

export const examHandlers = [
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
