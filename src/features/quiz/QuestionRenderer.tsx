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
    case 'SINGLE_CHOICE':
      return (
        <SingleChoiceQuestion
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )

    case 'MULTIPLE_CHOICE':
      return (
        <MultipleChoiceQuestion
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )

    case 'OX':
      return (
        <OXQuestion
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )

    case 'SHORT_ANSWER':
      return <ShortAnswerQuestion value={value} onChange={onChange} />

    case 'ORDERING':
      return (
        <OrderingQuestion
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )

    case 'FILL_BLANK':
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
