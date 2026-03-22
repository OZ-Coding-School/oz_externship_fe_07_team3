import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

type CodeVerificationProps = {
  label: string
  required?: boolean
  targetInputId: string
  targetValue: string
  onTargetChange: (value: string) => void
  targetPlaceholder: string
  targetInputType?: 'text' | 'email'
  targetInputMode?: 'text' | 'numeric'
  verificationCodeInputId: string
  verificationCode: string
  onVerificationCodeChange: (value: string) => void
  verificationCodePlaceholder: string
  onSendCode: () => void
  onVerifyCode: () => void
  isCodeSent: boolean
  isCodeVerified: boolean
  errorMessage: string
  successMessage?: string
  formattedTime: string
  sendButtonText?: string
  verifyButtonText?: string
  buttonClassName?: string
}

const defaultBtnClassName =
  '!h-[48px] !w-[112px] !rounded-[4px] !border !border-[#BDBDBD] !px-[16px] !py-[20px] !text-[16px] !font-semibold whitespace-nowrap'

const CodeVerification = ({
  label,
  required = false,
  targetInputId,
  targetValue,
  onTargetChange,
  targetPlaceholder,
  targetInputType = 'text',
  targetInputMode = 'text',
  verificationCodeInputId,
  verificationCode,
  onVerificationCodeChange,
  verificationCodePlaceholder,
  onSendCode,
  onVerifyCode,
  isCodeSent,
  isCodeVerified,
  errorMessage,
  successMessage = '인증코드가 일치합니다.',
  formattedTime,
  sendButtonText = '인증코드전송',
  verifyButtonText = '인증코드확인',
  buttonClassName,
}: CodeVerificationProps) => {
  const hasError = Boolean(errorMessage)

  const codeBorderClass = (() => {
    if (hasError) return 'border-other-red'
    if (isCodeVerified) return 'border-other-green'
    return 'border-grey-9 focus:border-btn-fill-default'
  })()

  const btnClass = buttonClassName ?? defaultBtnClassName

  return (
    <div className="flex flex-col gap-[12px]">
      <label
        htmlFor={targetInputId}
        className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]"
      >
        {label}
        {required && <span className="text-other-red">*</span>}
      </label>

      <div className="flex flex-col gap-[20px]">
        <div className="flex gap-[12px]">
          <Input
            id={targetInputId}
            type={targetInputType}
            inputMode={targetInputMode}
            value={targetValue}
            onChange={(e) => onTargetChange(e.target.value)}
            placeholder={targetPlaceholder}
            className="flex-1"
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={btnClass}
            onClick={onSendCode}
          >
            {sendButtonText}
          </Button>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-[12px]">
            <div className="relative flex-1">
              <input
                id={verificationCodeInputId}
                type="text"
                inputMode="numeric"
                value={verificationCode}
                onChange={(e) => onVerificationCodeChange(e.target.value)}
                placeholder={verificationCodePlaceholder}
                className={`bg-grey-1 placeholder:text-grey-9 flex h-[48px] w-full rounded-[4px] border px-[16px] py-[10px] font-['Pretendard'] text-[16px] leading-[140%] tracking-[-0.03em] transition-all focus:outline-none ${
                  isCodeSent && !isCodeVerified ? 'pr-[64px]' : ''
                } ${codeBorderClass}`}
              />

              {isCodeSent && !isCodeVerified && (
                <span className="text-other-red absolute top-1/2 right-[16px] -translate-y-1/2 text-[14px] leading-[17px] tracking-[-0.03em]">
                  {formattedTime}
                </span>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={btnClass}
              onClick={onVerifyCode}
            >
              {verifyButtonText}
            </Button>
          </div>

          {hasError && (
            <p className="text-other-red mt-[12px] text-[14px] leading-[140%] tracking-[-0.03em]">
              {errorMessage}
            </p>
          )}

          {isCodeVerified && !hasError && (
            <p className="text-other-green mt-[12px] text-[14px] leading-[140%] tracking-[-0.03em]">
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeVerification
