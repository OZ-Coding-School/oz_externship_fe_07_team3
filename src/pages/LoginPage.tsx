import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useFindEmail } from '@/api/queries/auth/useFindEmail'
import { useLogin } from '@/api/queries/auth/useLogin'
import { useGetMyInfo } from '@/api/queries/myInfo/useGetMyInfo'

import { useResetPassword } from '@/api/queries/auth/useFindPassword'
import {
  useSendPhoneVerificationCode,
  useSendRecoveryEmailVerificationCode,
  useVerifyEmailVerificationCode,
  useVerifyPhoneVerificationCode,
} from '@/api/signup'
import logoImg from '@/assets/images/logo.png'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import FindIdModal from '@/features/auth/find-id/FindIdModal'
import FindPasswordModal from '@/features/auth/find-password/FindPasswordModal'
import LoginForm from '@/features/auth/login/LoginForm'
import SocialLoginButton from '@/features/auth/login/SocialLoginButton'
import RecoverAccountModal from '@/features/auth/recover-account/RecoverAccountModal'
import type { FindIdHandlers } from '@/hooks/useFindId'
import type { FindPasswordHandlers } from '@/hooks/useFindPassword'
import { useAuthStore } from '@/store/authStore'
import type {
  loginErrorResponse,
  loginSuccessResponse,
} from '@/types/auth-type/login'
import { getErrorMessage } from '@/utils/getErrorMessage'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { toast } from 'sonner'

import { redirectToSocialLogin } from '@/features/auth/login/socialLogin'

type SubmitLoginParams = {
  email: string
  password: string
}

type Provider = 'kakao' | 'naver'

type OpenModal = 'none' | 'recover' | 'findId' | 'findPassword'

const LoginPage = () => {
  const [openModal, setOpenModal] = useState<OpenModal>('none')

  const navigate = useNavigate()
  const { mutate: login } = useLogin()
  const { refetch } = useGetMyInfo(false)

  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setUser = useAuthStore((state) => state.setUser)

  const findEmailMutation = useFindEmail()
  const sendPhoneCodeMutation = useSendPhoneVerificationCode()
  const verifyPhoneCodeMutation = useVerifyPhoneVerificationCode()
  const sendEmailCodeMutation = useSendRecoveryEmailVerificationCode()
  const verifyEmailCodeMutation = useVerifyEmailVerificationCode()
  const resetPasswordMutation = useResetPassword()

  const findIdHandlers: FindIdHandlers = {
    onSendCode: async ({ phone }) => {
      try {
        await sendPhoneCodeMutation.mutateAsync({
          phone_number: phone,
        })
      } catch (error) {
        getErrorMessage(error, '인증번호 전송에 실패했습니다.')
      }
    },

    onVerifyCode: async ({ phone, code }) => {
      try {
        await verifyPhoneCodeMutation.mutateAsync({
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

  const findPasswordHandlers: FindPasswordHandlers = {
    onSendCode: async ({ email }) => {
      try {
        await sendEmailCodeMutation.mutateAsync({
          email,
        })
      } catch (error: unknown) {
        let message = '알 수 없는 에러가 발생했습니다.'

        if (axios.isAxiosError(error)) {
          const status = error.response?.status

          if (status === 429) {
            message = '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.'
          } else if (status === 400) {
            message = '사용자를 찾을 수 없습니다.'
          }
        }

        throw new Error(getErrorMessage(error, message))
      }
    },

    onVerifyCode: async ({ email, code }) => {
      try {
        const result = await verifyEmailCodeMutation.mutateAsync({
          email,
          code,
        })

        return result
      } catch (error) {
        throw new Error(getErrorMessage(error, '인증번호 확인 실패'))
      }
    },

    onResetPassword: async ({ emailToken, newPassword }) => {
      try {
        await resetPasswordMutation.mutateAsync({
          email_token: emailToken,
          new_password: newPassword,
        })
      } catch (error) {
        throw new Error(getErrorMessage(error, '비밀번호 재설정 실패'))
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
            const user = result.data

            setUser({
              id: user.id,
              email: user.email,
            })
          }

          navigate(ROUTES_PATHS.HOME_PAGE)
        },
        onError: (error) => {
          const axiosError = error as AxiosError<loginErrorResponse>
          const status = axiosError.response?.status

          if (status === 403) {
            setOpenModal('recover')
            return
          }

          const message =
            axiosError.response?.data?.detail ??
            axiosError.response?.data?.error_detail ??
            axiosError.response?.data?.errorDetail?.detail ??
            '로그인에 실패했습니다.'

          toast.error(message)
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
                onClick={() => redirectToSocialLogin('kakao')}
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
