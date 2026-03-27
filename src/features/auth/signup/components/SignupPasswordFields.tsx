import { cn } from '@/lib/utils'
import Input from '@/components/ui/input'
import type {
  SignupErrors,
  SignupState,
  SignupTouched,
} from '@/features/auth/signup/SignupState'

const fieldLabelClassName =
  'text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]'

const guideTextClassName =
  'text-btn-fill-default text-[14px] leading-[140%] font-semibold tracking-[-0.03em]'

const baseTextClassName = 'text-[14px] leading-[140%] tracking-[-0.03em]'
const errorTextClassName = cn(baseTextClassName, 'text-other-red')
const successTextClassName = cn(baseTextClassName, 'text-other-green')

type Props = {
  state: SignupState
  errors: SignupErrors
  touched: SignupTouched
  submitted: boolean
  isPasswordMatch: boolean
  handlePasswordChange: (value: string) => void
  handleConfirmPasswordChange: (value: string) => void
  setFieldTouched: (field: keyof SignupTouched) => void
}

const SignupPasswordFields = ({
  state,
  errors,
  touched,
  submitted,
  isPasswordMatch,
  handlePasswordChange,
  handleConfirmPasswordChange,
  setFieldTouched,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <label htmlFor="signup-password" className={fieldLabelClassName}>
          비밀번호<span className="text-other-red">*</span>
        </label>

        <span className={guideTextClassName}>
          6~15자의 영문 대소문자, 숫자, 특수문자 포함
        </span>
      </div>

      <Input
        id="signup-password"
        type="password"
        value={state.password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        onBlur={() => setFieldTouched('password')}
        placeholder="비밀번호를 입력해주세요"
        className="h-[48px]"
      />

      {(touched.password || submitted) && errors.password && (
        <p className={errorTextClassName}>{errors.password}</p>
      )}

      <Input
        id="signup-confirm-password"
        type="password"
        value={state.confirmPassword}
        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        onBlur={() => setFieldTouched('confirmPassword')}
        placeholder="비밀번호를 다시 입력해주세요"
        className="h-[48px]"
      />

      {(touched.confirmPassword || submitted) && errors.confirmPassword && (
        <p className={errorTextClassName}>{errors.confirmPassword}</p>
      )}

      {(touched.confirmPassword || submitted) &&
        !errors.confirmPassword &&
        isPasswordMatch && (
          <p className={successTextClassName}>비밀번호가 일치합니다.</p>
        )}
    </div>
  )
}

export default SignupPasswordFields
