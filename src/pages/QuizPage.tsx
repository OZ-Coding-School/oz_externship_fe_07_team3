import { getExamQuestions } from '@/api/exam'
import AlertIcon from '@/assets/icons/quiz/alert-circle.png'
import CloseIcon from '@/assets/icons/quiz/icon-x-gray.svg?react'
import CheatingModal from '@/components/exam/CheatingModal'
import QuizHeader from '@/components/layout/quiz/QuizHeader'
import Button from '@/components/ui/button'
import { getMyPageTab, getQuizResultPage } from '@/constants/routesPaths'
import { QuestionItem } from '@/features/quiz'
import { useCheatingDetection } from '@/hooks/exam/useCheatingDetection'
import { useQuizTimer } from '@/hooks/exam/useQuizTimer'
import type { QuizData } from '@/types/quizpage-type/question'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) {
      return
    }
    setIsSubmitting(true)
    navigate(getQuizResultPage(1))
  }, [isSubmitting, navigate])

  const {
    cheatingCount,
    isCheatingModalOpen,
    cheatingMessage,
    isTerminated,
    handleCheatingModalClose,
    handleCheatingModalConfirm,
  } = useCheatingDetection({
    isSubmitting,
    onTerminate: handleSubmit,
  })

  const handleBack = () => {
    if (isTerminated) {
      return
    }
    navigate(getMyPageTab('exam'))
  }

  // 진입시 전체화면
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

  // 데이터 호출
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

  // 타이머 호출
  const { formattedTime } = useQuizTimer({
    initialSeconds: 30 * 60,
    onTimeEnd: handleSubmit,
  })

  // 가드
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
      {/* 닫히는 경고 */}
      <section className="px-90 pt-8">
        {isWarningVisible && (
          <div className="bg-primary-100 flex w-full items-start justify-between rounded-[8px] px-5 py-6">
            <div className="flex gap-3">
              <img
                className="h-6 w-6 shrink-0"
                src={AlertIcon}
                alt="경고 아이콘"
              />
              <div>
                <strong className="block text-base font-semibold">
                  시험에만 집중해 주세요
                </strong>
                <p className="mt-1 text-sm leading-[140%] font-normal">
                  탭이나 창을 이동하면 부정행위로 처리돼 시험이 중단될 수
                  있어요. 안정적인 환경에서 시험을 이어가 주세요.
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="경고 닫기"
              onClick={() => setIsWarningVisible(false)}
              className="ml-4 shrink-0 cursor-pointer"
            >
              <CloseIcon className="h-3 w-3 text-[#0F172A]" />
            </button>
          </div>
        )}
        {/* 시험문제리스트 */}
        <div className="mt-15">
          {quizData.questions.map((question) => (
            <QuestionItem key={question.question_id} question={question} />
          ))}
        </div>
      </section>
      {/* 제출하기 */}
      <div className="mt-50 mb-25 flex justify-center">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="text-primary-100 border-primary-600 w-auto rounded-[4px] bg-[#721AE3] px-7 py-6.25"
        >
          제출하기
        </Button>
      </div>
      {/* 부정행위 모달 */}
      <CheatingModal
        isOpen={isCheatingModalOpen}
        cheatingCount={cheatingCount}
        message={cheatingMessage}
        onClose={handleCheatingModalClose}
        onConfirm={handleCheatingModalConfirm}
      />
    </>
  )
}

export default QuizPage
