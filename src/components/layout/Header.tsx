import { logout as logoutApi } from '@/api/mypage'
import Logo from '@/assets/images/logo.png'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import UserMenu from '@/features/mypage/UserMenu'
import { useAuthStore } from '@/store/authStore'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const accessToken = useAuthStore((state) => state.accessToken)
  const logout = useAuthStore((state) => state.logout)

  const isLoggedIn = Boolean(accessToken)

  const handleLogout = async () => {
    try {
      await logoutApi()
    } catch {
      // 로그아웃 API 실패 여부와 관계없이 클라이언트 로그아웃은 진행한다.
    } finally {
      logout()
      queryClient.clear()
      navigate(ROUTES_PATHS.LOGIN_PAGE)
    }
  }

  return (
    <header className="border-b border-gray-200">
      <section className="bg-ui-gray-800 text-grey-1 flex h-12 w-full items-center justify-center text-base">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </section>

      <section className="text-ui-gray-600 flex h-16 w-full min-w-170 items-center justify-between px-10 text-[18px] whitespace-nowrap md:px-20 xl:px-90">
        <div className="flex items-center gap-15">
          <h1 className="shrink-0">
            <Link to="/">
              <img
                className="h-auto w-30 object-contain"
                src={Logo}
                alt="logo"
              />
            </Link>
          </h1>

          <nav aria-label="주요 메뉴">
            <ul className="flex gap-15">
              <li className="py-4">
                <a href="https://community.ozcodingschool.site/posts">
                  커뮤니티
                </a>
              </li>
              <li className="py-4">
                <a href="https://qna.ozcodingschool.site/qna">질의응답</a>
              </li>
            </ul>
          </nav>
        </div>

        <nav aria-label="사용자 메뉴">
          <ul className="flex items-center gap-2">
            {/* 수정: 로그인 여부에 따라 분기 */}
            {isLoggedIn ? (
              <>
                <UserMenu />
                <li className="py-4">
                  <button type="button" onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="py-4">
                  <Link to={ROUTES_PATHS.LOGIN_PAGE}>로그인</Link>
                </li>
                <li className="text-xl">|</li>
                <li className="py-4">
                  <Link to={ROUTES_PATHS.SIGNUP_PAGE}>회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </header>
  )
}

export default Header
