import InputField from '@/components/common/InputField'
import Button from '@/components/ui/button'
import usePhoneNumberVerificationSection from '@/hooks/usePhoneVerifySection'

type PhoneVerifySectionProps = {
  phoneNumber: string
  onChangePhoneNumber: (phoneNumber: string) => void
  onVerifiedTokenChange: (token: string | null) => void
}

export default function PhoneVerifySection({
  phoneNumber,
  onChangePhoneNumber,
  onVerifiedTokenChange,
}: PhoneVerifySectionProps) {
  const {
    phoneInputRef,
    phoneDisplayValue,
    phoneButtonText,
    verificationStatus,
    code,
    formattedTime,
    isCodeSent,
    isCodeVerified,
    isExpired,
    isPhoneReadOnly,
    showVerificationField,
    verificationHelperText,
    isVerifyButtonDisabled,
    isPhoneActionButtonDisabled,
    sendCodeMutation,
    verifyCodeMutation,
    handlePhoneNumberChange,
    handleCodeChange,
    handleClickPhoneActionButton,
    handleVerifyCode,
  } = usePhoneNumberVerificationSection({
    phoneNumber,
    onChangePhoneNumber,
    onVerifiedTokenChange,
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <InputField
          id="phone_number"
          value={phoneDisplayValue}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          label="휴대전화"
          readOnly={isPhoneReadOnly}
          status="default"
          ref={phoneInputRef}
          fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
        />

        <div className="flex items-end">
          <Button
            type="button"
            variant="outline"
            size={phoneButtonText === '인증번호 받기' ? 'md' : 'sm'}
            className="rounded-lg px-7 py-4"
            onClick={handleClickPhoneActionButton}
            disabled={isPhoneActionButtonDisabled}
          >
            {sendCodeMutation.isPending ? '전송중...' : phoneButtonText}
          </Button>
        </div>
      </div>

      {showVerificationField && (
        <div className="space-y-1">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <InputField
                id="verification_code"
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                placeholder="인증번호 입력"
                readOnly={isCodeVerified}
                status={verificationStatus}
                fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
              />

              {!isCodeVerified && isCodeSent && !isExpired && (
                <span className="text-other-red pointer-events-none absolute top-4 right-4 text-sm font-medium">
                  {formattedTime}
                </span>
              )}
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="border-grey-10 rounded-lg border px-7 py-4"
                onClick={handleVerifyCode}
                disabled={isVerifyButtonDisabled}
              >
                {verifyCodeMutation.isPending ? '확인중...' : '인증번호 확인'}
              </Button>
            </div>
          </div>

          {verificationHelperText && (
            <p className="text-other-red text-xs font-normal">
              {verificationHelperText}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
