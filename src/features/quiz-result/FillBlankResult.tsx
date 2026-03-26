import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type FillBlankResultProps = {
  question: ResultQuestion
}

function FillBlankResult({ question }: FillBlankResultProps) {
  const prompt = question.prompt ?? ''

  const correctAnswers = Array.isArray(question.answer) ? question.answer : []

  const userAnswers = Array.isArray(question.submitted_answer)
    ? question.submitted_answer
    : new Array(correctAnswers.length).fill('')

  const highlightedPrompt = prompt.split(/(\([A-Z]\)\s*_{2,})/g)

  return (
    <div>
      <div className="my-5 w-162 rounded-[4px] bg-gray-100 px-4 py-4">
        <p className="text-ui-gray-primary text-base leading-[160%] whitespace-pre-line">
          {highlightedPrompt.map((text, index) =>
            /\([A-Z]\)\s*_{2,}/.test(text) ? (
              <span key={index} className="font-bold">
                {text}
              </span>
            ) : (
              <span key={index}>{text}</span>
            )
          )}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {correctAnswers.map((correctAnswer, index) => {
          const userAnswer =
            typeof userAnswers[index] === 'string' ? userAnswers[index] : ''

          const isAnswered = userAnswer.trim().length > 0
          const isCorrect =
            isAnswered && userAnswer.trim() === correctAnswer.trim()

          return (
            <div
              key={index}
              className="flex h-12 w-77 items-center rounded-[4px] bg-[#F2F3F5] px-4"
            >
              <span
                className={cn('mr-3 text-xl font-bold', {
                  'text-other-green': isCorrect,
                  'text-other-red': isAnswered && !isCorrect,
                  'text-ui-gray-disabled': !isAnswered,
                })}
              >
                {String.fromCharCode(65 + index)}
              </span>

              <input
                value={userAnswer}
                readOnly
                className={cn('w-full bg-transparent text-base outline-none', {
                  'text-other-green': isCorrect,
                  'text-other-red': isAnswered && !isCorrect,
                  'text-ui-gray-disabled': !isAnswered,
                })}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FillBlankResult
