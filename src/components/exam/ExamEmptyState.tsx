import NotExamIcon from '@/assets/images/not-exam-icon.svg?react'
import EmptyState from '../common/EmptyState'

/**
 * ExamEmptyState
 * 응시 할 시험이 없을 경우 사용되는 컴포넌트
 * 부모 컨테이너에서 높이 조절
 */
export default function ExamEmptyState() {
  return (
    <EmptyState icon={<NotExamIcon />} title="아직 응시 할 시험이 없어요." />
  )
}
