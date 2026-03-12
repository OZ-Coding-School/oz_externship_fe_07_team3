// 시험 data 불러오기 api
export const getExamQuestions = async (deploymentId: number) => {
  const response = await fetch(`/api/v1/exams/deployments/${deploymentId}`, {
    headers: {
      Authorization: 'Bearer test-token',
    },
  })

  if (!response.ok) {
    throw new Error('시험 문제를 불러오지 못했습니다.')
  }

  return response.json()
}

export type Question = {
  question_id: number
  number: number
  type: string
  question: string
  point: number
  prompt: string | null
  blank_count: number | null
  options: string[] | null
  answer_input: string | string[] | null
}

export type QuizData = {
  exam_id: number
  exam_name: string
  duration_time: number
  elapsed_time: number
  cheating_count: number
  questions: Question[]
}
