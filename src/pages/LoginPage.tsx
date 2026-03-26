import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logoImg from '@/assets/images/logo.png'
import { useLogin } from '@/api/queries/auth/useLogin'
import { useGetMyInfo } from '@/api/queries/myInfo/useGetMyInfo'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import FindIdModal from '@/features/auth/find-id/FindIdModal'
import FindPasswordModal from '@/features/auth/find-password/FindPasswordModal'
import LoginForm from '@/features/auth/login/LoginForm'
import SocialLoginButton from '@/features/auth/login/SocialLoginButton'
import RecoverAccountModal from '@/features/auth/recover-account/RecoverAccountModal'
import type { FindIdHandlers } from '@/hooks/useFindId'
import type { FindPasswordHandlers } from '@/hooks/useFindPassword'
import { useAuthStore } from '@/store/authStore'
import type { loginSuccessResponse } from '@/types/auth-type/login'
import { useFindEmail } from '@/api/queries/auth/useFindEmail'
import {
  useSendPhoneVerificationCode,
  useVerifyPhoneVerificationCode,
} from '@/api/queries/usePhoneVerification'
import { getErrorMessage } from '@/utils/getErrorMessage'

type SubmitLoginParams = {
  email: string
  password: string
}

type Provider = 'kakao' | 'naver'

type OpenModal = 'none' | 'recover' | 'findId' | 'findPassword'

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

  const navigate = useNavigate()
  const { mutate: login } = useLogin()
  const { refetch } = useGetMyInfo(false)

  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setUser = useAuthStore((state) => state.setUser)

  const findEmailMutation = useFindEmail()
  const sendCodeMutation = useSendPhoneVerificationCode()
  const verifyCodeMutation = useVerifyPhoneVerificationCode()

  const findIdHandlers: FindIdHandlers = {
    onSendCode: async ({ phone }) => {
      try {
        await sendCodeMutation.mutateAsync({
          phone_number: phone,
        })
      } catch (error) {
        getErrorMessage(error, '인증번호 전송에 실패했습니다.')
      }
    },

    onVerifyCode: async ({ phone, code }) => {
      try {
        await verifyCodeMutation.mutateAsync({
          code,
          phone_number: phone,
        })
      } catch (error) {
        throw new Error(getErrorMessage(error, '인증번호 확인에 실패했습니다.'))
      }
    },

    onFindId: async ({ name, phone, code }) => {
      try {
        const result = await findEmailMutation.mutateAsync({
          name: name,
          phone_number: phone,
          code: code,
        })

        return {
          maskedEmail: result.email,
        }
      } catch (error) {
        throw new Error(
          getErrorMessage(
            error,
            '입력하신 정보와 일치하는 계정을 찾을 수 없습니다.'
          )
        )
      }
    },
  }

  const handleSocialLoginBtnClick = ({ provider }: { provider: Provider }) => {
    void provider
  }

  const handleLoginBtnClick = ({ email, password }: SubmitLoginParams) => {
    login(
      { email, password },
      {
        onSuccess: async (data: loginSuccessResponse) => {
          const accessToken = data.access_token

          setAccessToken(accessToken)

          const result = await refetch()

          if (result.data) {
            const user = result.data as any

            setUser({
              id: user.id,
              email: user.email,
            })
          }

          navigate('/')
        },
      }
    )
  }

  const handleFindIdBtnClick = () => {
    setOpenModal('findId')
  }

  const handleFindPasswordBtnClick = () => {
    setOpenModal('findPassword')
  }

  return (
    <div className="bg-ui-gray-100 min-h-screen">
      <div className="flex justify-center pt-50">
        <div className="flex w-87 flex-col gap-16">
          <div className="flex flex-col items-center gap-6.75">
            <img src={logoImg} alt="오즈코딩스쿨" width={180} height={24} />
            <div className="flex items-center gap-3 text-[16px] leading-[140%] tracking-[-0.03em]">
              <span className="text-ui-gray-600">아직 회원이 아니신가요?</span>
              <Link
                to={ROUTES_PATHS.SIGNUP_PAGE}
                className="text-primary-default"
              >
                회원가입 하기
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3">
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
