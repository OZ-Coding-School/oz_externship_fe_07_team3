import { cn } from '@/lib/utils'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import type {
  SignupErrors,
  SignupState,
  SignupTouched,
} from '@/features/auth/signup/SignupState'
import { useCodeVerification } from '@/features/auth/shared/useCodeVerification'

const fieldLabelClassName =
  'text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]'

const guideTextClassName =
  'text-btn-fill-default text-[14px] leading-[140%] font-semibold tracking-[-0.03em]'

const actionButtonClassName =
  '!h-[48px] !w-[112px] !rounded-[4px] !border !border-ui-gray-disabled !bg-ui-gray-200 !px-[16px] !py-[20px] !text-[16px] !font-semibold !text-ui-gray-700 whitespace-nowrap'

const errorTextClassName =
  'text-other-red text-[14px] leading-[140%] tracking-[-0.03em]'

const successTextClassName =
  'text-other-green text-[14px] leading-[140%] tracking-[-0.03em]'

type PhoneField = 'phoneFirst' | 'phoneMiddle' | 'phoneLast'
type VerificationState = ReturnType<typeof useCodeVerification>

type Props = {
  state: SignupState
  errors: SignupErrors
  touched: SignupTouched
  submitted: boolean
  emailVerification: VerificationState
  phoneVerification: VerificationState
  emailAvailableMessage: string
  phoneAvailableMessage: string
  handleEmailChange: (value: string) => void
  handlePhoneChange: (key: PhoneField, value: string) => void
  handleSendEmailCode: () => void
  handleVerifyEmailCode: () => void
  handleSendPhoneCode: () => void
  handleVerifyPhoneCode: () => void
  setFieldTouched: (field: keyof SignupTouched) => void
}

const SignupVerificationFields = ({
  state,
  errors,
  touched,
  submitted,
  emailVerification,
  phoneVerification,
  emailAvailableMessage,
  phoneAvailableMessage,
  handleEmailChange,
  handlePhoneChange,
  handleSendEmailCode,
  handleVerifyEmailCode,
  handleSendPhoneCode,
  handleVerifyPhoneCode,
  setFieldTouched,
}: Props) => {
  const isEmailSent = emailVerification.isCodeSent
  const isPhoneSent = phoneVerification.isCodeSent

  return (
    <>
      <div className="flex w-full flex-col gap-[20px]">
        <div className="flex items-center gap-[16px]">
          <label htmlFor="signup-email" className={fieldLabelClassName}>
            이메일<span className="text-other-red">*</span>
          </label>
          <span className={guideTextClassName}>
            로그인 시 아이디로 사용합니다.
          </span>
        </div>

        <div className="flex w-full gap-[12px]">
          <Input
            id="signup-email"
            type="email"
            value={state.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => setFieldTouched('email')}
            placeholder="이메일을 입력해주세요"
            className="h-[48px] flex-1"
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              actionButtonClassName,
              isEmailSent &&
                '!border-btn-fill-default !bg-primary-100 !text-btn-fill-default'
            )}
            onClick={handleSendEmailCode}
          >
            인증번호 전송
          </Button>
        </div>

        {(touched.email || submitted) && errors.email ? (
          <p className={errorTextClassName}>{errors.email}</p>
        ) : emailAvailableMessage ? (
          <p className={successTextClassName}>{emailAvailableMessage}</p>
        ) : null}

        <div className="flex w-full flex-col gap-[12px]">
          <div className="flex w-full gap-[12px]">
            <div className="relative flex-1">
              <Input
                id="signup-email-code"
                type="text"
                inputMode="numeric"
                value={emailVerification.code}
                onChange={(e) =>
                  emailVerification.handleCodeChange(e.target.value)
                }
                placeholder="이메일 인증번호를 입력해주세요"
                className="h-[48px] pr-[80px]"
              />

              {isEmailSent && !emailVerification.isCodeVerified && (
                <span className="text-other-red absolute top-1/2 right-[16px] -translate-y-1/2 text-[14px]">
                  {emailVerification.formattedTime}
                </span>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={actionButtonClassName}
              onClick={handleVerifyEmailCode}
            >
              인증번호 확인
            </Button>
          </div>

          {emailVerification.codeErrorMessage && (
            <p className={errorTextClassName}>
              {emailVerification.codeErrorMessage}
            </p>
          )}

          {emailVerification.isCodeVerified && (
            <p className={successTextClassName}>
              이메일 인증이 완료되었습니다.
            </p>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-[20px]">
        <label className={fieldLabelClassName}>
          휴대폰 번호<span className="text-other-red">*</span>
        </label>

        <div className="flex w-full items-center gap-[8px]">
          <Input
            id="signup-phone-first"
            type="text"
            inputMode="numeric"
            value={state.phoneFirst}
            onChange={(e) => handlePhoneChange('phoneFirst', e.target.value)}
            onBlur={() => setFieldTouched('phone')}
            placeholder="010"
            className="h-[48px] w-[96px]"
          />
          <span>-</span>
          <Input
            id="signup-phone-middle"
            type="text"
            inputMode="numeric"
            value={state.phoneMiddle}
            onChange={(e) => handlePhoneChange('phoneMiddle', e.target.value)}
            onBlur={() => setFieldTouched('phone')}
            placeholder="1234"
            className="h-[48px] flex-1"
          />
          <span>-</span>
          <Input
            id="signup-phone-last"
            type="text"
            inputMode="numeric"
            value={state.phoneLast}
            onChange={(e) => handlePhoneChange('phoneLast', e.target.value)}
            onBlur={() => setFieldTouched('phone')}
            placeholder="5678"
            className="h-[48px] flex-1"
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              actionButtonClassName,
              isPhoneSent &&
                '!border-btn-fill-default !bg-primary-100 !text-btn-fill-default'
            )}
            onClick={handleSendPhoneCode}
          >
            인증번호 전송
          </Button>
        </div>

        {(touched.phone || submitted) && errors.phone ? (
          <p className={errorTextClassName}>{errors.phone}</p>
        ) : phoneAvailableMessage ? (
          <p className={successTextClassName}>{phoneAvailableMessage}</p>
        ) : null}

        <div className="flex w-full flex-col gap-[12px]">
          <div className="flex w-full gap-[12px]">
            <div className="relative flex-1">
              <Input
                id="signup-phone-code"
                type="text"
                inputMode="numeric"
                value={phoneVerification.code}
                onChange={(e) =>
                  phoneVerification.handleCodeChange(e.target.value)
                }
                placeholder="휴대폰 인증번호를 입력해주세요"
                className="h-[48px] pr-[80px]"
              />

              {isPhoneSent && !phoneVerification.isCodeVerified && (
                <span className="text-other-red absolute top-1/2 right-[16px] -translate-y-1/2 text-[14px]">
                  {phoneVerification.formattedTime}
                </span>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={actionButtonClassName}
              onClick={handleVerifyPhoneCode}
            >
              인증번호 확인
            </Button>
          </div>

          {phoneVerification.codeErrorMessage && (
            <p className={errorTextClassName}>
              {phoneVerification.codeErrorMessage}
            </p>
          )}

          {phoneVerification.isCodeVerified && (
            <p className={successTextClassName}>
              휴대전화 인증이 완료되었습니다.
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default SignupVerificationFields
