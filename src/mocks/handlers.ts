import { availableCoursesHandlers } from './handlers/availableCoursesHandlers'
import { changePasswordHandlers } from './handlers/changePasswordHandlers'
import { changePhoneHandlers } from './handlers/changePhoneHandlers'
import { checkNickNameHandlers } from './handlers/checkNickNameHandlers'
import { examHandlers } from './handlers/examHandlers'
import { mypageHandlers } from './handlers/myPageHandlers'
import { profileImageHandlers } from './handlers/profileImageHandlers'
const USE_EXAM_MOCK = false

export const handlers = [
  ...(USE_EXAM_MOCK ? examHandlers : []),
  ...mypageHandlers,
  ...availableCoursesHandlers,
  ...changePasswordHandlers,
  ...changePhoneHandlers,
  ...profileImageHandlers,
  ...checkNickNameHandlers,
]
