import { delay, http, HttpResponse } from 'msw'
import { availableCoursesMock } from '../data/availableCoursesMock'

export const availableCoursesHandlers = [
  http.get('/api/v1/accounts/available-courses', async () => {
    await delay(400)

    return HttpResponse.json(availableCoursesMock, {
      status: 200,
    })
  }),
]
