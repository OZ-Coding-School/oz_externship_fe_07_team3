import type { QuizQuestion } from '@/types/quizpage-type/question'
import QuestionRenderer from './QuestionRenderer'
import { QUESTION_TYPE_LABEL } from '@/constants/quiz'

type QuestionItemProps = {
  question: QuizQuestion
}

function QuestionItem({ question }: QuestionItemProps) {
  return (
    <>
      <div className="flex items-center">
        <h2 className="text-ui-gray-primary text-xl leading-[140%] font-bold tracking-[-0.03em]">
          <span className="absolute"> {question.number}.</span>{' '}
          <span className="ml-8">{question.question}</span>
        </h2>
        <div className="ml-4 flex gap-2">
          <p className="text-ui-gray-primary flex items-center justify-center rounded-[2px] bg-gray-200 px-3 py-1 text-[12px] leading-[140%] font-normal tracking-[-0.03em]">
            {question.point}점
          </p>
          <p className="text-ui-gray-primary flex items-center justify-center rounded-[2px] bg-gray-200 px-3 py-1 text-[12px] leading-[140%] font-normal tracking-[-0.03em]">
            {QUESTION_TYPE_LABEL[question.type]}
          </p>
        </div>
      </div>
      <div className="mb-[100px] ml-8">
        <QuestionRenderer question={question} />
      </div>
    </>
  )
}
export default QuestionItem
