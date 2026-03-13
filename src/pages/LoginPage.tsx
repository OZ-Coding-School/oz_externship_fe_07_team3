import { Link } from 'react-router-dom'

import logoImg from '@/assets/images/logo.png'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import LoginForm from '@/features/auth/login/LoginForm'
import SocialLoginButton from '@/features/auth/login/SocialLoginButton'

type SubmitLoginParams = {
  email: string
  password: string
}

type Provider = 'kakao' | 'naver'

const LoginPage = () => {
  const handleSocialLoginBtnClick = ({ provider }: { provider: Provider }) => {
    void provider
  }

  const handleLoginBtnClick = ({ email, password }: SubmitLoginParams) => {
    void email
    void password
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
    </div>
  )
}

export default LoginPage
