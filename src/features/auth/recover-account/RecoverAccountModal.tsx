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
import { ROUTES_PATHS } from '@/constants/routesPaths'

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
    isPending,
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
    if (!isCompletePopupVisible) {
      return
    }

    const timer = window.setTimeout(() => {
      closeCompletePopup()
      onClose()
      navigate(ROUTES_PATHS.LOGIN_PAGE)
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [isCompletePopupVisible, closeCompletePopup, navigate, onClose])

  const handleRecoverStartButtonClick = () => {
    setStep('verify')
  }

  const renderInactiveContent = () => {
    return (
      <div className="flex flex-col gap-8 px-6 pb-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <RecoveryIconSvg className="h-7 w-7" />
          <div className="flex flex-col items-center gap-3">
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
      <div className="flex flex-col gap-10 px-6 pb-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <RecoveryVerifyIconSvg className="h-7 w-7" />
          <div className="flex flex-col items-center gap-3">
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
          onSendCode={() => void handleSendCode()}
          onVerifyCode={() => void handleVerifyCode()}
          isCodeSent={isCodeSent}
          isCodeVerified={isCodeVerified}
          errorMessage={errorMessage}
          formattedTime={formattedTime}
        />

        <Button
          variant="fill"
          size="full"
          onClick={() => void handleCompleteButtonClick()}
          disabled={isPending}
        >
          {isPending ? '처리 중...' : '확인'}
        </Button>
      </div>
    )
  }

  return (
    <>
      {isSendToastVisible && (
        <div className="border-ui-gray-200 bg-ui-gray-100 fixed top-4 left-1/2 z-1001 flex h-12 w-fit -translate-x-1/2 items-center gap-3 rounded-lg border px-4 py-3 whitespace-nowrap shadow-[4px_4px_4px_rgba(131,131,131,0.25)]">
          <CheckToastIconSvg className="h-6 w-6 shrink-0" />
          <span className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
            전송 완료! 이메일을 확인해주세요.
          </span>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        width="w-[396px]"
        dimmed={!isCompletePopupVisible}
      >
        {step === 'inactive' && renderInactiveContent()}
        {step === 'verify' && renderVerifyContent()}
      </Modal>

      <Popup
        isOpen={isOpen && isCompletePopupVisible}
        onClose={closeCompletePopup}
        width="w-[396px]"
      >
        <div className="flex flex-col items-center gap-2.5 p-6 text-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#14C786]">
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

          <div className="flex flex-col gap-3">
            <p className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              계정 복구 완료!
            </p>
            <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
              지금 바로 로그인해 보세요
            </p>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default RecoverAccountModal
