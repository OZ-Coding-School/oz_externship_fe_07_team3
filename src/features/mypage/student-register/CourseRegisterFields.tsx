import { useMemo } from 'react'

import type {
  AvailableCourseItem,
  CourseOption,
  SelectedCourseRegisterValue,
} from '@/types/api-response/course'
import CourseSelectDropdown from './CourseSelectDropdown'
import { useGetAvailableCourses } from '@/api/queries/enrolled-student/useGetAvailableCourses'

type CourseRegisterFieldsProps = {
  value: SelectedCourseRegisterValue
  onChange: (value: SelectedCourseRegisterValue) => void
}

/**
 * 수강생 등록 모달에서 사용되는 드롭다운을 구성하기 위한 필드 컴포넌트
 */
export default function CourseRegisterFields({
  value,
  onChange,
}: CourseRegisterFieldsProps) {
  const { data = [], isPending, isError } = useGetAvailableCourses()
  const courseOptions = useMemo<CourseOption[]>(() => {
    const uniqueCourses = new Map<number, string>()

    data.forEach((item: AvailableCourseItem) => {
      if (!uniqueCourses.has(item.course.id)) {
        uniqueCourses.set(item.course.id, item.course.name)
      }
    })

    return Array.from(uniqueCourses.entries()).map(([id, name]) => ({
      id,
      name,
    }))
  }, [data])

  const cohortOptions = useMemo<CourseOption[]>(() => {
    if (!value.courseId) return []

    return data
      .filter((item) => item.course.id === value.courseId)
      .map((item) => ({
        id: item.cohort.id,
        name: `${item.cohort.number}기`,
      }))
  }, [data, value.courseId])

  if (isPending) {
    return (
      <div className="flex flex-col gap-5">
        <div className="text-ui-gray-400 w-87 rounded-md border border-gray-200 px-4 py-3 text-sm">
          수강중인 과정을 불러오는 중입니다.
        </div>
        <div className="text-ui-gray-400 w-87 rounded-md border border-gray-200 px-4 py-3 text-sm">
          기수를 불러오는 중입니다.
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-87 rounded-md border border-red-200 px-4 py-3 text-sm text-red-500">
        과정 정보를 불러오지 못했습니다.
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <CourseSelectDropdown
        options={courseOptions}
        value={value.courseId}
        placeholder="수강중인 과정을 선택해 주세요."
        onChange={(selectedCourse) => {
          onChange({
            courseId: selectedCourse.id,
            cohortId: null,
          })
        }}
      />

      <CourseSelectDropdown
        options={cohortOptions}
        value={value.cohortId}
        placeholder="기수를 선택해 주세요."
        disabled={!value.courseId}
        onChange={(selectedCohort) => {
          onChange({
            courseId: value.courseId,
            cohortId: selectedCohort.id,
          })
        }}
      />
    </div>
  )
}
