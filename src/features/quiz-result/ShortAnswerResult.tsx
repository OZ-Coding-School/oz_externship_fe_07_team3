import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type ShortAnswerResultProps = {
  question: ResultQuestion
}

function ShortAnswerResult({ question }: ShortAnswerResultProps) {
  const answer =
    question.submitted_answer && question.submitted_answer.length > 0
      ? question.submitted_answer.join(', ')
      : '미응답'

  return (
    <div className="mt-4">
      <div className="rounded-[4px] bg-gray-100 px-6 py-5">
        <p
          className={cn(
            'text-lg leading-[140%] font-medium tracking-[-0.03em]',
            question.is_correct ? 'text-other-green' : 'text-other-red'
          )}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}

export default ShortAnswerResult
