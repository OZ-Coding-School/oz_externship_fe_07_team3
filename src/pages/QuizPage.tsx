import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useExamQuestions } from '@/api/queries/exam/useExamQuestions'
import { useStatus } from '@/api/queries/exam/useStatus'
import { useSubmitExam } from '@/api/queries/exam/useSubmitExam'
import CheatingModal from '@/components/exam/CheatingModal'
import ExamSubmitModal from '@/components/exam/ExamSubmitModal'
import ExamTerminatedModal from '@/components/exam/ExamTerminatedModal'
import QuizHeader from '@/components/exam/QuizHeader'
import Button from '@/components/ui/button'
import { getMyPageTab, getQuizResultPage } from '@/constants/routesPaths'
import { QuestionItem } from '@/features/quiz'
import QuizWarning from '@/features/quiz/QuizWarning'
import { useCheatingDetection } from '@/hooks/exam/useCheatingDetection'
import { useQuizTimer } from '@/hooks/exam/useQuizTimer'
import type { AnswerMap, AnswerValue } from '@/types/answer-type/answer'
import { createSubmitPayload } from '@/utils/createSubmitPayload'

function QuizPage() {
  const { deploymentId } = useParams()
  const navigate = useNavigate()
  const numericDeploymentId = Number(deploymentId)

  const [startedAt] = useState(() => new Date().toISOString())

  const [answers, setAnswers] = useState<AnswerMap>({})
  const [isWarningVisible, setIsWarningVisible] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isTerminated, setIsTerminated] = useState(false)

  const {
    data: statusData,
    isLoading: isStatusLoading,
    isError: isStatusError,
  } = useStatus(numericDeploymentId, !!numericDeploymentId)

  const shouldFetchQuestions =
    !!numericDeploymentId &&
    !Number.isNaN(numericDeploymentId) &&
    !!statusData &&
    !(statusData.exam_status === 'closed' && statusData.force_submit)

  const {
    data: quizData,
    isLoading: isQuizLoading,
    isError: isQuizError,
  } = useExamQuestions(numericDeploymentId, shouldFetchQuestions)

  const submitExamMutation = useSubmitExam()
  const {
    cheatingCount,
    isCheatingModalOpen,
    cheatingMessage,
    handleCheatingModalClose,
    handleCheatingModalConfirm,
  } = useCheatingDetection({
    isSubmitting,
    onTerminate: async () => {
      setIsTerminated(true)
    },
  })

  const isAnswered = useCallback((answer: AnswerValue) => {
    if (answer === null) {
      return false
    }

    if (typeof answer === 'string') {
      return answer.trim().length > 0
    }

    if (Array.isArray(answer)) {
      return (
        answer.length > 0 &&
        answer.every((item) => {
          if (typeof item === 'string') {
            return item.trim().length > 0
          }

          return true
        })
      )
    }

    if (typeof answer === 'boolean') {
      return true
    }

    return true
  }, [])

  const isAllQuestionsAnswered = useMemo(() => {
    if (!quizData) {
      return false
    }

    return quizData.questions.every((question) =>
      isAnswered(answers[question.question_id] ?? null)
    )
  }, [answers, isAnswered, quizData])

  const handleSubmit = useCallback(
    async (force = false) => {
      if (isSubmitting) {
        return
      }

      if (!quizData) {
        return
      }

      if (!force && !isAllQuestionsAnswered) {
        toast.error('모든 문제를 풀어야 제출할 수 있습니다.')
        return
      }

      setIsSubmitting(true)

      try {
        const payload = createSubmitPayload({
          deploymentId: numericDeploymentId,
          startedAt,
          cheatingCount,
          quizData,
          answers,
        })
        const result = await submitExamMutation.mutateAsync({
          deploymentId: numericDeploymentId,
          payload,
        })
        navigate(getQuizResultPage(result.submission_id))
        setIsSubmitModalOpen(false)
      } catch (error) {
        toast.error('시험 제출에 실패했습니다.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      answers,
      cheatingCount,
      isAllQuestionsAnswered,
      isSubmitting,
      navigate,
      numericDeploymentId,
      quizData,
      startedAt,
      submitExamMutation,
    ]
  )

  const { formattedTime } = useQuizTimer({
    initialSeconds: (quizData?.duration_time ?? 30) * 60,
    onTimeEnd: () => {
      void handleSubmit(true)
    },
  })

  const handleAnswerChange = useCallback(
    (questionId: number, answer: AnswerValue) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }))
    },
    []
  )

  const handleBack = useCallback(() => {
    if (isTerminated) {
      return
    }

    navigate(getMyPageTab('exam'))
  }, [isTerminated, navigate])

  useEffect(() => {
    const enterFullscreen = async () => {
      if (document.fullscreenElement) {
        return
      }

      try {
        await document.documentElement.requestFullscreen()
      } catch (error) {
        console.warn('전체화면 진입이 차단되었습니다.')
      }
    }

    enterFullscreen()

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }, [])

  useEffect(() => {
    if (Number.isNaN(numericDeploymentId)) {
      setIsError(true)
    }
  }, [numericDeploymentId])

  useEffect(() => {
    if (!statusData) {
      return
    }

    if (statusData.exam_status === 'closed' && statusData.force_submit) {
      setIsTerminated(true)
    }
  }, [statusData])

  if (isError || isStatusError || isQuizError) {
    return <div>시험 정보를 불러오지 못했습니다.</div>
  }

  if (isTerminated) {
    return (
      <ExamTerminatedModal
        isOpen={isTerminated}
        onConfirm={() => navigate(getMyPageTab('exam'))}
      />
    )
  }

  if (isStatusLoading || isQuizLoading || !quizData) {
    return <div>로딩중...</div>
  }

  return (
    <>
      <QuizHeader
        variant="inProgress"
        title={quizData.exam_name}
        subText="집중해서 천천히, 끝까지 응시해 주세요. 응원할게요💪"
        timeText={`${formattedTime} 뒤에 끝나요`}
        onBack={handleBack}
        cheatingCount={cheatingCount}
      />

      <section className="px-90 pt-8">
        <QuizWarning
          isVisible={isWarningVisible}
          onClose={() => {
            setIsWarningVisible(false)
          }}
        />

        <div className="mt-15">
          {quizData.questions.map((question) => (
            <QuestionItem
              key={question.question_id}
              question={question}
              value={answers[question.question_id] ?? null}
              onChange={(answer) => {
                handleAnswerChange(question.question_id, answer)
              }}
            />
          ))}
        </div>
      </section>

      <div className="mt-50 mb-25 flex justify-center">
        <Button
          type="button"
          onClick={() => {
            setIsSubmitModalOpen(true)
          }}
          disabled={isSubmitting || !isAllQuestionsAnswered}
          className="text-primary-100 border-primary-600 w-auto rounded-lg bg-[#721AE3] px-7 py-6.25"
        >
          제출하기
        </Button>
      </div>

      <CheatingModal
        isOpen={isCheatingModalOpen}
        cheatingCount={cheatingCount}
        message={cheatingMessage}
        onClose={handleCheatingModalClose}
        onConfirm={handleCheatingModalConfirm}
      />

      <ExamSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => {
          setIsSubmitModalOpen(false)
        }}
        onConfirm={() => {
          void handleSubmit()
        }}
      />
    </>
  )
}

export default QuizPage
