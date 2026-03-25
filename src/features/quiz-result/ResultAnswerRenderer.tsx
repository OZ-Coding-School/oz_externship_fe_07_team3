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
    case 'SINGLE_CHOICE':
      return <SingleChoiceResult question={question} />

    case 'MULTIPLE_CHOICE':
      return <MultipleChoiceResult question={question} />

    case 'SHORT_ANSWER':
      return <ShortAnswerResult question={question} />

    case 'OX':
      return <OXResult question={question} />

    case 'ORDERING':
      return <OrderingResult question={question} />

    case 'FULL_BLANK':
      return <FillBlankResult question={question} />

    default:
      return null
  }
}

export default ResultAnswerRenderer
