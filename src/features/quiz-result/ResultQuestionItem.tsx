import OIcon from '@/assets/icons/quiz/icon-o-gray.svg?react'
import XIcon from '@/assets/icons/quiz/icon-X-gray.svg?react'
import { QUESTION_TYPE_LABEL } from '@/constants/exam/quiz'
import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'
import ResultAnswerRenderer from './ResultAnswerRenderer'
type ResultQuestionItemProps = {
  question: ResultQuestion
}

function ResultQuestionItem({ question }: ResultQuestionItemProps) {
  return (
    <article className="">
      <div className="flex items-center">
        <h2 className="text-ui-gray-primary text-xl leading-[140%] font-bold tracking-[-0.03em]">
          <span className="absolute">{question.number}.</span>
          <span className="ml-8">{question.question}</span>
        </h2>
        <div className="ml-4 flex gap-2">
          <p className="text-ui-gray-primary flex items-center justify-center rounded-[2px] bg-gray-200 px-3 py-1 text-[12px] whitespace-nowrap">
            {question.point}점
          </p>
          <p className="text-ui-gray-primary flex items-center justify-center rounded-[2px] bg-gray-200 px-3 py-1 text-[12px] whitespace-nowrap">
            {QUESTION_TYPE_LABEL[question.type]}
          </p>
        </div>
      </div>
      <div className="mb-[100px] ml-8">
        <ResultAnswerRenderer question={question} />

        <div
          className={cn(
            'mt-6 flex items-center gap-3 rounded-[8px] px-5 py-6 text-sm',
            question.is_correct ? 'bg-[#A1E9CF4D]' : 'bg-[#FCE5E8]'
          )}
        >
          {question.is_correct ? (
            <OIcon className="text-other-green" />
          ) : (
            <XIcon className="text-other-red" />
          )}
          {question.explanation}
        </div>
      </div>
    </article>
  )
}

export default ResultQuestionItem
