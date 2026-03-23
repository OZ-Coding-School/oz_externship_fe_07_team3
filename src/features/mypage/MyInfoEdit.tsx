import Button from '@/components/ui/button'
import type { MyInfoResponse, UpdateMyInfoRequest } from '@/types'
import { useEffect, useState } from 'react'
import profileViewIcon from '../../assets/icons/profileViewIcon.svg'
import cameraIcon from '../../assets/icons/cameraIcon.svg'
import InputField from '@/components/common/InputField'
import { useImageUpload } from '@/hooks/useImageUpload'
import { toast } from 'sonner'
import PhoneVerifySection from './PhoneVerifySection'
import { cn } from '@/lib/utils'
import NicknameFieldWithCheck from './NickNameFieldWithCheck'
import {
  formatBirthdayInput,
  updateMyInfoFormSchema,
} from '@/schemas/updateMyInfoSchema'
import {
  parseUpdateMyInfoError,
  type MyInfoFieldErrors,
} from '@/utils/parseUpdateMyInfoError'
import { useChangePhone } from '@/api/queries/myInfo/useChangePhone'
import { useUploadProfileImage } from '@/api/queries/myInfo/useProfileImage'
import { GENDER_OPTIONS } from '@/constants/genderOptions'

type MyInfoEditProps = {
  myInfo: MyInfoResponse
  isPending: boolean
  onSubmit: (payload: UpdateMyInfoRequest) => Promise<void>
}

