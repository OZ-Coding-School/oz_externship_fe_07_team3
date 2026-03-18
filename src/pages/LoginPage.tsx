import { useState } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '@/assets/images/logo.png'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import FindIdModal from '@/features/auth/find-id/FindIdModal'
import FindPasswordModal from '@/features/auth/find-password/FindPasswordModal'
import LoginForm from '@/features/auth/login/LoginForm'
import SocialLoginButton from '@/features/auth/login/SocialLoginButton'
import RecoverAccountModal from '@/features/auth/recover-account/RecoverAccountModal'
import type { FindIdHandlers } from '@/hooks/useFindId'
import type { FindPasswordHandlers } from '@/hooks/useFindPassword'

type SubmitLoginParams = {
  email: string
  password: string
}

type Provider = 'kakao' | 'naver'

type OpenModal = 'none' | 'recover' | 'findId' | 'findPassword'

const findIdHandlers: FindIdHandlers = {
  onSendCode: async () => {
    throw new Error(
      '입력한 이름과 휴대폰 번호로 등록된\n이메일이 존재하지 않습니다.'
    )
  },

  onVerifyCode: async () => {
    throw new Error('인증번호 확인에 실패했습니다.')
  },

  onFindId: async () => {
    throw new Error(
      '입력한 이름과 휴대폰 번호로 등록된\n이메일이 존재하지 않습니다.'
    )
  },
}

const findPasswordHandlers: FindPasswordHandlers = {
  onSendCode: async () => {
    throw new Error('등록된 이메일이 아닙니다.')
  },

  onVerifyCode: async () => {
    throw new Error('인증번호가 일치하지 않습니다.')
  },

  onResetPassword: async () => {
    // TODO: 비밀번호 재설정 API 연동
  },
}

const LoginPage = () => {
  const [openModal, setOpenModal] = useState<OpenModal>('none')

  const handleSocialLoginBtnClick = ({ provider }: { provider: Provider }) => {
    void provider
  }

  const handleLoginBtnClick = ({ email, password }: SubmitLoginParams) => {
    void email
    void password
    // TODO: 로그인 API 연동 후 탈퇴 계정 응답일 때만 복구 모달을 오픈합니다.
  }

  const handleFindIdBtnClick = () => {
    setOpenModal('findId')
  }

  const handleFindPasswordBtnClick = () => {
    setOpenModal('findPassword')
  }

  return (
    <div className="bg-ui-gray-100 min-h-screen">
      <div className="flex justify-center pt-[200px]">
        <div className="flex w-[348px] flex-col gap-[64px]">
          <div className="flex flex-col items-center gap-[27px]">
            <img src={logoImg} alt="오즈코딩스쿨" width={180} height={24} />
            <div className="flex items-center gap-[12px] text-[16px] leading-[140%] tracking-[-0.03em]">
              <span className="text-ui-gray-600">아직 회원이 아니신가요?</span>
              <Link
                to={ROUTES_PATHS.SIGNUP_PAGE}
                className="text-primary-default"
              >
                회원가입 하기
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[36px]">
            <div className="flex flex-col gap-[12px]">
              <SocialLoginButton
                provider="kakao"
                onClick={() => handleSocialLoginBtnClick({ provider: 'kakao' })}
              />
              <SocialLoginButton
                provider="naver"
                onClick={() => handleSocialLoginBtnClick({ provider: 'naver' })}
              />
            </div>

            <LoginForm
              onSubmit={handleLoginBtnClick}
              onFindId={handleFindIdBtnClick}
              onFindPassword={handleFindPasswordBtnClick}
            />
          </div>
        </div>
      </div>

      <RecoverAccountModal
        isOpen={openModal === 'recover'}
        onClose={() => setOpenModal('none')}
      />

      <FindIdModal
        isOpen={openModal === 'findId'}
        onClose={() => setOpenModal('none')}
        onFindPassword={() => setOpenModal('findPassword')}
        handlers={findIdHandlers}
      />

      <FindPasswordModal
        isOpen={openModal === 'findPassword'}
        onClose={() => setOpenModal('none')}
        handlers={findPasswordHandlers}
      />
    </div>
  )
}

export default LoginPage
