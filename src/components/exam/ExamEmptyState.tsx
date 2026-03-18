import NotExamIcon from '@/assets/images/not-exam-icon.svg?react'
import EmptyState from '../common/EmptyState'

type ExamEmptyStateProps = {
  title: string
}

/**
 * ExamEmptyState
 * 쪽지시험 데이터가 없을 경우 사용되는 컴포넌트
 * 부모 컨테이너에서 높이 조절
 */
export default function ExamEmptyState({ title }: ExamEmptyStateProps) {
  return <EmptyState icon={<NotExamIcon />} title={title} />
}
