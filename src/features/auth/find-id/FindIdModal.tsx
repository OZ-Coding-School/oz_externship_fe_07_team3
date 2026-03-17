import FindIdIconSvg from '@/assets/icons/FindIdIcon.svg?react'
import CodeVerification from '@/components/common/CodeVerification'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Modal from '@/components/ui/modal/Modal'
import { useFindId, type FindIdHandlers } from '@/hooks/useFindId'

type FindIdModalProps = {
  isOpen: boolean
  onClose: () => void
  onFindPassword: () => void
  handlers: FindIdHandlers
}

const FindIdModal = ({
  isOpen,
  onClose,
  onFindPassword,
  handlers,
}: FindIdModalProps) => {
  const {
    step,
    name,
    phone,
    code,
    isCodeSent,
    isCodeVerified,
    codeErrorMessage,
    findErrorMessage,
    maskedEmail,
    formattedTime,
    handleNameChange,
    handlePhoneChange,
    handleCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleFindId,
  } = useFindId({
    isOpen,
    handlers,
  })

  const hasFindError = Boolean(findErrorMessage)

  const renderInputContent = () => {
    return (
      <div className="flex flex-col gap-[32px] px-[24px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <FindIdIconSvg className="h-[28px] w-[28px]" />

          <div className="flex flex-col items-center gap-[12px]">
            <h2 className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              아이디 찾기
            </h2>

            {hasFindError && (
              <p className="text-other-red text-[14px] leading-[140%] font-normal tracking-[-0.03em] whitespace-pre-line">
                {findErrorMessage}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="find-id-name"
              className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]"
            >
              이름<span className="text-other-red">*</span>
            </label>

            <Input
              id="find-id-name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="이름을 입력해주세요"
              className="h-[48px]"
            />
          </div>

          <CodeVerification
            label="휴대전화"
            required
            targetInputId="find-id-phone"
            targetValue={phone}
            onTargetChange={handlePhoneChange}
            targetPlaceholder="숫자만 입력해주세요"
            targetInputType="text"
            targetInputMode="numeric"
            verificationCodeInputId="find-id-code"
            verificationCode={code}
            onVerificationCodeChange={handleCodeChange}
            verificationCodePlaceholder="인증번호 6자리를 입력해주세요"
            onSendCode={handleSendCode}
            onVerifyCode={handleVerifyCode}
            isCodeSent={isCodeSent}
            isCodeVerified={isCodeVerified}
            errorMessage={codeErrorMessage}
            successMessage="인증번호가 일치합니다."
            formattedTime={formattedTime}
          />
        </div>

        <Button
          variant="fill"
          size="full"
          className="!h-[52px] !rounded-[4px] !p-0"
          onClick={handleFindId}
        >
          아이디 찾기
        </Button>
      </div>
    )
  }

  const renderResultContent = () => {
    return (
      <div className="flex flex-col gap-[32px] px-[24px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <FindIdIconSvg className="h-[28px] w-[28px]" />

          <div className="flex flex-col items-center gap-[12px]">
            <h2 className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              아이디 찾기
            </h2>

            <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
              입력하신 정보와 일치하는 아이디입니다.
            </p>
          </div>
        </div>

        <div className="border-ui-gray-disabled bg-ui-gray-200 flex items-center justify-center rounded-[4px] border px-[16px] py-[20px]">
          <span className="text-ui-gray-primary text-[18px] leading-[140%] font-semibold tracking-[-0.03em]">
            {maskedEmail}
          </span>
        </div>

        <div className="flex gap-[12px]">
          <Button
            variant="outline"
            size="full"
            className="!h-[48px] !rounded-[4px] !bg-white !p-0"
            onClick={onClose}
          >
            로그인
          </Button>

          <Button
            variant="fill"
            size="full"
            className="!h-[48px] !rounded-[4px] !p-0"
            onClick={() => {
              onClose()
              onFindPassword()
            }}
          >
            비밀번호 찾기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="w-[396px]">
      {step === 'input' && renderInputContent()}
      {step === 'result' && renderResultContent()}
    </Modal>
  )
}

export default FindIdModal
