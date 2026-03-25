export type QuizQuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'OX'
  | 'SHORT_ANSWER'
  | 'ORDERING'
  | 'FILL_BLANK'

type BaseQuestion = {
  question_id: number
  number: number
  type: QuizQuestionType
  question: string
  point: number
}

export type SingleChoiceQuestion = BaseQuestion & {
  type: 'SINGLE_CHOICE'
  prompt: null
  blank_count: null
  options: string[]
  answer_input: null
}

export type MultipleChoiceQuestion = BaseQuestion & {
  type: 'MULTIPLE_CHOICE'
  prompt: null
  blank_count: null
  options: string[]
  answer_input: null
}

export type OxQuestion = BaseQuestion & {
  type: 'OX'
  prompt: null
  blank_count: null
  options: ['O', 'X'] | string[]
  answer_input: null
}

export type ShortAnswerQuestion = BaseQuestion & {
  type: 'SHORT_ANSWER'
  prompt: null
  blank_count: null
  options: null
  answer_input: null
}

export type OrderingQuestion = BaseQuestion & {
  type: 'ORDERING'
  prompt: null
  blank_count: null
  options: string[]
  answer_input: null
}

export type FillBlankQuestion = BaseQuestion & {
  type: 'FILL_BLANK'
  prompt: string
  blank_count: number
  options: null
  answer_input: string[]
}

export type QuizQuestion =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | OxQuestion
  | ShortAnswerQuestion
  | OrderingQuestion
  | FillBlankQuestion

export type QuizData = {
  exam_id: number
  exam_name: string
  duration_time: number
  elapsed_time: number
  cheating_count: number
  questions: QuizQuestion[]
}
