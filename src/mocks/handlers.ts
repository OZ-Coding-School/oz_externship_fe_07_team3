import { availableCoursesHandlers } from './handlers/availableCoursesHandlers'
import { examHandlers } from './handlers/examHandlers'
import { mypageHandlers } from './handlers/myPageHandlers'

export const handlers = [
  ...examHandlers,
  ...mypageHandlers,
  ...availableCoursesHandlers,
]
