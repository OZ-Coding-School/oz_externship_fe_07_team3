import Button from '@/components/ui/button'
import { useSignup } from '@/features/auth/signup/useSignup'
import SignupPasswordFields from './components/SignupPasswordFields'
import SignupProfileFields from './components/SignupProfileFields'
import SignupVerificationFields from './components/SignupVerificationFields'
import logo from '@/assets/images/logo.png'

const SignupForm = () => {
  const signup = useSignup()

  return (
    <div className="mx-auto flex w-[528px] flex-row items-center gap-[10px] bg-white px-[24px] py-[40px]">
      <div className="flex w-full flex-col items-start gap-[36px]">
        <div className="flex w-full flex-col items-center gap-[16px]">
          <div className="text-center text-[18px] leading-[140%] font-bold tracking-[-0.02em] text-[#000A30]">
            마법같이 빠르게 성장시켜줄
          </div>
          <img src={logo} alt="오즈코딩스쿨" className="h-[24px] w-[180px]" />
          <h1 className="text-ui-gray-primary w-full text-left text-[18px] leading-[140%] font-semibold tracking-[-0.03em]">
            회원가입
          </h1>
        </div>

        <div className="flex w-full flex-col items-start gap-[44px]">
          <SignupProfileFields
            state={signup.state}
            errors={signup.errors}
            touched={signup.touched}
            submitted={signup.submitted}
            handleNameChange={signup.handleNameChange}
            handleNicknameChange={signup.handleNicknameChange}
            handleNicknameCheck={signup.handleNicknameCheck}
            handleBirthChange={signup.handleBirthChange}
            handleGenderChange={signup.handleGenderChange}
            setFieldTouched={signup.setFieldTouched}
          />

          <SignupVerificationFields
            state={signup.state}
            errors={signup.errors}
            touched={signup.touched}
            submitted={signup.submitted}
            emailVerification={signup.emailVerification}
            phoneVerification={signup.phoneVerification}
            emailAvailableMessage={signup.emailAvailableMessage}
            phoneAvailableMessage={signup.phoneAvailableMessage}
            handleEmailChange={signup.handleEmailChange}
            handlePhoneChange={signup.handlePhoneChange}
            handleSendEmailCode={signup.handleSendEmailCode}
            handleVerifyEmailCode={signup.handleVerifyEmailCode}
            handleSendPhoneCode={signup.handleSendPhoneCode}
            handleVerifyPhoneCode={signup.handleVerifyPhoneCode}
            setFieldTouched={signup.setFieldTouched}
          />

          <SignupPasswordFields
            state={signup.state}
            errors={signup.errors}
            touched={signup.touched}
            submitted={signup.submitted}
            isPasswordMatch={signup.isPasswordMatch}
            handlePasswordChange={signup.handlePasswordChange}
            handleConfirmPasswordChange={signup.handleConfirmPasswordChange}
            setFieldTouched={signup.setFieldTouched}
          />

          <Button
            type="button"
            variant="fill"
            size="full"
            disabled={signup.isSubmitDisabled}
            onClick={signup.submit}
          >
            가입하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
