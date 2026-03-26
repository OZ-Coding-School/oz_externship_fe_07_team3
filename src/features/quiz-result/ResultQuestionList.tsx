import type { ResultQuestion } from '@/types/result-type/answer'
import ResultQuestionItem from './ResultQuestionItem'

type ResultQuestionListProps = {
  questions: ResultQuestion[]
}

function ResultQuestionList({ questions }: ResultQuestionListProps) {
  return (
    <section className="flex flex-col gap-6">
      {questions.map((question, index) => (
        <ResultQuestionItem
          key={question.id}
          question={question}
          number={index + 1}
        />
      ))}
    </section>
  )
}

export default ResultQuestionList
