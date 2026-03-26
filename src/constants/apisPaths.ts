export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
/**
 * api endPoint
 */
export const APIS_PATHS = {
  POST_LOGIN: '/accounts/login',
  GET_MY_INFO: '/accounts/me',
  PATCH_MY_INFO: '/accounts/me',
  DELETE_MY_ACCOUNT: '/accounts/me',
  GET_MY_ENROLLED_COURSES: '/accounts/me/enrolled-courses',
  POST_ENROLL_STUDENT: '/accounts/enroll-student',
  AVAILABLE_COURSES: '/accounts/available-courses',
  CHANGE_PASSWORD: '/accounts/change-password',
  PHONE_VERIFICATION_SEND: '/accounts/verification/send-sms',
  PHONE_VERIFICATION_VERIFY: '/accounts/verification/verify-sms',
  CHANGE_PHONE: '/accounts/change-phone',
  PRESIGNED_URL: '/accounts/me/profile-image/presigned-url',
  PROFILE_IMAGE: '/accounts/me/profile-image',
  CHECK_NICKNAME: '/accounts/check-nickname',
  LOGOUT: '/accounts/logout',
  REFRESH_TOKEN: '/accounts/me/refresh',

  FIND_EMAIL: '/accounts/find-email',
  GET_EXAM_DEPLOYMENTS: '/exams/deployments',
  GET_EXAM_RESULT: '/exams/submissions',
}

export const EXAM_API_PATHS = {
  DEPLOYMENTS: '/exams/deployments',
  deploymentDetail: (deploymentId: number) =>
    `/exams/deployments/${deploymentId}`,
  checkCode: (deploymentId: number) =>
    `/exams/deployments/${deploymentId}/check-code`,
  status: (deploymentId: number) => `/exams/deployments/${deploymentId}/status`,
  submit: (deploymentId: number) => `/exams/deployments/${deploymentId}/submit`,
  result: (submissionId: number) => `/exams/submissions/${submissionId}`,
}
