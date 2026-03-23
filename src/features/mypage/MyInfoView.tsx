import Button from '@/components/ui/button'
import type {
  DeleteMyAccountRequest,
  EnrolledCourseResponse,
  MyInfoResponse,
} from '@/types'
import profileViewIcon from '../../assets/icons/profileViewIcon.svg'
import EnrolledCourseCard from './EnrolledCourseCard'
import DeleteUserAccountModal from './delete-user/DeleteUserAccountModal'
import { useState } from 'react'
import { toast } from 'sonner'
import { useDeleteMyAccount } from '@/api/queries/myInfo/useDeleteMyAccount'

type MyInfoViewProps = {
  myInfo: MyInfoResponse
  enrolledCourses: EnrolledCourseResponse[]
  onEdit: () => void
}

const genderLabelMap = {
  M: '남자',
  F: '여자',
}

export default function MyInfoView({
  myInfo,
  enrolledCourses,
  onEdit,
}: MyInfoViewProps) {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  const { mutate: deleteMyAccountMutate, isPending } = useDeleteMyAccount()

  const handleWithdrawSubmit = (payload: DeleteMyAccountRequest) => {
    deleteMyAccountMutate(payload, {
      onSuccess: () => {
        toast.success('회원 탈퇴가 완료되었습니다.')

        setIsWithdrawModalOpen(false)

        /**
         * TODO:
         * - 로그아웃 처리
         * - 토큰 제거
         * - 메인/로그인 페이지 이동
         * - 토스트 표시
         */
      },
      onError: () => {
        toast.error('회원 탈퇴에 실패했습니다.')
      },
    })
  }
  return (
    <>
      <section className="w-186">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-gray-primary text-[32px] font-bold">내 정보</h1>
          <Button
            onClick={onEdit}
            variant="fill"
            size="md"
            className="h-12 w-32 rounded-lg px-9 py-5 text-base font-semibold"
          >
            수정하기
          </Button>
        </div>

        <div className="space-y-6">
          <section className="mb-5 rounded-xl border border-gray-200 bg-white px-11 py-13">
            <h2 className="text-primary-400 mb-13 border-b border-gray-200 pb-4 text-xl font-bold">
              프로필
            </h2>

            <div className="flex flex-col items-center">
              <div className="mb-13 h-46 w-46 overflow-hidden rounded-full bg-violet-100">
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
              </div>

              <div className="w-full space-y-10">
                <div className="grid grid-cols-[200px_1fr] items-center gap-y-10">
                  <p className="text-gray-primary text-lg">닉네임</p>
                  <p className="text-gray-primary text-base">
                    {myInfo.nickname}
                  </p>
                </div>

                <div className="grid grid-cols-[200px_1fr] items-center gap-y-10">
                  <p className="text-gray-primary text-lg">이메일</p>
                  <p className="text-gray-primary text-base">{myInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-25">
              <h3 className="text-primary-400 mb-13 border-b border-gray-200 pb-4 text-xl font-bold">
                개인 정보
              </h3>

              <div className="space-y-5">
                <div className="grid grid-cols-[200px_1fr] items-center">
                  <p className="text-gray-primary text-lg">이름</p>
                  <p className="text-gray-primary text-base">{myInfo.name}</p>
                </div>

                <div className="grid grid-cols-[200px_1fr] items-center">
                  <p className="text-gray-primary text-lg">휴대전화</p>
                  <p className="text-gray-primary text-base">
                    {myInfo.phone_number}
                  </p>
                </div>

                <div className="grid grid-cols-[200px_1fr] items-center">
                  <p className="text-gray-primary text-lg">성별</p>
                  <p className="text-gray-primary text-base">
                    {genderLabelMap[myInfo.gender]}
                  </p>
                </div>

                <div className="grid grid-cols-[200px_1fr] items-center">
                  <p className="text-gray-primary text-lg">생년월일</p>
                  <p className="text-gray-primary text-base">
                    {myInfo.birthday}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-13 rounded-lg border border-gray-200 bg-white px-11 py-13">
            <h2 className="text-primary-400 mb-10 border-b border-gray-200 pb-4 text-xl font-bold">
              수강 중인 과정
            </h2>

            <div>
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course, index) => (
                  <EnrolledCourseCard
                    key={`${course.course.id}-${course.cohort.id}-${index}`}
                    course={course}
                  />
                ))
              ) : (
                <p className="text-xl text-gray-400">
                  수강 중인 과정이 없습니다.
                </p>
              )}
            </div>
          </section>

          <section className="mb-35 flex items-end justify-between rounded-lg border border-transparent py-12">
            <div>
              <p className="text-ui-gray-400 mb-8 text-xl font-medium">
                회원 탈퇴 안내
              </p>
              <p className="text-ui-gray-disabled text-sm font-medium">
                탈퇴 처리 시, 수강 기록 / 포인트 / 쿠폰은 소멸되며 복구되지
                않습니다.
                <br />
                필요한 경우, 탈퇴 신청 전 문의해 주세요.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => setIsWithdrawModalOpen(true)}
              variant="ghost"
              size="md"
              className="bg-ui-gray-200 text-ui-gray-600 rounded-lg px-7 py-4 text-base font-semibold"
            >
              회원 탈퇴하기
            </Button>
          </section>
        </div>
      </section>
      <DeleteUserAccountModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onSubmit={handleWithdrawSubmit}
        isPending={isPending}
      />
    </>
  )
}
