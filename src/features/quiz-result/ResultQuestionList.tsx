import type { ResultQuestion } from '@/types/result-type/answer'
import ResultQuestionItem from './ResultQuestionItem'

type ResultQuestionListProps = {
  questions: ResultQuestion[]
}

function ResultQuestionList({ questions }: ResultQuestionListProps) {
  return (
    <section className="flex flex-col gap-6">
      {questions.map((question) => (
        <ResultQuestionItem key={question.question_id} question={question} />
      ))}
    </section>
  )
}

export default ResultQuestionList
