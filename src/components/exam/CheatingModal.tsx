import WarnigHandYellow from '@/assets/icons/quiz/warning-hand-yellow.png'
import Button from '../ui/button'
import Modal from '../ui/modal/Modal'

type CheatingModalProps = {
  isOpen: boolean
  message: string
  onClose: () => void
  onConfirm: () => void
}

function CheatingModal({
  isOpen,
  message,
  onClose,
  onConfirm,
}: CheatingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonWrapperClassName="pt-6 mb-2.5"
    >
      <div className="mx-6 mb-6 flex flex-col items-center justify-center border">
        <img src={WarnigHandYellow} alt="" />
        <div>
          부정행위<span></span>회
        </div>
        <div>{message}</div>
        <Button type="button" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </Modal>
  )
}

export default CheatingModal
