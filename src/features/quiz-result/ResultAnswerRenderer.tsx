import type { ResultQuestion } from '@/types/result-type/answer'
import FillBlankResult from './FillBlankResult'
import MultipleChoiceResult from './MultipleChoiceResult'
import OrderingResult from './OrderingResult'
import OXResult from './OXResult'
import ShortAnswerResult from './ShortAnswerResult'
import SingleChoiceResult from './SingleChoiceResult'

type ResultAnswerRendererProps = {
  question: ResultQuestion
}

function ResultAnswerRenderer({ question }: ResultAnswerRendererProps) {
  switch (question.type) {
    case 'single_choice':
      return <SingleChoiceResult question={question} />

    case 'multiple_choice':
      return <MultipleChoiceResult question={question} />

    case 'short_answer':
      return <ShortAnswerResult question={question} />

    case 'ox':
      return <OXResult question={question} />

    case 'ordering':
      return <OrderingResult question={question} />

    case 'fill_blank':
      return <FillBlankResult question={question} />

    default:
      return null
  }
}

export default ResultAnswerRenderer
