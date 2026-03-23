import { useState } from 'react'

import MyInfoView from './MyInfoView'
import MyInfoEdit from './MyInfoEdit'
import Loading from '@/components/common/loading/Loading'
import { useGetMyEnrolledCourses } from '@/api/queries/enrolled-student/useGetMyEnrolledCourses'
import { useGetMyInfo } from '@/api/queries/myInfo/useGetMyInfo'
import { usePatchMyInfo } from '@/api/queries/myInfo/usePatchMyInfo'

export default function MyInfoTab() {
  const [isEditMode, setIsEditMode] = useState(false)
  const { data: myInfo, isLoading: isMyInfoLoading } = useGetMyInfo()
  const { data: enrolledCourses = [], isLoading: isCoursesLoading } =
    useGetMyEnrolledCourses()
  const { mutateAsync: patchMyInfo, isPending } = usePatchMyInfo()

  if (isMyInfoLoading || isCoursesLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    )
  }

  if (!myInfo) {
    return (
      <div className="border-grey-3 bg-grey-1 flex h-75 items-center justify-center rounded-lg border">
        <p className="text-primary-default text-sm">
          내 정보를 불러오지 못했습니다.
        </p>
      </div>
    )
  }

  if (isEditMode) {
    return (
      <MyInfoEdit
        myInfo={myInfo}
        isPending={isPending}
        onSubmit={async (payload) => {
          await patchMyInfo(payload)
          setIsEditMode(false)
        }}
      />
    )
  }
  return (
    <MyInfoView
      myInfo={myInfo}
      enrolledCourses={enrolledCourses}
      onEdit={() => setIsEditMode(true)}
    />
  )
}
