// src/components/ui/modal/TestModal.tsx

import { useState } from 'react'
import Modal from '@/components/ui/modal/Modal'
import Popup from '@/components/ui/modal/Popup'
import Button from '@/components/ui/button'
import RecoveryIconSvg from '@/assets/icons/RecoveryIcon.svg?react'

export default function TestModal() {
  const [modalType, setModalType] = useState<
    'recover' | 'delete' | 'question' | null
  >(null)

  const handleClose = () => setModalType(null)

  return (
    <div className="flex gap-4">
      <button
        onClick={() => setModalType('recover')}
        className="rounded border p-2"
      >
        계정복구
      </button>
      <button
        onClick={() => setModalType('delete')}
        className="rounded border p-2"
      >
        삭제확인
      </button>
      <button
        onClick={() => setModalType('question')}
        className="rounded border p-2"
      >
        질문팝업
      </button>

      {/* 1. 계정복구 - Modal (X버튼 있음, 배경 클릭 닫기 X) */}
      <Modal
        isOpen={modalType === 'recover'}
        onClose={handleClose}
        width="w-[396px]"
      >
        <div className="flex flex-col gap-[40px] px-[24px] pb-[24px]">
          <div className="flex flex-col items-center gap-[16px] text-center">
            <RecoveryIconSvg className="h-[40px] w-[40px]" />
            <h2 className="text-ui-gray-primary text-[20px] leading-[1.4] font-bold tracking-[-0.03em]">
              해당 계정은 탈퇴된 상태예요
            </h2>
            <p className="text-ui-gray-600 text-[14px] leading-[1.4] font-normal tracking-[-0.03em]">
              2025년 6월 20일 이후, 계정 정보는 완전히 삭제돼요.
              <br />
              계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
            </p>
          </div>
          <Button variant="fill" size="full" onClick={handleClose}>
            계정 다시 사용하기
          </Button>
        </div>
      </Modal>

      {/* 2. 삭제확인 - Popup (X버튼 없음, 배경 클릭 닫기 O) */}
      <Popup
        isOpen={modalType === 'delete'}
        onClose={handleClose}
        width="w-[428px]"
      >
        <div className="flex flex-col gap-[40px] p-[28px]">
          <p className="text-ui-gray-600 text-[16px] leading-[1.4] font-normal tracking-[-0.03em]">
            삭제된 내용은 복구할 수 없습니다.
            <br />
            게시글을 정말로 삭제하시겠습니까?
          </p>
          <div className="flex justify-end gap-[12px]">
            <Button
              variant="ghost"
              size="sm"
              className="!bg-primary-100 !text-primary-600 !h-[42px] !w-[76px] !rounded-full !px-[24px] !py-[16px]"
              onClick={handleClose}
            >
              취소
            </Button>
            <Button
              variant="fill"
              size="sm"
              className="!h-[40px] !w-[76px] !rounded-full !px-[24px] !py-[16px]"
              onClick={handleClose}
            >
              삭제
            </Button>
          </div>
        </div>
      </Popup>

      {/* 3. 질문입력 - Popup (X버튼 없음, 배경 클릭 닫기 O) */}
      <Popup
        isOpen={modalType === 'question'}
        onClose={handleClose}
        width="w-[428px]"
      >
        <div className="flex flex-col gap-[10px] p-[28px]">
          <textarea
            className="text-ui-gray-primary placeholder:text-ui-gray-primary rows={3} w-full resize-none bg-transparent text-[16px] leading-[1.4] font-normal tracking-[-0.03em] outline-none"
            placeholder="질문 내용을 입력해 주세요."
          />
          <div className="flex justify-end">
            <Button
              variant="fill"
              size="sm"
              className="!h-[42px] !w-[76px] !rounded-full !px-[24px] !py-[20px] !font-semibold"
              onClick={handleClose}
            >
              확인
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  )
}