export default function MyInfoEdit({
  myInfo,
  isPending,
  onSubmit,
}: MyInfoEditProps) {
  const [nickname, setNickname] = useState(myInfo.nickname ?? '')
  const [isNicknameVerified, setIsNicknameVerified] = useState(false)

  const [name, setName] = useState(myInfo.name ?? '')
  const [birthday, setBirthday] = useState(myInfo.birthday ?? '')
  const [gender, setGender] = useState<'M' | 'F'>(myInfo.gender ?? 'M')
  const [phoneNumber, setPhoneNumber] = useState(myInfo.phone_number ?? '')
  const [verifiedPhoneToken, setVerifiedPhoneToken] = useState<string | null>(
    null
  )
  const [errors, setErrors] = useState<MyInfoFieldErrors>({})

  const changePhoneMutation = useChangePhone()
  const uploadProfileImageMutation = useUploadProfileImage()

  useEffect(() => {
    setNickname(myInfo.nickname ?? '')
    setIsNicknameVerified(true)
    setName(myInfo.name ?? '')
    setBirthday(myInfo.birthday ?? '')
    setGender(myInfo.gender ?? 'M')
    setPhoneNumber(myInfo.phone_number ?? '')
    setVerifiedPhoneToken(null)
    setErrors({})
  }, [myInfo])

  const handleSubmit = async () => {
    try {
      const parsed = updateMyInfoFormSchema.safeParse({
        nickname,
        name,
        birthday,
        gender,
      })

      if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors

        setErrors({
          nickname: fieldErrors.nickname?.[0],
          name: fieldErrors.name?.[0],
          birthday: fieldErrors.birthday?.[0],
          gender: fieldErrors.gender?.[0],
        })

        toast.error('입력값을 다시 확인해주세요.')
        return
      }
      /**
       * 닉네임이 변경된 경우 중복확인 완료 여부 체크
       */
      const isNicknameChanged =
        nickname.trim() !== (myInfo.nickname ?? '').trim()

      if (isNicknameChanged && !isNicknameVerified) {
        setErrors((prev) => ({
          ...prev,
          nickname: '닉네임 중복확인을 완료해주세요.',
        }))
        toast.error('닉네임 중복확인을 완료해주세요.')
        return
      }
      /**
       * 휴대전화 번호를 변경한 경우에만 change-phone API 호출
       * 토큰이 없으면 기존 번호 유지로 간주
       */
      if (verifiedPhoneToken) {
        const result = await changePhoneMutation.mutateAsync({
          phone_verify_token: {
            token: verifiedPhoneToken,
          },
        })

        setPhoneNumber(result.phone_number)
        setVerifiedPhoneToken(null)
      }
      setErrors({})

      await onSubmit({
        nickname: parsed.data.nickname.trim(),
        name: parsed.data.name.trim(),
        birthday: parsed.data.birthday,
        gender: parsed.data.gender,
      })

      toast.success('내 정보가 저장되었습니다.')
    } catch (error) {
      const parsedError = parseUpdateMyInfoError(error)

      if (
        parsedError.nickname ||
        parsedError.name ||
        parsedError.birthday ||
        parsedError.gender
      ) {
        setErrors(parsedError)
      }

      toast.error(parsedError.common ?? '저장에 실패했습니다.')
    }
  }

  const { fileInputRef, preview, handleOpenFilePicker, handleChangeImage } =
    useImageUpload({
      initialPreview: myInfo.profile_img_url ?? null,
      onChange: async (file) => {
        if (!file) {
          return
        }

        try {
          await uploadProfileImageMutation.mutateAsync(file)
          toast.success('프로필 사진이 등록되었습니다.')
        } catch {
          toast.error('프로필 사진 업로드에 실패했습니다.')
        }
      },
    })

  const isSubmitDisabled =
    isPending ||
    changePhoneMutation.isPending ||
    uploadProfileImageMutation.isPending

  const handleChangeGender = (value: 'M' | 'F') => {
    setGender(value)
    setErrors((prev) => ({ ...prev, gender: undefined }))
  }

  return (
    <section className="w-186">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-gray-primary text-[32px] font-bold">내 정보</h1>
        <Button
          type="button"
          variant="fill"
          size="md"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className="h-12 w-32 rounded-lg px-9 py-5 text-base font-semibold"
        >
          {isPending || changePhoneMutation.isPending
            ? '저장중...'
            : '저장하기'}
        </Button>
      </div>

      <section className="mb-5 rounded-xl border border-gray-200 bg-white px-11 py-13">
        <h2 className="text-primary-400 mb-13 border-b border-gray-200 pb-4 text-xl font-bold">
          프로필 수정
        </h2>
        <div className="flex flex-col items-center">
          <div className="relative mb-13 h-46 w-46">
            <div className="h-full w-full overflow-hidden rounded-full bg-violet-100">
              {preview ? (
                <img
                  src={preview}
                  alt="프로필 이미지"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={profileViewIcon}
                  alt="프로필 이미지"
                  className="h-full w-full"
                />
              )}
              <button
                type="button"
                onClick={handleOpenFilePicker}
                aria-label="프로필 이미지 선택"
                disabled={uploadProfileImageMutation.isPending}
                className="absolute right-0 bottom-0 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-sm shadow-sm"
              >
                <img
                  src={cameraIcon}
                  alt="카메라 이미지"
                  className="h-13 w-13"
                />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                onChange={handleChangeImage}
              />
            </div>
          </div>
          <div className="w-full space-y-10">
            {/**
             * 닉네임 인풋과 버튼 컴포넌트
             * id - 인풋 id
             * value - 인풋 value
             * initialValue - 초기 value 값
             * onChange - 인풋값이 변경 상태
             * onVerifiedChange - 중복 확인 상태
             */}
            <NicknameFieldWithCheck
              id="myInfo-nickname"
              value={nickname}
              initialValue={myInfo.nickname ?? ''}
              onChange={(value) => {
                setNickname(value)
                setErrors((prev) => ({ ...prev, nickname: undefined }))
              }}
              onVerifiedChange={setIsNicknameVerified}
              externalError={errors.nickname}
            />

            <div className="mb-25 flex flex-col gap-2">
              <InputField
                id="email"
                value={myInfo.email}
                status="default"
                label="이메일(아이디)"
                fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
                disabled
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-primary-400 border-ui-gray-disabled mb-13 border-b pb-4 text-xl font-bold">
            개인 정보 수정
          </h3>
          <div className="space-y-6">
            <div>
              <InputField
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setErrors((prev) => ({ ...prev, name: undefined }))
                }}
                status={errors.name ? 'danger' : 'default'}
                placeholder="이름을 입력해주세요"
                label="이름"
                helperText={errors.name}
                fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
              />
            </div>

            <PhoneVerifySection
              phoneNumber={phoneNumber}
              onChangePhoneNumber={setPhoneNumber}
              onVerifiedTokenChange={setVerifiedPhoneToken}
            />

            <div>
              <p className="text-ui-gray-primary mb-2 block text-base font-normal">
                성별
              </p>
              <div className="flex gap-3">
                {GENDER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChangeGender(option.value)}
                    className={cn(
                      'flex h-10.5 min-w-20 cursor-pointer items-center justify-center rounded-full border px-7 py-4 text-base font-semibold',
                      gender === option.value
                        ? option.activeClassName
                        : 'bg-ui-gray-200 border-ui-gray-250 text-ui-gray-600'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <InputField
              id="birthday"
              value={birthday}
              onChange={(e) => {
                setBirthday(formatBirthdayInput(e.target.value))
                setErrors((prev) => ({ ...prev, birthday: undefined }))
              }}
              placeholder="숫자 8자리를 입력해주세요."
              label="생년월일"
              status={errors.birthday ? 'danger' : 'default'}
              helperText={
                errors.birthday ?? '생년월일 8자리를 숫자로 입력해주세요.'
              }
              fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
            />
          </div>
        </div>
      </section>
    </section>
  )
}
