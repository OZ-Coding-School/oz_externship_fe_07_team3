import { QUESTION_TYPE_LABEL } from '@/constants/exam/quiz'
import type { AnswerValue } from '@/types/answer-type/answer'
import type { QuizQuestion } from '@/types/quizpage-type/question'
import QuestionRenderer from './QuestionRenderer'

type QuestionItemProps = {
  question: QuizQuestion
  value: AnswerValue
  onChange: (answer: AnswerValue) => void
}

function QuestionItem({ question, value, onChange }: QuestionItemProps) {
  return (
    <>
      <div className="flex items-center whitespace-nowrap">
        <h2 className="text-ui-gray-primary text-xl font-bold">
          <span className="absolute">{question.number}.</span>
          <span className="ml-8">{question.question}</span>
        </h2>

        <div className="ml-4 flex gap-2">
          <p className="text-ui-gray-primary flex items-center justify-center rounded-[2px] bg-gray-200 px-3 py-1 text-[12px]">
            {question.point}점
          </p>
          <p className="text-ui-gray-primary flex items-center justify-center rounded-[2px] bg-gray-200 px-3 py-1 text-[12px]">
            {QUESTION_TYPE_LABEL[question.type]}
          </p>
        </div>
      </div>

      <div className="mb-[100px] ml-8">
        <QuestionRenderer
          question={question}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default QuestionItem
