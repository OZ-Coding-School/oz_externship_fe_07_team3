import SuccessIcon from '@/assets/icons/quiz/check-circle-green.png'
import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'

type ExamSubmitModalProps = {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

function ExamSubmitModal({ isOpen, onConfirm, onClose }: ExamSubmitModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mx-6 mb-6 flex flex-col items-center text-center">
        <img
          src={SuccessIcon}
          alt="시험 제출 아이콘"
          className="mb-6 h-16 w-16"
        />

        <strong className="text-lg font-semibold">
          시험 제출이 완료되었습니다
        </strong>

        <p className="mt-3 text-sm leading-[140%] text-gray-600">
          시험이 종료되었습니다.
          <br />
          시험 제출이 완료되었습니다!
          <br />
          정답 확인 페이지로 넘어갑니다.
        </p>

        <Button type="button" onClick={onConfirm} className="mt-6 w-full">
          확인
        </Button>
      </div>
    </Modal>
  )
}

export default ExamSubmitModal
