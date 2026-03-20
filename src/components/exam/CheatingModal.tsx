import WarningHandRed from '@/assets/icons/quiz/warning-hand-red.png'
import WarnigHandYellow from '@/assets/icons/quiz/warning-hand-yellow.png'
import Button from '../ui/button'
import Modal from '../ui/modal/Modal'

type CheatingModalProps = {
  isOpen: boolean
  cheatingCount: number
  message: readonly string[]
  onClose: () => void
  onConfirm: () => void
}

function CheatingModal({
  isOpen,
  cheatingCount,
  message,
  onClose,
  onConfirm,
}: CheatingModalProps) {
  const isTerminated = cheatingCount >= 3
  const warningImage = isTerminated ? WarningHandRed : WarnigHandYellow
  const confirmButtonText = isTerminated ? '시험종료' : '확인'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonWrapperClassName="pt-6 mb-2.5"
    >
      <div className="mx-6 mb-6 flex flex-col items-center justify-center text-center">
        <img src={warningImage} alt="손경고이미지" className="mb-4" />

        <h2 className="mb-4 p-0 text-[18px] font-semibold">
          부정행위 <span>{cheatingCount}회</span> 감지
        </h2>

        <div>
          {message.map((line) => (
            <p key={line} className="m-0">
              {line}
            </p>
          ))}
        </div>

        <Button type="button" onClick={onConfirm} className="mt-5 w-full">
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  )
}

export default CheatingModal
