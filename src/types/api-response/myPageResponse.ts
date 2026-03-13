export type Gender = 'M' | 'F'

export type MyInfoResponse = {
  id: number
  email: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  gender: Gender
  profile_img_url: string | null
  created_at: string
}

export type EnrolledCourseStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'

export type EnrolledCourseResponse = {
  cohort: {
    id: number
    number: number
    start_date: string
    end_date: string
    status: EnrolledCourseStatus
  }
  course: {
    id: number
    name: string
    tag: string
    thumbnail_img_url: string
  }
}
