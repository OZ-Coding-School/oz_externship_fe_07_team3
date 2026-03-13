import Button from '@/components/ui/button'
import type { MyInfoResponse, UpdateMyInfoRequest } from '@/types'
import { useEffect, useState } from 'react'
import profileViewIcon from '../../assets/icons/profileViewIcon.svg'
import cameraIcon from '../../assets/icons/cameraIcon.svg'
import InputField from '@/components/common/InputField'

type MyInfoEditProps = {
  myInfo: MyInfoResponse
  isPending: boolean
  onSubmit: (payload: UpdateMyInfoRequest) => void
}

export default function MyInfoEdit({
  myInfo,
  isPending,
  onSubmit,
}: MyInfoEditProps) {
  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState<'M' | 'F'>('M')

  useEffect(() => {
    setNickname(myInfo.nickname ?? '')
    setName(myInfo.name ?? '')
    setBirthday(myInfo.birthday ?? '')
    setGender(myInfo.gender ?? 'M')
  }, [myInfo])

  const handleSubmit = () => {
    onSubmit({
      nickname,
      name,
      birthday,
      gender,
    })
  }

  return (
    <section className="w-186">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-gray-primary text-[32px] font-bold">내 정보</h1>

        <Button
          type="button"
          variant="fill"
          size="md"
          disabled={isPending}
          onClick={handleSubmit}
          className="h-12 w-32 rounded-lg px-9 py-5 text-base font-semibold"
        >
          {isPending ? '저장중...' : '저장하기'}
        </Button>
      </div>

      <section className="mb-5 rounded-xl border border-gray-200 bg-white px-11 py-13">
        <h2 className="text-primary-400 mb-13 border-b border-gray-200 pb-4 text-xl font-bold">
          프로필 수정
        </h2>

        <div className="flex flex-col items-center">
          <div className="relative mb-13 h-46 w-46 rounded-full bg-violet-100">
            {myInfo.profile_img_url ? (
              <img
                src={myInfo.profile_img_url}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <div>
                <img
                  src={profileViewIcon}
                  alt="프로필 이미지"
                  className="h-full w-full"
                />
              </div>
            )}

            <button
              type="button"
              className="absolute right-0 bottom-0 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-sm shadow-sm"
            >
              <img src={cameraIcon} alt="카메라 이미지" className="h-13 w-13" />
            </button>
          </div>

          <div className="w-full space-y-10">
            <div>
              <div className="flex gap-3">
                <InputField
                  id="nickname"
                  value={nickname}
                  status="default"
                  helperText="*한글 8자, 영문 및 숫자 16자까지 혼용할 수 있어요"
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={nickname}
                  label="닉네임"
                  fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
                  fieldHelperTextClassName="text-ui-gray-400 mt-2 text-xs font-medium"
                />
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="bg-ui-gray-200 border-ui-gray-250 border px-5 py-4 text-base"
                  >
                    중복확인
                  </Button>
                </div>
              </div>
            </div>

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
                onChange={(e) => setName(e.target.value)}
                placeholder={name}
                label="이름"
                fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
                disabled
              />
            </div>

            <div className="flex gap-3">
              <InputField
                id="phone_number"
                value={myInfo.phone_number}
                label="휴대전화"
                fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
              />
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="px-7 py-4"
                >
                  변경
                </Button>
              </div>
            </div>

            <div>
              <p className="text-ui-gray-primary mb-2 block text-base font-normal">
                성별
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setGender('M')}
                  disabled
                  className={`flex h-10.5 min-w-20 items-center justify-center rounded-[100px] border px-7 py-4 text-base font-semibold ${
                    gender === 'M'
                      ? 'border-primary-default bg-primary-100 text-primary-default'
                      : 'bg-ui-gray-200 border-ui-gray-250 text-ui-gray-600'
                  }`}
                >
                  남
                </button>

                <button
                  type="button"
                  disabled
                  onClick={() => setGender('F')}
                  className={`flex h-10.5 min-w-20 items-center justify-center rounded-full border px-7 py-4 text-base font-semibold ${
                    gender === 'F'
                      ? 'border-violet-500 bg-violet-50 text-violet-600'
                      : 'bg-ui-gray-200 border-ui-gray-250 text-ui-gray-600'
                  }`}
                >
                  여
                </button>
              </div>
            </div>

            <InputField
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder={birthday}
              label="생년월일"
              disabled
              fieldLabelClassName="text-ui-gray-primary block text-base font-normal"
            />
          </div>
        </div>
      </section>
    </section>
  )
}
