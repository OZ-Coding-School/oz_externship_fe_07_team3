import type { AnswerValue } from '@/types/answer-type/answer'

type FillBlankQuestionProps = {
  prompt: string
  blankCount: number | null
  value: AnswerValue
  onChange: (answer: AnswerValue) => void
}

function FillBlankQuestion({
  prompt,
  blankCount,
  value,
  onChange,
}: FillBlankQuestionProps) {
  const highlightedPrompt = (prompt ?? '').split(/(\([A-Z]\)\s*_{2,})/g)
  const inputCount = blankCount ?? 0

  const answers = Array.isArray(value) ? value : new Array(inputCount).fill('')

  const handleChangeBlank = (targetIndex: number, inputValue: string) => {
    const nextAnswers = [...answers]
    nextAnswers[targetIndex] = inputValue
    onChange(nextAnswers)
  }

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
        {Array.from({ length: inputCount }).map((_, index) => (
          <div
            key={index}
            className="flex h-12 w-162 items-center rounded-[4px] bg-gray-100 px-4"
          >
            <span className="text-ui-gray-primary mr-3 text-xl font-bold">
              {String.fromCharCode(65 + index)}
            </span>
            <input
              value={answers[index] ?? ''}
              onChange={(event) => {
                handleChangeBlank(index, event.target.value)
              }}
              placeholder="정답을 입력해 주세요."
              className="placeholder:text-ui-gray-tertiary text-ui-gray-primary w-full bg-transparent text-base outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FillBlankQuestion
