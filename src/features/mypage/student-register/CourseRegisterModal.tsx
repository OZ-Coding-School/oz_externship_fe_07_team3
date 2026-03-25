import check from '../../../assets/icons/check.svg'
import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'
import type { SelectedCourseRegisterValue } from '@/types/api-response/course'
import CourseRegisterFields from './CourseRegisterFields'
import { cn } from '@/lib/utils'
import { usePostEnrollStudent } from '@/api/queries/enrolled-student/usePostEnrollStudent'
import { toast } from 'sonner'

type CourseRegisterModalProps = {
  isOpen: boolean
  onClose: () => void
  value: SelectedCourseRegisterValue
  onChange: (value: SelectedCourseRegisterValue) => void
  onImageError?: () => void
}

/**
 * 수강생 등록 모달
 */
export default function CourseRegisterModal({
  isOpen,
  onClose,
  value,
  onChange,
  onImageError,
}: CourseRegisterModalProps) {
  const isSubmitDisabled = !value.courseId || !value.cohortId
  const { mutate, isPending } = usePostEnrollStudent()

  const handleSubmit = () => {
    if (!value.cohortId) {
      return
    }

    mutate(
      { cohort_id: value.cohortId },
      {
        onSuccess: (res) => {
          toast.success(res.detail)
          onClose()
        },
        onError: (err) => {
          const errorMsg =
            typeof err.error_detail === 'string'
              ? err.error_detail
              : '등록에 실패했습니다.'
          toast.error(errorMsg)
        },
      }
    )
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-99 p-6">
        <div className="mb-10 flex flex-col items-center justify-center gap-4 text-center">
          <div className="bg-primary-200 flex h-7 w-7 items-center justify-center rounded-full">
            <img
              src={check}
              alt="체크아이콘"
              className="h-4 w-4"
              onError={onImageError}
            />
          </div>

          <h2 className="text-ui-gray-primary text-xl font-bold">
            내 과정 선택하기
          </h2>

          <p className="text-ui-gray-400 text-sm font-normal">
            해당되는 과정과 기수를 선택해 주세요.
          </p>
        </div>

        <div className="mb-6 flex w-full">
          <CourseRegisterFields value={value} onChange={onChange} />
        </div>

        <Button
          type="button"
          variant="fill"
          size="full"
          className={cn(
            `h-13 rounded-lg p-2 text-base font-normal`,
            isSubmitDisabled ? 'cursor-not-allowed' : ''
          )}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          {isPending ? '등록중...' : '등록하기'}
        </Button>
      </div>
    </Modal>
  )
}
