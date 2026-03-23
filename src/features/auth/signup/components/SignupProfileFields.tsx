import { cn } from '@/lib/utils'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import InputField from '@/components/common/InputField'
import type {
  SignupErrors,
  SignupState,
  SignupTouched,
} from '@/features/auth/signup/SignupState'

const fieldLabelClassName =
  'text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]'

const actionButtonClassName =
  '!h-[48px] !w-[112px] !rounded-[4px] !border !border-ui-gray-disabled !bg-ui-gray-200 !px-[16px] !py-[20px] !text-[16px] !font-semibold !text-ui-gray-700 whitespace-nowrap'

const genderButtonBaseClassName =
  '!h-[42px] !w-[80px] !rounded-full !px-[29px] !py-[16px] !text-[16px] !font-semibold'

const errorTextClassName =
  'text-other-red text-[14px] leading-[140%] tracking-[-0.03em]'

const successTextClassName =
  'text-other-green text-[14px] leading-[140%] tracking-[-0.03em]'

type Props = {
  state: SignupState
  errors: SignupErrors
  touched: SignupTouched
  submitted: boolean
  handleNameChange: (value: string) => void
  handleNicknameChange: (value: string) => void
  handleNicknameCheck: () => void
  handleBirthChange: (value: string) => void
  handleGenderChange: (value: 'male' | 'female') => void
  setFieldTouched: (field: keyof SignupTouched) => void
}

const SignupProfileFields = ({
  state,
  errors,
  touched,
  submitted,
  handleNameChange,
  handleNicknameChange,
  handleNicknameCheck,
  handleBirthChange,
  handleGenderChange,
  setFieldTouched,
}: Props) => {
  const isMaleSelected = state.gender === 'male'
  const isFemaleSelected = state.gender === 'female'

  return (
    <>
      {/* 이름 */}
      <div className="flex w-full flex-col gap-[20px]">
        <InputField
          id="signup-name"
          label="이름"
          required
          type="text"
          value={state.name}
          onChange={(e) => handleNameChange(e.target.value)}
          onBlur={() => setFieldTouched('name')}
          placeholder="이름을 입력해주세요"
          className="h-[48px]"
          fieldLabelClassName={fieldLabelClassName}
        />
        {(touched.name || submitted) && errors.name && (
          <p className={errorTextClassName}>{errors.name}</p>
        )}
      </div>

      {/* 닉네임 - 버튼이 같은 행에 있어서 InputField 미적용 */}
      <div className="flex w-full flex-col gap-[20px]">
        <label htmlFor="signup-nickname" className={fieldLabelClassName}>
          닉네임<span className="text-other-red">*</span>
        </label>

        <div className="flex w-full gap-[12px]">
          <Input
            id="signup-nickname"
            type="text"
            value={state.nickname}
            onChange={(e) => handleNicknameChange(e.target.value)}
            onBlur={() => setFieldTouched('nickname')}
            placeholder="닉네임을 입력해주세요"
            className="h-[48px] flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={actionButtonClassName}
            onClick={handleNicknameCheck}
          >
            중복확인
          </Button>
        </div>

        {(touched.nickname || submitted) && errors.nickname ? (
          <p className={errorTextClassName}>{errors.nickname}</p>
        ) : state.nickname && state.isNicknameChecked ? (
          <p className={successTextClassName}>사용 가능한 닉네임입니다.</p>
        ) : null}
      </div>

      {/* 생년월일 */}
      <div className="flex w-full flex-col gap-[20px]">
        <InputField
          id="signup-birth"
          label="이름"
          required
          type="text"
          inputMode="numeric"
          value={state.birth}
          onChange={(e) => handleBirthChange(e.target.value)}
          onBlur={() => setFieldTouched('birth')}
          placeholder="8자리 입력해주세요 (ex.20001004)"
          className="h-[48px]"
          fieldLabelClassName={fieldLabelClassName}
        />
        {(touched.birth || submitted) && errors.birth && (
          <p className={errorTextClassName}>{errors.birth}</p>
        )}
      </div>

      {/* 성별 */}
      <div className="flex w-full flex-col gap-[20px]">
        <label className={fieldLabelClassName}>
          성별<span className="text-other-red">*</span>
        </label>

        <div className="flex gap-[20px]">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              genderButtonBaseClassName,
              isMaleSelected
                ? '!border-btn-fill-default !bg-primary-100 !text-btn-fill-default !border'
                : '!border-ui-gray-250 !bg-ui-gray-200 !text-ui-gray-600 !border'
            )}
            onClick={() => handleGenderChange('male')}
          >
            남
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              genderButtonBaseClassName,
              isFemaleSelected
                ? '!border-btn-fill-default !bg-primary-100 !text-btn-fill-default !border'
                : '!border-ui-gray-250 !bg-ui-gray-200 !text-ui-gray-600 !border'
            )}
            onClick={() => handleGenderChange('female')}
          >
            여
          </Button>
        </div>

        {(touched.gender || submitted) && errors.gender && (
          <p className={errorTextClassName}>{errors.gender}</p>
        )}
      </div>
    </>
  )
}

export default SignupProfileFields
