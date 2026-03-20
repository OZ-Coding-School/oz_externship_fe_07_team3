import {
  FillBlankQuestion,
  MultipleChoiceQuestion,
  OrderingQuestion,
  OXQuestion,
  ShortAnswerQuestion,
  SingleChoiceQuestion,
} from '@/features/quiz'
import type { AnswerValue } from '@/types/answer-type/answer'
import type { QuizQuestion } from '@/types/quizpage-type/question'

type QuestionRendererProps = {
  question: QuizQuestion
  value: AnswerValue
  onChange: (answer: AnswerValue) => void
}

function QuestionRenderer({
  question,
  value,
  onChange,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'single_choice':
      return (
        <SingleChoiceQuestion
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )

    case 'multiple_choice':
      return (
        <MultipleChoiceQuestion
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )

    case 'ox':
      return (
        <OXQuestion
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )

    case 'short_answer':
      return <ShortAnswerQuestion value={value} onChange={onChange} />

    case 'ordering':
      return (
        <OrderingQuestion
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )

    case 'fill_blank':
      return (
        <FillBlankQuestion
          prompt={question.prompt}
          answerInput={question.answer_input}
          value={value}
          onChange={onChange}
        />
      )

    default:
      return null
  }
}

export default QuestionRenderer
