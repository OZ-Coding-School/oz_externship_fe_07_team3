import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type FillBlankResultProps = {
  question: ResultQuestion
}

function FillBlankResult({ question }: FillBlankResultProps) {
  const prompt = question.prompt ?? ''
  const answerInputs = Array.isArray(question.correct_answer)
    ? question.correct_answer
    : []

  const userAnswers = Array.isArray(question.user_answer)
    ? question.user_answer
    : new Array(answerInputs.length).fill('')

  const correctAnswers = Array.isArray(question.correct_answer)
    ? question.correct_answer
    : []

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

          const isCorrect = userAnswer.trim() === correctAnswer.trim()

          return (
            <div
              key={index}
              className={
                'flex h-12 w-77 items-center rounded-[4px] bg-[#F2F3F5] px-4'
              }
            >
              <span
                className={cn(
                  'mr-3 text-xl font-bold',
                  isCorrect ? 'text-other-green' : 'text-other-red'
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>

              <input
                value={userAnswer}
                readOnly
                className={cn(
                  'w-full bg-transparent text-base outline-none',
                  isCorrect ? 'text-other-green' : 'text-other-red'
                )}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FillBlankResult
