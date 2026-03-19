export type QuizHeaderVariant = 'inProgress' | 'result'

export type QuizHeaderProps = {
  variant: QuizHeaderVariant
  title: string
  subText?: string
  timeText?: string
  onBack?: () => void
  cheatingCount?: number
}
