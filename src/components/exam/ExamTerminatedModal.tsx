import WarningCircleImg from '@/assets/icons/quiz/warning-circle-red.png'
import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'
type ExamTerminatedModalProps = {
  isOpen: boolean
  onConfirm: () => void
}

function ExamTerminatedModal({ isOpen, onConfirm }: ExamTerminatedModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onConfirm}>
      <div className="mx-6 mb-6 flex flex-col items-center text-center">
        <img
          src={WarningCircleImg}
          alt="시험 종료 경고 아이콘"
          className="mb-2"
        />

        <strong className="text-lg font-semibold">
          관리자에 의해 시험이 <span className="text-other-red">종료 </span>
          되었습니다
        </strong>

        <p className="mt-3 text-sm leading-[140%] text-gray-600">
          관리자에 의해 즉시 시험이 비정상 종료되었습니다.
          <br />
          진행 중이던 답안은 저장되지 않으며 결과에 반영되지 않습니다.
          <br />
          확인 시 시험 리스트 페이지로 이동합니다.
        </p>

        <Button
          type="button"
          onClick={onConfirm}
          className="mt-8 w-full rounded-[4px] px-7 py-6.25"
        >
          확인
        </Button>
      </div>
    </Modal>
  )
}

export default ExamTerminatedModal
