import { useEffect, useState, type ChangeEvent } from 'react'

import Button from '@/components/ui/button'
import InputField from '@/components/common/InputField'
import { cn } from '@/lib/utils'
import { useCheckNickName } from '@/api/queries/useCheckNickName'
import { NICKNAME_HELPTER_TEXT } from '@/constants/nickNameHelperText'
import { AxiosError } from 'axios'

type NicknameFieldWithCheckProps = {
  id?: string
  value: string
  initialValue?: string
  onChange: (value: string) => void
  onVerifiedChange?: (isVerified: boolean) => void
}

type NicknameCheckStatus = 'default' | 'success' | 'danger'

/**
 * 닉네임 인풋과 버튼 - 중복 기능 구현
 */
export default function NicknameFieldWithCheck({
  id,
  value,
  initialValue = '',
  onChange,
  onVerifiedChange,
}: NicknameFieldWithCheckProps) {
  const [status, setStatus] = useState<NicknameCheckStatus>('default')
  const [helperText, setHelperText] = useState(NICKNAME_HELPTER_TEXT.default)
  const [lastCheckedNickname, setLastCheckedNickname] = useState('')

  const checkNicknameMutation = useCheckNickName()

  const trimmedValue = value.trim()
  const trimmedInitialValue = initialValue.trim()

  const isInitialNickname = trimmedValue === trimmedInitialValue
  const isVerified =
    !!trimmedValue &&
    (isInitialNickname ||
      (status === 'success' && trimmedValue === lastCheckedNickname))

  useEffect(() => {
    onVerifiedChange?.(isVerified)
  }, [isVerified, onVerifiedChange])

  useEffect(() => {
    setStatus('default')
    setHelperText(NICKNAME_HELPTER_TEXT.default)
    setLastCheckedNickname('')
  }, [initialValue])

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    onChange(nextValue)

    if (nextValue.trim() !== lastCheckedNickname) {
      setStatus('default')
      setHelperText(NICKNAME_HELPTER_TEXT.default)
    }
  }

  const handleCheckNickname = async () => {
    if (!trimmedValue) {
      setStatus('danger')
      setHelperText(NICKNAME_HELPTER_TEXT.empty)
      return
    }

    try {
      const result = await checkNicknameMutation.mutateAsync({
        nickname: trimmedValue,
      })

      setStatus('success')
      setHelperText(result.detail)
      setLastCheckedNickname(trimmedValue)
    } catch (error) {
      let message = NICKNAME_HELPTER_TEXT.danger

      if (error instanceof AxiosError) {
        const errorDetail = error.response?.data?.error_detail

        if (typeof errorDetail === 'string') {
          message = errorDetail
        }

        if (
          errorDetail &&
          typeof errorDetail === 'object' &&
          'nickname' in errorDetail &&
          Array.isArray(errorDetail.nickname)
        ) {
          message = errorDetail.nickname[0]
        }
      }

      setStatus('danger')
      setHelperText(message)
    }
  }

  const buttonDisabled =
    checkNicknameMutation.isPending || !trimmedValue || isVerified

  const inputStatus = isInitialNickname ? 'default' : status

  const inputHelperText = isInitialNickname
    ? NICKNAME_HELPTER_TEXT.default
    : helperText

  return (
    <div>
      <div className="flex gap-3">
        <InputField
          id={id}
          value={value}
          status={inputStatus}
          helperText={inputHelperText}
          onChange={handleChangeNickname}
          placeholder="닉네임을 입력해주세요"
          label="닉네임"
          fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
          fieldHelperTextClassName="mt-1 text-xs font-medium"
        />
        <div className="flex items-center">
          <Button
            type="button"
            variant={isVerified ? 'ghost' : 'outline'}
            size="sm"
            disabled={buttonDisabled}
            onClick={handleCheckNickname}
            className={cn(
              'h-12 w-28 rounded-lg px-5 py-4 text-base',
              isVerified &&
                'border-grey-9 bg-grey-7 text-grey-9 hover:bg-grey-7'
            )}
          >
            {checkNicknameMutation.isPending ? '확인중...' : '중복확인'}
          </Button>
        </div>
      </div>
    </div>
  )
}
