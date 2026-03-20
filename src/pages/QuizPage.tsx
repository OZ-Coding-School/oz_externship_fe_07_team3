import { getExamQuestions } from '@/api/exam'
import CheatingModal from '@/components/exam/CheatingModal'
import ExamSubmitModal from '@/components/exam/ExamSubmitModal.tsx'
import ExamTerminatedModal from '@/components/exam/ExamTerminatedModal'
import ExamWarning from '@/components/exam/ExamWarning'
import QuizHeader from '@/components/layout/quiz/QuizHeader'
import Button from '@/components/ui/button'
import { getMyPageTab, getQuizResultPage } from '@/constants/routesPaths'
import { QuestionItem } from '@/features/quiz'
import { useCheatingDetection } from '@/hooks/exam/useCheatingDetection'
import { useQuizTimer } from '@/hooks/exam/useQuizTimer'
import type { AnswerMap, AnswerValue } from '@/types/answer-type/answer'
import type { QuizData } from '@/types/quizpage-type/question'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  const navigate = useNavigate()

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

  const handleAnswerChange = useCallback(
    (questionId: number, answer: AnswerValue) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }))
    },
    []
  )

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
        setIsSubmitModalOpen(false)
        navigate(getQuizResultPage(1))
      } finally {
        setIsSubmitting(false)
      }
    },
    [isAllQuestionsAnswered, isSubmitting, navigate, quizData]
  )

  const {
    cheatingCount,
    isCheatingModalOpen,
    cheatingMessage,
    isTerminated,
    handleCheatingModalClose,
    handleCheatingModalConfirm,
  } = useCheatingDetection({
    isSubmitting,
    onTerminate: async () => {},
  })

  const handleBack = useCallback(() => {
    if (isTerminated) {
      return
    }

    navigate(getMyPageTab('exam'))
  }, [isTerminated, navigate])

  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen()
        }
      } catch (error) {
        console.error('전체화면 진입 실패', error)
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
    const fetchQuizData = async () => {
      try {
        const data = await getExamQuestions(1)
        setQuizData(data)
      } catch (error) {
        toast.error('시험 문제를 불러오지 못했습니다.')
        setIsError(true)
      }
    }

    fetchQuizData()
  }, [])

  const { formattedTime } = useQuizTimer({
    initialSeconds: 30 * 60,
    onTimeEnd: () => {
      void handleSubmit(true)
    },
  })

  if (isError) {
    return <div>시험 문제를 불러오지 못했습니다.</div>
  }

  if (!quizData) {
    return <div>로딩중...</div>
  }

  return (
    <>
      <QuizHeader
        variant="inProgress"
        title="TypeScript 쪽지시험"
        subText="집중해서 천천히, 끝까지 응시해 주세요. 응원할게요💪"
        timeText={`${formattedTime} 뒤에 끝나요`}
        onBack={handleBack}
        cheatingCount={cheatingCount}
      />

      <section className="px-90 pt-8">
        <ExamWarning
          isVisible={isWarningVisible}
          onClose={() => setIsWarningVisible(false)}
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
          className="text-primary-100 border-primary-600 w-auto rounded-[4px] bg-[#721AE3] px-7 py-6.25"
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

      <ExamTerminatedModal
        isOpen={isTerminated}
        onConfirm={() => navigate(getMyPageTab('exam'))}
      />

      <ExamSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={() => {
          void handleSubmit()
        }}
      />
    </>
  )
}

export default QuizPage
