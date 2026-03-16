import type { AvailableCourseItem } from '@/types/api-response/course'
import { delay, http, HttpResponse } from 'msw'

const availableCoursesMock: AvailableCourseItem[] = [
  {
    cohort: {
      id: 1,
      number: 1,
      start_date: '2025-11-20T00:00:05.875842+09:00',
      end_date: '2025-12-20T00:00:05.875842+09:00',
      status: 'PENDING',
    },
    course: {
      id: 1,
      name: '초격차 백엔드 부트캠프',
    },
  },
  {
    cohort: {
      id: 2,
      number: 2,
      start_date: '2025-12-21T00:00:00+09:00',
      end_date: '2026-01-20T00:00:00+09:00',
      status: 'PENDING',
    },
    course: {
      id: 1,
      name: '초격차 백엔드 부트캠프',
    },
  },
  {
    cohort: {
      id: 3,
      number: 3,
      start_date: '2025-11-25T00:00:00+09:00',
      end_date: '2025-12-25T00:00:00+09:00',
      status: 'PENDING',
    },
    course: {
      id: 2,
      name: '초격차 프론트엔드 부트캠프',
    },
  },
  {
    cohort: {
      id: 4,
      number: 4,
      start_date: '2026-01-01T00:00:00+09:00',
      end_date: '2026-02-01T00:00:00+09:00',
      status: 'PENDING',
    },
    course: {
      id: 2,
      name: '초격차 프론트엔드 부트캠프',
    },
  },
]

export const availableCoursesHandlers = [
  http.get('/api/v1/accounts/available-courses', async () => {
    await delay(400)

    return HttpResponse.json(availableCoursesMock, {
      status: 200,
    })
  }),
]
