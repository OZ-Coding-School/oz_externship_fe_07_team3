import type { EnrolledCourseResponse } from '@/types'

type EnrolledCourseCardProps = {
  course: EnrolledCourseResponse
}

export default function EnrolledCourseCard({
  course,
}: EnrolledCourseCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg">
      <div className="min-w-0">
        <p className="text-ui-gray-disabled mb-2 text-sm">
          익스턴십 개발 캠프 · 오즈코딩
        </p>
        <p className="text-ui-gray-primary text-base font-medium">
          {`${course.course.name} <${course.course.id}기>`}
        </p>
      </div>

      <div className="h-25 w-38 rounded-md bg-gray-100">
        {course.course.thumbnail_img_url ? (
          <img
            src={course.course.thumbnail_img_url}
            alt={course.course.name}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
    </div>
  )
}
