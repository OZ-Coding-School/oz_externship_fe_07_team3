export type QuizQuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'ox'
  | 'short_answer'
  | 'ordering'
  | 'fill_blank'

type BaseQuestion = {
  question_id: number
  number: number
  type: QuizQuestionType
  question: string
  point: number
}

export type SingleChoiceQuestion = BaseQuestion & {
  type: 'single_choice'
  prompt: null
  blank_count: null
  options: string[]
  answer_input: null
}

export type MultipleChoiceQuestion = BaseQuestion & {
  type: 'multiple_choice'
  prompt: null
  blank_count: null
  options: string[]
  answer_input: null
}

export type OxQuestion = BaseQuestion & {
  type: 'ox'
  prompt: null
  blank_count: null
  options: ['O', 'X'] | string[]
  answer_input: null
}

export type ShortAnswerQuestion = BaseQuestion & {
  type: 'short_answer'
  prompt: null
  blank_count: null
  options: null
  answer_input: null
}

export type OrderingQuestion = BaseQuestion & {
  type: 'ordering'
  prompt: null
  blank_count: null
  options: string[]
  answer_input: null
}

export type FillBlankQuestion = BaseQuestion & {
  type: 'fill_blank'
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
