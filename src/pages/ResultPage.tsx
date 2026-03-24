import { getExamResult } from '@/api/exam'
import { getMyPageTab } from '@/constants/routesPaths'
import ResultBottomAction from '@/features/quiz-result/ResultBottomAction'
import ResultHeader from '@/features/quiz-result/ResultHeader'
import ResultQuestionList from '@/features/quiz-result/ResultQuestionList'
import type { ResultData } from '@/types/result-type/answer'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ResultPage() {
  const navigate = useNavigate()
  const { submissionId } = useParams()
  const numericSubmissionId = Number(submissionId)

  const [resultData, setResultData] = useState<ResultData | null>(null)

  useEffect(() => {
    if (!numericSubmissionId) {
      return
    }

    const fetchResult = async () => {
      const data = await getExamResult(numericSubmissionId)
      setResultData(data)
    }

    fetchResult()
  }, [numericSubmissionId])

  const handleBack = () => {
    navigate(getMyPageTab('exam'))
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 0)
  }

  if (!resultData) {
    return <div>불러오는 중...</div>
  }

  return (
    <div>
      <ResultHeader
        title={resultData.exam_name}
        questionCount={resultData.questions.length}
        cheatingCount={resultData.cheating_count}
        elapsedTime={resultData.elapsed_time}
        totalScore={resultData.total_score}
        onBack={handleBack}
      />
      <section>
        <div className="bg-primary-100 flex flex-col gap-1 px-90 py-7">
          <h2 className="text-[32px] font-bold">쪽지시험 응시결과</h2>
          <p className="text-grey-8">
            고생 많으셨어요😊 틀린 문제는 해설을 보며 꼭 복습해보세요. 앞으로의
            성장을 기대하겠습니다!
          </p>
        </div>
      </section>

      <div className="mt-[78px] px-90">
        <ResultQuestionList questions={resultData.questions} />
        <ResultBottomAction onConfirm={handleBack} />
      </div>
    </div>
  )
}

export default ResultPage
