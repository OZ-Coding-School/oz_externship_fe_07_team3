import { API_BASE_URL } from '@/constants/apisPaths'
import { http, HttpResponse } from 'msw'
import { mockQuizData } from '../data/examData'
import { mockExamDeploymentList } from '../data/mockExamDeploymentList'
import { mockQuizResultData } from '../data/mockQuizResultData'

export const examHandlers = [
  // 시험 목록 조회
  http.get(`${API_BASE_URL}/exams/deployments`, () => {
    return HttpResponse.json(mockExamDeploymentList, { status: 200 })
  }),

  // 시험 문제 조회
  http.get(`${API_BASE_URL}/exams/deployments/:deploymentId`, ({ params }) => {
    const { deploymentId } = params

    return HttpResponse.json(
      {
        ...mockQuizData,
        deployment_id: Number(deploymentId),
      },
      { status: 200 }
    )
  }),

  // 참가 코드 검증
  http.post(
    `${API_BASE_URL}/exams/deployments/:deploymentId/check-code`,
    async ({ request, params }) => {
      const body = (await request.json()) as { code?: string }
      const { deploymentId } = params

      if (body.code === '1234') {
        return HttpResponse.json(
          {
            message: '참가 코드가 확인되었습니다.',
            deployment_id: Number(deploymentId),
          },
          { status: 200 }
        )
      }

      return HttpResponse.json(
        {
          message: '참가 코드가 올바르지 않습니다.',
        },
        { status: 400 }
      )
    }
  ),

  // 시험 상태 확인
  http.get(`${API_BASE_URL}/exams/deployments/:deploymentId/status`, () => {
    return HttpResponse.json(
      {
        status: 'in_progress',
      },
      { status: 200 }
    )
  }),

  // 시험 제출
  http.post(`${API_BASE_URL}/exams/submissions`, async ({ request }) => {
    const body = await request.json()

    return HttpResponse.json(
      {
        message: '제출이 완료되었습니다.',
        submission_id: 1,
        submitted_data: body,
      },
      { status: 201 }
    )
  }),

  // 시험 결과 조회
  http.get(`${API_BASE_URL}/exams/submissions/:submissionId`, ({ params }) => {
    const { submissionId } = params

    return HttpResponse.json(
      {
        ...mockQuizResultData,
        submission_id: Number(submissionId),
      },
      { status: 200 }
    )
  }),
]
