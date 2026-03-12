import { getExamQuestions, type QuizData } from '@/api/exam'
import { useEffect, useState } from 'react'

function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getExamQuestions(21)
        setQuizData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchQuizData()
  }, [])

  if (!quizData) return <div>로딩중...</div>

  return (
    <div>
      <h1>{quizData.exam_name}</h1>
      <p>제한 시간: {quizData.duration_time}분</p>

      {quizData.questions.map((question) => (
        <div key={question.question_id}>
          <h2>
            {question.number}. {question.question}
          </h2>
          <p>배점: {question.point}점</p>

          {question.options && (
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default QuizPage
