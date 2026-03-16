import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import RecoveryIconSvg from '@/assets/icons/RecoveryIcon.svg?react'
import RecoveryVerifyIconSvg from '@/assets/icons/RecoveryVerifyIcon.svg?react'
import CheckToastIconSvg from '@/assets/icons/checkToast.svg?react'
import CodeVerification from '@/components/common/CodeVerification'
import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'
import Popup from '@/components/ui/modal/Popup'
import { useRecoverAccountVerification } from '@/features/auth/recover-account/useRecoverAccountVerification'

type RecoverStep = 'inactive' | 'verify'

type RecoverAccountModalProps = {
  isOpen: boolean
  onClose: () => void
}

const RecoverAccountModal = ({ isOpen, onClose }: RecoverAccountModalProps) => {
  const navigate = useNavigate()
  const [step, setStep] = useState<RecoverStep>('inactive')

  const {
    email,
    code,
    isCodeSent,
    isCodeVerified,
    errorMessage,
    isSendToastVisible,
    isCompletePopupVisible,
    formattedTime,
    handleEmailChange,
    handleCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleCompleteButtonClick,
    closeCompletePopup,
  } = useRecoverAccountVerification({ isOpen })

  useEffect(() => {
    if (!isOpen) {
      setStep('inactive')
    }
  }, [isOpen])

  useEffect(() => {
    if (!isCompletePopupVisible) return

    const timer = window.setTimeout(() => {
      closeCompletePopup()
      onClose()
      navigate('/login')
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [isCompletePopupVisible, closeCompletePopup, navigate, onClose])

  const handleRecoverStartButtonClick = () => {
    setStep('verify')
  }

  const renderInactiveContent = () => {
    return (
      <div className="flex flex-col gap-[32px] px-[24px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <RecoveryIconSvg className="h-[28px] w-[28px]" />
          <div className="flex flex-col items-center gap-[12px]">
            <h2 className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              해당 계정은 탈퇴된 상태예요
            </h2>
            <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
              2025년 6월 20일 이후, 계정 정보는 완전히 삭제돼요.
              <br />
              계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
            </p>
          </div>
        </div>

        <Button
          variant="fill"
          size="full"
          onClick={handleRecoverStartButtonClick}
        >
          계정 다시 사용하기
        </Button>
      </div>
    )
  }

  const renderVerifyContent = () => {
    return (
      <div className="flex flex-col gap-[40px] px-[24px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <RecoveryVerifyIconSvg className="h-[28px] w-[28px]" />
          <div className="flex flex-col items-center gap-[12px]">
            <h2 className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              계정 다시 사용하기
            </h2>
            <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
              입력하신 이메일로 인증번호를 보내드릴게요.
            </p>
          </div>
        </div>

        <CodeVerification
          label="이메일"
          required
          targetInputId="recover-account-email"
          targetValue={email}
          onTargetChange={handleEmailChange}
          targetPlaceholder="가입한 이메일을 입력해 주세요."
          targetInputType="email"
          verificationCodeInputId="recover-account-code"
          verificationCode={code}
          onVerificationCodeChange={handleCodeChange}
          verificationCodePlaceholder="인증번호 6자리를 입력해주세요"
          onSendCode={handleSendCode}
          onVerifyCode={handleVerifyCode}
          isCodeSent={isCodeSent}
          isCodeVerified={isCodeVerified}
          errorMessage={errorMessage}
          formattedTime={formattedTime}
        />

        <Button variant="fill" size="full" onClick={handleCompleteButtonClick}>
          확인
        </Button>
      </div>
    )
  }

  return (
    <>
      {isSendToastVisible && (
        <div className="border-ui-gray-200 bg-ui-gray-100 fixed top-4 left-1/2 z-[1001] flex h-[48px] w-fit -translate-x-1/2 items-center gap-[12px] rounded-[4px] border px-[16px] py-[12px] whitespace-nowrap shadow-[4px_4px_4px_rgba(131,131,131,0.25)]">
          <CheckToastIconSvg className="h-[24px] w-[24px] shrink-0" />
          <span className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
            전송 완료! 이메일을 확인해주세요.
          </span>
        </div>
      )}

      <Popup
        isOpen={isOpen && isCompletePopupVisible}
        onClose={closeCompletePopup}
        width="w-[396px]"
        isNested
      >
        <div className="flex flex-col items-center gap-[10px] p-[24px] text-center">
          <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#14C786]">
            <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
              <path
                d="M1.5 4.5L5 8L11.5 1"
                stroke="#FAFAFA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-[12px]">
            <p className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              계정 복구 완료!
            </p>
            <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
              지금 바로 로그인해 보세요
            </p>
          </div>
        </div>
      </Popup>

      <Modal isOpen={isOpen} onClose={onClose} width="w-[396px]">
        {!isCompletePopupVisible &&
          step === 'inactive' &&
          renderInactiveContent()}
        {!isCompletePopupVisible && step === 'verify' && renderVerifyContent()}
      </Modal>
    </>
  )
}

export default RecoverAccountModal
