import { useEffect, useState, type ChangeEvent } from 'react'

import FindIdIconSvg from '@/assets/icons/FindIdIcon.svg?react'
import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'

export type FindIdStep = 'form' | 'success'

export type FindIdHandlers = {
  onSendCode: (params: {
    name: string
    phone: string
    setFindErrorMessage: (msg: string) => void
    setIsCodeSent: (v: boolean) => void
  }) => void
  onVerifyCode: (params: {
    code: string
    setCodeErrorMessage: (msg: string) => void
    setIsCodeVerified: (v: boolean) => void
  }) => void
  onFindId: (params: {
    name: string
    phone: string
    setFindErrorMessage: (msg: string) => void
    setMaskedEmail: (email: string) => void
    setStep: (step: FindIdStep) => void
  }) => void
}

type FindIdModalProps = {
  isOpen: boolean
  onClose: () => void
  onFindPassword: () => void
  handlers: FindIdHandlers
}

const INITIAL_TIMER = 300

const formatTime = (seconds: number) => {
  const minute = Math.floor(seconds / 60)
  const second = seconds % 60

  return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}

const FindIdModal = ({
  isOpen,
  onClose,
  onFindPassword,
  handlers,
}: FindIdModalProps) => {
  const [step, setStep] = useState<FindIdStep>('form')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [codeErrorMessage, setCodeErrorMessage] = useState('')
  const [findErrorMessage, setFindErrorMessage] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIMER)

  const hasCodeError = Boolean(codeErrorMessage)
  const hasFindError = Boolean(findErrorMessage)

  useEffect(() => {
    if (!isOpen) {
      setStep('form')
      setName('')
      setPhone('')
      setCode('')
      setIsCodeSent(false)
      setIsCodeVerified(false)
      setCodeErrorMessage('')
      setFindErrorMessage('')
      setMaskedEmail('')
      setTimeLeft(INITIAL_TIMER)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !isCodeSent || timeLeft <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [isOpen, isCodeSent, timeLeft])

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)

    if (hasFindError) {
      setFindErrorMessage('')
    }
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '')
    setPhone(onlyNumbers)

    if (hasFindError) {
      setFindErrorMessage('')
    }
  }

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)

    if (hasCodeError) {
      setCodeErrorMessage('')
    }

    if (isCodeVerified) {
      setIsCodeVerified(false)
    }
  }

  const handleSendCodeBtnClick = () => {
    if (!name.trim() || !phone.trim()) {
      return
    }

    setIsCodeSent(false)
    setIsCodeVerified(false)
    setCodeErrorMessage('')
    setFindErrorMessage('')
    setCode('')
    setTimeLeft(INITIAL_TIMER)

    handlers.onSendCode({
      name,
      phone,
      setFindErrorMessage,
      setIsCodeSent,
    })
  }

  const handleVerifyCodeBtnClick = () => {
    if (!isCodeSent) {
      setCodeErrorMessage('인증번호를 먼저 전송해주세요.')
      return
    }

    if (!code.trim()) {
      setCodeErrorMessage('인증번호를 입력해주세요.')
      return
    }

    if (timeLeft <= 0) {
      setCodeErrorMessage('인증 시간이 만료되었습니다. 다시 전송해주세요.')
      setIsCodeVerified(false)
      return
    }

    handlers.onVerifyCode({
      code,
      setCodeErrorMessage,
      setIsCodeVerified,
    })
  }

  const handleFindIdBtnClick = () => {
    if (!name.trim() || !phone.trim()) {
      return
    }

    if (!isCodeSent) {
      setCodeErrorMessage('인증번호를 먼저 전송해주세요.')
      return
    }

    if (timeLeft <= 0) {
      setCodeErrorMessage('인증 시간이 만료되었습니다. 다시 전송해주세요.')
      setIsCodeVerified(false)
      return
    }

    if (!isCodeVerified) {
      setCodeErrorMessage('인증번호 확인을 완료해주세요.')
      return
    }

    handlers.onFindId({
      name,
      phone,
      setFindErrorMessage,
      setMaskedEmail,
      setStep,
    })
  }

  const renderFormContent = () => {
    return (
      <div className="flex flex-col gap-[32px] px-[24px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <FindIdIconSvg className="h-[28px] w-[28px]" />

          <div className="flex flex-col items-center gap-[12px]">
            <h2 className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              아이디 찾기
            </h2>

            {hasFindError && (
              <p className="text-other-red text-[14px] leading-[140%] font-normal tracking-[-0.03em] whitespace-pre-line">
                {findErrorMessage}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="find-id-name"
              className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]"
            >
              이름<span className="text-other-red">*</span>
            </label>

            <input
              id="find-id-name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력해주세요"
              autoComplete="off"
              className="text-ui-gray-primary placeholder:text-ui-gray-disabled border-ui-gray-disabled h-[48px] w-full rounded-[4px] border px-[16px] text-[14px] leading-[17px] outline-none [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#121212]"
            />
          </div>

          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="find-id-phone"
              className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]"
            >
              휴대전화<span className="text-other-red">*</span>
            </label>

            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[8px]">
                <input
                  id="find-id-phone"
                  type="text"
                  inputMode="numeric"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="숫자만 입력해주세요"
                  autoComplete="off"
                  className="text-ui-gray-primary placeholder:text-ui-gray-disabled border-ui-gray-disabled h-[48px] flex-1 rounded-[4px] border px-[16px] text-[14px] leading-[17px] outline-none [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#121212]"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="!text-ui-gray-700 !border-ui-gray-disabled !bg-ui-gray-200 !h-[48px] !w-[112px] !rounded-[4px] !border !px-0 !py-0 !text-[16px] !leading-[140%] !font-semibold"
                  onClick={handleSendCodeBtnClick}
                >
                  인증번호전송
                </Button>
              </div>

              <div className="flex gap-[8px]">
                <div className="relative flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="인증번호 6자리를 입력해주세요"
                    autoComplete="off"
                    className={`text-ui-gray-primary placeholder:text-ui-gray-disabled h-[48px] w-full rounded-[4px] border px-[16px] pr-[64px] text-[14px] leading-[17px] outline-none [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#121212] ${
                      hasCodeError
                        ? 'border-other-red'
                        : isCodeVerified
                          ? 'border-other-green'
                          : 'border-ui-gray-disabled'
                    }`}
                  />

                  {isCodeSent && (
                    <span className="text-other-red absolute top-1/2 right-[16px] -translate-y-1/2 text-[14px] leading-[17px] tracking-[-0.03em]">
                      {formatTime(timeLeft)}
                    </span>
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="!text-ui-gray-700 !border-ui-gray-disabled !bg-ui-gray-200 !h-[48px] !w-[112px] !rounded-[4px] !border !px-0 !py-0 !text-[16px] !leading-[140%] !font-semibold"
                  onClick={handleVerifyCodeBtnClick}
                >
                  인증번호확인
                </Button>
              </div>

              {hasCodeError && (
                <p className="text-other-red text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
                  {codeErrorMessage}
                </p>
              )}

              {isCodeVerified && !hasCodeError && (
                <p className="text-other-green text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
                  인증번호가 일치합니다.
                </p>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="fill"
          size="full"
          className="!h-[52px] !rounded-[4px] !p-0"
          onClick={handleFindIdBtnClick}
        >
          아이디 찾기
        </Button>
      </div>
    )
  }

  const renderSuccessContent = () => {
    return (
      <div className="flex flex-col gap-[32px] px-[24px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px] text-center">
          <FindIdIconSvg className="h-[28px] w-[28px]" />

          <div className="flex flex-col items-center gap-[12px]">
            <h2 className="text-ui-gray-primary text-[20px] leading-[140%] font-bold tracking-[-0.03em]">
              아이디 찾기
            </h2>

            <p className="text-ui-gray-600 text-[14px] leading-[140%] font-normal tracking-[-0.03em]">
              입력하신 정보와 일치하는 아이디입니다.
            </p>
          </div>
        </div>

        <div className="border-ui-gray-disabled bg-ui-gray-200 flex items-center justify-center rounded-[4px] border px-[16px] py-[20px]">
          <span className="text-ui-gray-primary text-[18px] leading-[140%] font-semibold tracking-[-0.03em]">
            {maskedEmail}
          </span>
        </div>

        <div className="flex gap-[12px]">
          <Button
            variant="outline"
            size="full"
            className="!h-[48px] !rounded-[4px] !bg-white !p-0"
            onClick={onClose}
          >
            로그인
          </Button>

          <Button
            variant="fill"
            size="full"
            className="!h-[48px] !rounded-[4px] !p-0"
            onClick={() => {
              onClose()
              onFindPassword()
            }}
          >
            비밀번호 찾기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="w-[396px]">
      {step === 'form' && renderFormContent()}
      {step === 'success' && renderSuccessContent()}
    </Modal>
  )
}

export default FindIdModal
