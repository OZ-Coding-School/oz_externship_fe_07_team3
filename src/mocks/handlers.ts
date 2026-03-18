import { availableCoursesHandlers } from './handlers/availableCoursesHandlers'
import { changePasswordHandlers } from './handlers/changePasswordHandlers'
import { changePhoneHandlers } from './handlers/changePhoneHandlers'
import { examHandlers } from './handlers/examHandlers'
import { mypageHandlers } from './handlers/myPageHandlers'

export const handlers = [
  ...examHandlers,
  ...mypageHandlers,
  ...availableCoursesHandlers,
  ...changePasswordHandlers,
  ...changePhoneHandlers,
]
