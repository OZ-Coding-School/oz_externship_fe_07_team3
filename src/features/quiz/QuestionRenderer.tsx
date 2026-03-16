import type { QuizQuestion } from '@/types/quizpage-type/question'
import {
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  OXQuestion,
  ShortAnswerQuestion,
  OrderingQuestion,
  FillBlankQuestion,
} from '@/features/quiz'

type QuestionRendererProps = {
  question: QuizQuestion
}

function QuestionRenderer({ question }: QuestionRendererProps) {
  switch (question.type) {
    case 'single_choice':
      return <SingleChoiceQuestion options={question.options} />

    case 'multiple_choice':
      return <MultipleChoiceQuestion options={question.options} />

    case 'ox':
      return <OXQuestion options={question.options} />

    case 'short_answer':
      return <ShortAnswerQuestion />

    case 'ordering':
      return <OrderingQuestion options={question.options} />

    case 'fill_blank':
      return (
        <FillBlankQuestion
          prompt={question.prompt}
          answerInput={question.answer_input}
        />
      )

    default:
      return null
  }
}

export default QuestionRenderer
