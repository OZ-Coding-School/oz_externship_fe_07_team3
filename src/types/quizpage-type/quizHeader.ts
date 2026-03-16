// components/quiz/types.ts
export type QuizHeaderVariant = 'inProgress' | 'result'

export type QuizHeaderProps = {
  variant: QuizHeaderVariant
  title: string
  subText?: string
  timeText?: string
  misconductCount?: number
  onBack?: () => void
  onMisconductClick?: () => void
}
