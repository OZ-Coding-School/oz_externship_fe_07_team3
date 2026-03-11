import NotFoundImage from '@/assets/images/not-found.svg?react'
import EmptyState from '@/components/common/EmptyState'
import Button from '@/components/ui/button'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import { Link } from 'react-router-dom'

/**
 * 404페이지
 */
export default function NotFoundPage() {
  return (
    <EmptyState
      icon={<NotFoundImage />}
      title="페이지를 불러올 수 없어요."
      description="잠시 뒤 다시 시도해보세요!"
      action={
        <Link to={ROUTES_PATHS.HOME_PAGE}>
          <Button variant="notFound" size="sm" className="h-2 p-5">
            홈으로
          </Button>
        </Link>
      }
      className="min-h-screen"
    />
  )
}
