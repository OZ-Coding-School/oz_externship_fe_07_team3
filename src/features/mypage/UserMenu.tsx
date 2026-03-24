import { useState } from 'react'
import profileViewIcon from '../../assets/icons/profileViewIcon.svg'
import Button from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import type { SelectedCourseRegisterValue } from '@/types/api-response/course'
import CourseRegisterModal from './student-register/CourseRegisterModal'
import { useLogout } from '@/api/queries/myInfo/useLogout'
import { toast } from 'sonner'
import { useGetMyInfo } from '@/api/queries/myInfo/useGetMyInfo'

export default function UserMenu() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedRegisterValue, setSelectedRegisterValue] =
    useState<SelectedCourseRegisterValue>({
      courseId: null,
      cohortId: null,
    })

  const navigate = useNavigate()
  const logoutMutation = useLogout()
  const { data: userData } = useGetMyInfo()

  const handleOpenRegisterModal = () => {
    setShowUserMenu(false)
    setIsRegisterModalOpen(true)
  }

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false)
  }

  const handleLogout = async () => {
    try {
      const result = await logoutMutation.mutateAsync()

      setShowUserMenu(false)
      toast.success(result.detail ?? '로그아웃 되었습니다.')

      /**
       * TODO: 로그인 기능 완료 후 추가
       *
       * 1. 필요 시 인증 상태 제거
       * 2. 필요 시 유저 관련 캐시 제거
       * queryClient.removeQueries({ queryKey: MY_INFO_QUERY_KEY })
       * 3. store 정리 필요
       * store.removeToken
       */

      navigate(ROUTES_PATHS.LOGIN_PAGE)
    } catch {
      toast.error('로그아웃에 실패했습니다.')
    }
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowUserMenu((prev) => !prev)}
          className="flex cursor-pointer"
        >
          <div className="h-10 w-10">
            <img
              src={
                !imageError && userData?.profile_img_url
                  ? userData.profile_img_url
                  : profileViewIcon
              }
              alt="유저아이콘"
              className="rounded-full"
              onError={() => {
                setImageError(true)
              }}
            />
          </div>
        </button>

        {showUserMenu && (
          <div className="absolute left-40 mt-6 flex -translate-x-3/4 flex-col rounded-2xl border border-gray-200 bg-white px-4 py-6 shadow-lg">
            <div className="mb-5">
              <span className="text-ui-gray-primary block text-xl font-bold">
                {userData?.nickname ?? '사용자'}
              </span>
              <span className="text-ui-gray-400 block text-sm font-normal">
                {userData?.email ?? ''}
              </span>
            </div>

            <hr className="mb-2 border-gray-200" />

            <Button
              type="button"
              variant="sidebarTab"
              size="sidebarTab"
              className="w-full rounded-none px-2 py-2.5 text-sm font-normal"
              onClick={handleOpenRegisterModal}
            >
              수강생 등록
            </Button>
            <Link
              to={ROUTES_PATHS.MY_PAGE}
              onClick={() => setShowUserMenu(false)}
            >
              <Button
                type="button"
                variant="sidebarTab"
                size="sidebarTab"
                className="w-full rounded-none px-2 py-2.5 text-sm font-normal"
              >
                마이페이지
              </Button>
            </Link>

            <Button
              type="button"
              variant="sidebarTab"
              size="sidebarTab"
              className="w-full rounded-none px-2 py-2.5 text-sm font-normal"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
            </Button>
          </div>
        )}
      </div>
      <CourseRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        value={selectedRegisterValue}
        onChange={setSelectedRegisterValue}
        onImageError={() => setImageError(true)}
      />
    </>
  )
}
