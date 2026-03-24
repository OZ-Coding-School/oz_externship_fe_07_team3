export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
/**
 * api endPoint
 */
export const APIS_PATHS = {
  GET_MY_INFO: '/accounts/me',
  PATCH_MY_INFO: '/accounts/me',
  DELETE_MY_ACCOUNT: '/accounts/me',
  GET_MY_ENROLLED_COURSES: '/accounts/me/enrolled-courses',
  AVAILABLE_COURSES: '/accounts/available-courses',
  CHANGE_PASSWORD: '/accounts/change-password',
  PHONE_VERIFICATION_SEND: '/accounts/verification/send-sms',
  PHONE_VERIFICATION_VERIFY: '/accounts/verification/verify-sms',
  CHANGE_PHONE: '/accounts/change-phone',
  PRESIGNED_URL: '/questions/presigned-url',
  PROFILE_IMAGE: '/accounts/me/profile-image',
  CHECK_NICKNAME: '/accounts/check-nickname',
  LOGOUT: '/accounts/logout',
}
