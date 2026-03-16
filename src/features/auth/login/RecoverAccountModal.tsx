import { useEffect, useState, type ChangeEvent } from 'react'

import RecoveryIconSvg from '@/assets/icons/RecoveryIcon.svg?react'
import RecoveryVerifyIconSvg from '@/assets/icons/RecoveryVerifyIcon.svg?react'
import CheckToastIconSvg from '@/assets/icons/checkToast.svg?react'
import CodeVerification from '@/components/common/CodeVerification'
import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'
import Popup from '@/components/ui/modal/Popup'

type RecoverStep = 'inactive' | 'verify'

type RecoverAccountModalProps = {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_TIMER = 300

// TODO: API 연동 시 제거
const MOCK_VERIFY_CODE = '123456'

const RecoverAccountModal = ({ isOpen, onClose }: RecoverAccountModalProps) => {
  const [step, setStep] = useState<RecoverStep>('inactive')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [codeErrorMessage, setCodeErrorMessage] = useState('')
  const [isSendMessageVisible, setIsSendMessageVisible] = useState(false)
  const [isCompletePopupVisible, setIsCompletePopupVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIMER)

  useEffect(() => {
    if (!isOpen) {
      setStep('inactive')
      setEmail('')
      setCode('')
      setIsCodeSent(false)
      setIsCodeVerified(false)
      setCodeErrorMessage('')
      setIsSendMessageVisible(false)
      setIsCompletePopupVisible(false)
      setTimeLeft(INITIAL_TIMER)
    }
  }, [isOpen])

  useEffect(() => {
    if (
      !isOpen ||
      step !== 'verify' ||
      !isCodeSent ||
      isCodeVerified ||
      timeLeft <= 0
    ) {
      return
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [isOpen, step, isCodeSent, isCodeVerified, timeLeft])

  useEffect(() => {
    if (!isSendMessageVisible) {
      return
    }

    const timer = window.setTimeout(() => {
      setIsSendMessageVisible(false)
    }, 2500)

    return () => window.clearTimeout(timer)
  }, [isSendMessageVisible])

  const handleRecoverStartBtnClick = () => {
    setStep('verify')
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)

    if (codeErrorMessage) {
      setCodeErrorMessage('')
    }

    if (isCodeVerified) {
      setIsCodeVerified(false)
    }
  }

  const handleSendCodeBtnClick = () => {
    if (!email.trim()) {
      return
    }

    setIsCodeSent(true)
    setIsCodeVerified(false)
    setCodeErrorMessage('')
    setCode('')
    setTimeLeft(INITIAL_TIMER)
    setIsSendMessageVisible(true)
  }

  const handleVerifyCodeBtnClick = () => {
    if (!isCodeSent) {
      setCodeErrorMessage('인증코드를 먼저 전송해주세요.')
      setIsCodeVerified(false)
      return
    }

    if (!code.trim()) {
      setCodeErrorMessage('인증코드를 입력해주세요.')
      setIsCodeVerified(false)
      return
    }

    if (timeLeft <= 0) {
      setCodeErrorMessage('인증 시간이 만료되었습니다. 다시 전송해주세요.')
      setIsCodeVerified(false)
      return
    }

    // TODO: API 연동 시 아래 mock 로직 제거
    if (code.trim() !== MOCK_VERIFY_CODE) {
      setCodeErrorMessage('인증코드가 일치하지 않습니다.')
      setIsCodeVerified(false)
      return
    }

    setCodeErrorMessage('')
    setIsCodeVerified(true)
  }

  const handleCompleteBtnClick = () => {
    if (!isCodeSent) {
      setCodeErrorMessage('인증코드를 먼저 전송해주세요.')
      return
    }

    if (!code.trim()) {
      setCodeErrorMessage('인증코드를 입력해주세요.')
      return
    }

    if (timeLeft <= 0) {
      setCodeErrorMessage('인증 시간이 만료되었습니다. 다시 전송해주세요.')
      return
    }

    if (!isCodeVerified) {
      setCodeErrorMessage('인증코드 확인을 완료해주세요.')
      return
    }

    setCodeErrorMessage('')
    setIsCompletePopupVisible(true)
  }

  const handleCompletePopupClose = () => {
    setIsCompletePopupVisible(false)
    onClose()
  }

  const renderSendSuccessMessage = () => {
    if (!isOpen || step !== 'verify' || !isSendMessageVisible) {
      return null
    }

    return (
      <div className="border-ui-gray-200 bg-ui-gray-100 fixed top-4 left-1/2 z-[1001] flex h-[48px] w-fit -translate-x-1/2 items-center gap-[12px] rounded-[4px] border px-[16px] py-[12px] whitespace-nowrap shadow-[4px_4px_4px_rgba(131,131,131,0.25)]">
        <CheckToastIconSvg className="h-[24px] w-[24px] shrink-0" />
        <span className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
          전송 완료! 이메일을 확인해주세요.
        </span>
      </div>
    )
  }

  const renderCompletePopup = () => {
    return (
      <Popup
        isOpen={isOpen && isCompletePopupVisible}
        onClose={handleCompletePopupClose}
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
    )
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

        <Button variant="fill" size="full" onClick={handleRecoverStartBtnClick}>
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
          onSendCode={handleSendCodeBtnClick}
          onVerifyCode={handleVerifyCodeBtnClick}
          isCodeSent={isCodeSent}
          isCodeVerified={isCodeVerified}
          errorMessage={codeErrorMessage}
          timeLeft={timeLeft}
        />

        <Button variant="fill" size="full" onClick={handleCompleteBtnClick}>
          확인
        </Button>
      </div>
    )
  }

  return (
    <>
      {renderSendSuccessMessage()}
      {renderCompletePopup()}

      <Modal isOpen={isOpen} onClose={onClose} width="w-[396px]">
        {step === 'inactive' &&
          !isCompletePopupVisible &&
          renderInactiveContent()}
        {step === 'verify' && !isCompletePopupVisible && renderVerifyContent()}
      </Modal>
    </>
  )
}

export default RecoverAccountModal
