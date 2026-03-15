import { useEffect, useState, type ChangeEvent } from 'react'

import RecoveryIconSvg from '@/assets/icons/RecoveryIcon.svg?react'
import RecoveryVerifyIconSvg from '@/assets/icons/RecoveryVerifyIcon.svg?react'
import CheckToastIconSvg from '@/assets/icons/checkToast.svg?react'
import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'
import Popup from '@/components/ui/modal/Popup'

type RecoverStep = 'inactive' | 'verify'

type RecoverAccountModalProps = {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_TIMER = 300

const formatTime = (seconds: number) => {
  const minute = Math.floor(seconds / 60)
  const second = seconds % 60

  return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}

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

  const hasCodeError = Boolean(codeErrorMessage)

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
    if (!isOpen || step !== 'verify' || !isCodeSent || timeLeft <= 0) {
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
  }, [isOpen, step, isCodeSent, timeLeft])

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

    if (hasCodeError) {
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

    if (code.trim() !== '123456') {
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
      <div className="border-ui-gray-200 bg-ui-gray-100 fixed top-[calc(50vh-289px)] left-1/2 z-[1001] flex h-[48px] w-fit -translate-x-1/2 items-center gap-[12px] rounded-[4px] border px-[16px] py-[12px] whitespace-nowrap shadow-[4px_4px_4px_rgba(131,131,131,0.25)]">
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
        width="w-[410px]"
        isNested
      >
        <div className="flex flex-col items-center px-[32px] py-[40px] text-center">
          <CheckToastIconSvg className="mb-[20px] h-[40px] w-[40px]" />

          <h2 className="text-ui-gray-primary mb-[16px] text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
            계정 복구 완료!
          </h2>

          <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
            지금 바로 로그인해 보세요
          </p>
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
      <div className="flex flex-col gap-[32px] px-[24px] pb-[24px]">
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

        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="recover-email"
              className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]"
            >
              이메일<span className="text-other-red">*</span>
            </label>

            <div className="flex gap-[8px]">
              <input
                id="recover-email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="가입한 이메일을 입력해 주세요."
                className="text-ui-gray-primary placeholder:text-ui-gray-disabled border-ui-gray-disabled h-[48px] flex-1 rounded-[4px] border px-[16px] text-[14px] leading-[17px] outline-none"
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="!text-ui-gray-700 !border-ui-gray-disabled !bg-ui-gray-200 !h-[48px] !w-[112px] !rounded-[4px] !border !px-0 !py-0 !text-[16px] !leading-[140%] !font-semibold"
                onClick={handleSendCodeBtnClick}
              >
                인증코드전송
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px]">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="인증번호를 입력해주세요"
                  className={`text-ui-gray-primary placeholder:text-ui-gray-disabled h-[48px] w-full rounded-[4px] border px-[16px] pr-[64px] text-[14px] leading-[17px] outline-none ${
                    hasCodeError
                      ? 'border-other-red'
                      : isCodeVerified
                        ? 'border-other-green'
                        : 'border-ui-gray-disabled'
                  }`}
                />

                {isCodeSent && (
                  <span className="text-other-red absolute top-1/2 right-[16px] -translate-y-1/2 text-[14px] leading-[17px] tracking-[-0.03em]">
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="!text-ui-gray-700 !border-ui-gray-disabled !bg-ui-gray-200 !h-[48px] !w-[112px] !rounded-[4px] !border !px-0 !py-0 !text-[16px] !leading-[140%] !font-semibold"
                onClick={handleVerifyCodeBtnClick}
              >
                인증코드확인
              </Button>
            </div>

            {hasCodeError && (
              <p className="text-other-red text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
                {codeErrorMessage}
              </p>
            )}

            {isCodeVerified && !hasCodeError && (
              <p className="text-other-green text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
                인증코드가 일치합니다.
              </p>
            )}
          </div>
        </div>

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
