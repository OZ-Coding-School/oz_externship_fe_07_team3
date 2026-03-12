import { useState } from 'react'

import InputField from '@/components/common/InputField'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SubmitLoginParams = {
  email: string
  password: string
}

type LoginFormProps = {
  onSubmit: ({ email, password }: SubmitLoginParams) => void
  onFindId?: () => void
  onFindPassword?: () => void
}

const LoginForm = ({ onSubmit, onFindId, onFindPassword }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isDisabled = !email || !password

  const handleLoginBtnClick = () => {
    onSubmit({
      email: email.trim(),
      password,
    })
  }

  return (
    <div className="flex w-full flex-col gap-[12px]">
      <InputField
        type="email"
        placeholder="아이디 (example@gmail.com)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-ui-gray-disabled placeholder:text-ui-gray-disabled h-[48px] rounded-[4px] px-[16px] py-[10px] text-[14px] leading-[17px] tracking-[-0.03em]"
      />

      <div className="flex w-full flex-col gap-[8px]">
        <InputField
          type="password"
          placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-ui-gray-disabled placeholder:text-ui-gray-disabled h-[48px] rounded-[4px] px-[16px] py-[10px] pr-[44px] text-[14px] leading-[17px] tracking-[-0.03em]"
        />

        <div className="text-ui-gray-600 flex items-center text-[14px] leading-[140%] tracking-[-0.03em]">
          <button type="button" onClick={onFindId}>
            아이디 찾기
          </button>
          <span className="px-[8px]">|</span>
          <button type="button" onClick={onFindPassword}>
            비밀번호 찾기
          </button>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleLoginBtnClick}
        disabled={isDisabled}
        className={cn(
          'h-[52px] w-full rounded-[4px] p-0 text-[16px] leading-[140%] tracking-[-0.03em]',
          isDisabled
            ? 'bg-ui-gray-200 text-ui-gray-disabled cursor-not-allowed'
            : 'bg-primary-default hover:bg-primary-600 active:bg-primary-700 text-white'
        )}
      >
        일반회원 로그인
      </Button>
    </div>
  )
}

export default LoginForm
