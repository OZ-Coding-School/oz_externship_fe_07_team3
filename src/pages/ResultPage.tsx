import { getMyPageTab } from '@/constants/routesPaths'
import ResultBottomAction from '@/features/quiz-result/ResultBottomAction'
import QuizResultHeader from '@/features/quiz-result/ResultHeader'
import ResultQuestionList from '@/features/quiz-result/ResultQuestionList'
import { mockQuizResultData } from '@/mocks/data/mockQuizResultData'
import { useNavigate } from 'react-router-dom'

function ResultPage() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(getMyPageTab('exam'))
  }

  const handleSubmit = () => {
    return
  }

  return (
    <div>
      <QuizResultHeader
        title={mockQuizResultData.exam_name}
        metaText={`총 문항 수: ${mockQuizResultData.questions.length}`}
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
        <ResultQuestionList questions={mockQuizResultData.questions} />
        <ResultBottomAction onConfirm={handleSubmit} />
      </div>
    </div>
  )
}

export default ResultPage
