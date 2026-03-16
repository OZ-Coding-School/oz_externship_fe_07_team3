import { Link } from 'react-router'
import Logo from '@/assets/images/logo.png'
import UserMenu from '@/features/mypage/UserMenu'

function Header() {
  return (
    <header className="border-b border-gray-200">
      <section className="bg-ui-gray-800 text-grey-1 flex h-12 w-full items-center justify-center text-base">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </section>

      <section className="text-ui-gray-600 flex h-16 w-full items-center justify-between px-90 text-[18px] whitespace-nowrap">
        <div className="flex items-center gap-15">
          <h1 className="shrink-0">
            <img
              className="h-auto w-[120px] object-contain"
              src={Logo}
              alt="logo"
            />
          </h1>

          <nav aria-label="주요 메뉴">
            <ul className="flex gap-15">
              <li className="py-4">
                <Link to="/community">커뮤니티</Link>
              </li>
              <li className="py-4">
                <Link to="/qna">질의응답</Link>
              </li>
            </ul>
          </nav>
        </div>

        <nav aria-label="사용자 메뉴">
          <ul className="flex items-center gap-2">
            {/* TODO: 로그인 여부에 따른 분기처리 예정 */}
            <UserMenu />
            <li className="py-4">
              <Link to="/login">로그인</Link>
            </li>
            <li className="text-xl">|</li>
            <li className="py-4">
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  )
}

export default Header
