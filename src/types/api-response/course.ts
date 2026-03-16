export type AvailableCourseItem = {
  cohort: {
    id: number
    number: number
    start_date: string
    end_date: string
    status: string
  }
  course: {
    id: number
    name: string
  }
}

export type CourseOption = {
  id: number
  name: string
}

export type CohortOption = {
  id: number
  number: number
  start_date: string
  end_date: string
  status: string
  courseId: number
}

export type SelectedCourseRegisterValue = {
  courseId: number | null
  cohortId: number | null
}
