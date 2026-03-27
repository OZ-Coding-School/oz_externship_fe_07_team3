import { useEffect } from 'react'

import FindPasswordIconSvg from '@/assets/icons/FindPasswordIcon.svg?react'
import CodeVerification from '@/components/common/CodeVerification'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Modal from '@/components/ui/modal/Modal'
import Popup from '@/components/ui/modal/Popup'
import {
  useFindPassword,
  type FindPasswordHandlers,
} from '@/hooks/useFindPassword'

type FindPasswordModalProps = {
  isOpen: boolean
  onClose: () => void
  handlers: FindPasswordHandlers
}

const FindPasswordModal = ({
  isOpen,
  onClose,
  handlers,
}: FindPasswordModalProps) => {
  const {
    step,
    email,
    newPassword,
    confirmPassword,
    verificationCode,
    isCodeSent,
    isCodeVerified,
    codeErrorMessage,
    inputErrorMessage,
    resetErrorMessage,
    formattedTime,
    isCompletePopupOpen,
    handleEmailChange,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleNextStep,
    handleResetPassword,
    handleCloseCompletePopup,
  } = useFindPassword({ isOpen, handlers })

  useEffect(() => {
    if (!isCompletePopupOpen) return

    const timer = window.setTimeout(() => {
      handleCloseCompletePopup()
      onClose()
    }, 1500)

    return () => {
      window.clearTimeout(timer)
    }
  }, [handleCloseCompletePopup, isCompletePopupOpen, onClose])

  const renderInputStep = () => {
    return (
      <div className="flex flex-col gap-[40px] px-[24px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <FindPasswordIconSvg className="h-[28px] w-[28px]" />

          <div className="flex flex-col items-center gap-[16px]">
            <h2 className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              비밀번호 찾기
            </h2>

            {inputErrorMessage && (
              <p className="text-other-red text-[14px] leading-[140%] tracking-[-0.03em] whitespace-pre-line">
                {inputErrorMessage}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[40px]">
          <CodeVerification
            label="이메일"
            required
            targetInputId="find-password-email"
            targetValue={email}
            onTargetChange={handleEmailChange}
            targetPlaceholder="가입한 이메일을 입력해 주세요."
            targetInputType="email"
            verificationCodeInputId="find-password-code"
            verificationCode={verificationCode}
            onVerificationCodeChange={handleCodeChange}
            verificationCodePlaceholder="인증번호를 입력해주세요"
            onSendCode={handleSendCode}
            onVerifyCode={handleVerifyCode}
            isCodeSent={isCodeSent}
            isCodeVerified={isCodeVerified}
            errorMessage={codeErrorMessage}
            successMessage="인증번호가 일치합니다."
            formattedTime={formattedTime}
          />

          <Button
            variant="fill"
            size="full"
            className="!h-[52px] !rounded-[4px]"
            onClick={handleNextStep}
          >
            비밀번호 찾기
          </Button>
        </div>
      </div>
    )
  }

  const renderResetStep = () => {
    return (
      <div className="flex flex-col gap-[40px] px-[24px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <FindPasswordIconSvg className="h-[28px] w-[28px]" />

          <div className="flex flex-col items-center gap-[16px]">
            <h2 className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              비밀번호 재설정
            </h2>

            <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
              신규 비밀번호를 입력해주세요.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-start gap-[16px]">
                <div className="flex w-[79px] items-start">
                  <label
                    htmlFor="find-password-new-password"
                    className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]"
                  >
                    새 비밀번호
                  </label>
                  <span className="text-other-red text-[16px] leading-[19px] tracking-[-0.02em]">
                    *
                  </span>
                </div>

                <span className="text-primary-default text-[14px] leading-[140%] font-semibold tracking-[-0.03em]">
                  6~15자의 영문 대소문자, 숫자, 특수문자 포함
                </span>
              </div>

              <Input
                id="find-password-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => handleNewPasswordChange(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                className="h-[48px]"
              />
            </div>

            <div className="flex flex-col gap-[16px]">
              <Input
                id="find-password-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                placeholder="비밀번호를 다시 입력해주세요"
                className="h-[48px]"
              />

              {resetErrorMessage && (
                <p className="text-other-red text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
                  {resetErrorMessage}
                </p>
              )}
            </div>
          </div>

          <Button
            variant="fill"
            size="full"
            className="!h-[52px] !rounded-[4px] !p-0"
            onClick={handleResetPassword}
          >
            확인
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        width="w-[396px]"
        dimmed={!isCompletePopupOpen}
      >
        {step === 'input' && renderInputStep()}
        {step === 'reset' && renderResetStep()}
      </Modal>

      <Popup
        isOpen={isOpen && isCompletePopupOpen}
        onClose={handleCloseCompletePopup}
        width="w-[396px]"
      >
        <div className="flex h-[128px] w-full items-center p-[24px]">
          <div className="flex w-full flex-col items-center gap-[16px] text-center">
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
            <div className="flex flex-col items-center gap-[12px]">
              <p className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
                비밀번호 변경 완료!
              </p>
              <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
                잠시 후 로그인 페이지로 이동합니다.
              </p>
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default FindPasswordModal
