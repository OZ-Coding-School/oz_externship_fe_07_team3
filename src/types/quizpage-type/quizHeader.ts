// components/quiz/types.ts
export type QuizHeaderVariant = 'inProgress' | 'result'

export type QuizHeaderProps = {
  variant: 'default' | 'inProgress'
  title: string
  subText?: string
  timeText?: string
  onBack?: () => void
  cheatingCount?: number
}
