import { useState } from 'react'
import profileViewIcon from '../../assets/icons/profileViewIcon.svg'
import Button from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import type { SelectedCourseRegisterValue } from '@/types/api-response/course'
import CourseRegisterModal from './student-register/CourseRegisterModal'

export default function UserMenu() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedRegisterValue, setSelectedRegisterValue] =
    useState<SelectedCourseRegisterValue>({
      courseId: null,
      cohortId: null,
    })
  /**
   * TODO: userData 추가 예정
   * ex) const { data: userData } = useUser...()
   */
  const userData = null

  const handleOpenRegisterModal = () => {
    setShowUserMenu(false)
    setIsRegisterModalOpen(true)
  }

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false)
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex cursor-pointer"
        >
          <div className="h-10 w-10">
            <img
              src={!imageError && userData ? '' : profileViewIcon}
              alt="유저아이콘"
              className="rounded-full"
              onError={() => {
                setImageError(true)
              }}
            />
          </div>
        </button>

        {showUserMenu && (
          <div className="absolute left-0 mt-6 flex -translate-x-3/4 flex-col rounded-2xl border border-gray-200 bg-white px-4 py-6 shadow-lg">
            <div className="mb-5">
              <span className="text-ui-gray-primary block text-xl font-bold">
                {/* TODO: 유저 닉네임 */}
                {/* {userData?.nickname} */}
                오조오조
              </span>
              <span className="text-ui-gray-400 block text-sm font-normal">
                {/* TODO: 유저 이메일 */}
                {/* {userData?.email} */}
                ozschool1234567@gmail.com
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
            <Link to={ROUTES_PATHS.MY_PAGE}>
              <Button
                type="button"
                variant="sidebarTab"
                size="sidebarTab"
                onClick={() => '/test'}
                className="w-full rounded-none px-2 py-2.5 text-sm font-normal"
              >
                마이페이지
              </Button>
            </Link>
            {/**
             * TODO: 로그아웃 기능 추가 예정
             */}
            <Button
              type="button"
              variant="sidebarTab"
              size="sidebarTab"
              className="w-full rounded-none px-2 py-2.5 text-sm font-normal"
            >
              로그아웃
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
