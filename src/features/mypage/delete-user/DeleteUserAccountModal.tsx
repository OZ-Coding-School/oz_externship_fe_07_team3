import { useEffect, useState } from 'react'

import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'
import type { DeleteMyAccountRequest, DeleteUserReason } from '@/types'
import Textarea from '@/components/ui/textarea'
import DeleteReasonDropdown from './DeleteReasonDropdown'

type DeleteUserAccountModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: DeleteMyAccountRequest) => void
  isPending?: boolean
}

/**
 * 회원 탈퇴 모달
 */
export default function DeleteUserAccountModal({
  isOpen,
  onClose,
  onSubmit,
  isPending = false,
}: DeleteUserAccountModalProps) {
  const [selectedReason, setSelectedReason] = useState<DeleteUserReason | null>(
    null
  )
  const [reasonDetail, setReasonDetail] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setSelectedReason(null)
      setReasonDetail('')
    }
  }, [isOpen])

  const isReasonSelected = Boolean(selectedReason)
  const isSubmitDisabled = !isReasonSelected || isPending

  const handleSubmit = () => {
    if (!selectedReason) {
      return
    }

    onSubmit({
      reason: selectedReason,
      reason_detail: reasonDetail.trim(),
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="w-[646px]">
      <div className="w-161.5 rounded-2xl bg-white p-6">
        <div className="text-ui-gray-primary mb-10 text-xl font-bold">
          오즈코딩스쿨을 탈퇴하시는 이유는 무엇인가요?
        </div>

        <p className="text-ui-gray-disabled mb-8 text-base font-normal">
          계정을 삭제하시면 회원님의 모든 콘텐츠와 활동 기록, 수강 기간 / 포인트
          / 쿠폰 내역이 사라지며 환불되지 않습니다. 삭제된 정보는 복구할 수
          없습니다.
        </p>

        <div className="mb-10">
          <DeleteReasonDropdown
            value={selectedReason}
            onChange={setSelectedReason}
          />
        </div>

        <div className="mb-10">
          <p className="text-ui-gray-primary mb-4 text-base font-normal">
            서비스를 이용하시면서 불편했던 점이나 보완할 수 있는 방안을
            알려주시면, 서비스 개선에 적극적으로 반영하겠습니다. 감사합니다!
          </p>

          <Textarea
            value={reasonDetail}
            onChange={(e) => setReasonDetail(e.target.value)}
            placeholder={
              isReasonSelected
                ? '소중한 의견을 반영해 더 좋은 서비스를 위해 노력하겠습니다.'
                : '탈퇴 사유를 먼저 선택해 주세요.'
            }
            variant="feedback"
            size="md"
            className="w-full disabled:cursor-not-allowed"
            maxLength={200}
            disabled={!isReasonSelected}
          />
        </div>

        <div className="mb-4 flex justify-center">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            variant="outline"
            size="md"
            className="disabled:cursor-not-allowed"
          >
            회원 탈퇴하기
          </Button>
        </div>
      </div>
    </Modal>
  )
}
