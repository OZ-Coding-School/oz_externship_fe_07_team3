import { useState } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '@/assets/images/logo.png'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import RecoverAccountModal from '@/features/auth/login/RecoverAccountModal'
import LoginForm from '@/features/auth/login/LoginForm'
import SocialLoginButton from '@/features/auth/login/SocialLoginButton'

type SubmitLoginParams = {
  email: string
  password: string
}

type Provider = 'kakao' | 'naver'

const LoginPage = () => {
  const [isRecoverModalOpen, setIsRecoverModalOpen] = useState(false)

  const handleSocialLoginBtnClick = ({ provider }: { provider: Provider }) => {
    void provider
  }

  const handleLoginBtnClick = ({ email, password }: SubmitLoginParams) => {
    void email
    void password
    // TODO: 로그인 API 연동 후 탈퇴 계정 응답일 때만 복구 모달을 오픈합니다.
  }

  const handleFindIdBtnClick = () => {}

  const handleFindPasswordBtnClick = () => {}

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
        isOpen={isRecoverModalOpen}
        onClose={() => setIsRecoverModalOpen(false)}
      />
    </div>
  )
}

export default LoginPage
