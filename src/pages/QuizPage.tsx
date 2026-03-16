import AlertIcon from '@/assets/icons/quiz/alert-circle.png'
import CloseIcon from '@/assets/icons/quiz/icon-x-gray.svg?react'
import { useEffect, useState } from 'react'
import { getExamQuestions } from '@/api/exam'
import type { QuizData } from '@/types/quizpage-type/question'
import QuizHeader from '@/components/layout/quiz/QuizHeader'
import { QuestionItem } from '@/features/quiz'
import Button from '@/components/ui/button'

function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(true)

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getExamQuestions(1)
        setQuizData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchQuizData()
  }, [])

  if (!quizData) return <div>로딩중...</div>

  return (
    <>
      {/* 헤더 */}
      <QuizHeader
        variant="inProgress"
        title="TypeScript 쪽지시험"
        subText="집중해서 천천히, 끝까지 응시해 주세요. 응원할게요💪"
        timeText="29:17 뒤에 끝나요"
        misconductCount={0}
      />
      {/* 경고 */}
      <section className="px-90">
        {isWarningVisible && (
          <div className="bg-primary-100 mt-8 flex w-full items-start justify-between rounded-[8px] px-5 py-6">
            <div className="flex gap-3">
              <img className="h-6 w-6 shrink-0" src={AlertIcon} alt="" />
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
        {/* 문제리스트 */}
        <div className="mt-15">
          {quizData.questions.map((question) => (
            <QuestionItem key={question.question_id} question={question} />
          ))}
        </div>
      </section>
      {/* 제출버튼 */}
      <div className="mt-10 mb-25 flex justify-center">
        <Button className="text-primary-100 border-primary-600 w-auto rounded-[4px] bg-[#721AE3] px-7 py-6.25">
          제출하기
        </Button>
      </div>
    </>
  )
}

export default QuizPage
