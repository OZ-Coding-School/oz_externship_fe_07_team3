import NotFoundImage from '@/assets/images/not-found.svg?react'
import Button from '@/components/ui/button'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import { Link } from 'react-router-dom'

/**
 * 404페이지
 */
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 text-center">
      <NotFoundImage />
      <div className="text-base font-medium text-gray-400">
        <p>페이지를 불러올 수 없어요.</p>
        <p>잠시 뒤 다시 시도해보세요!</p>
      </div>
      <Link to={ROUTES_PATHS.HOME_PAGE}>
        <Button variant="notFound" size="sm" className="h-2 p-5">
          홈으로
        </Button>
      </Link>
    </div>
  )
}
