import type { Gender } from '../api-response/myPageResponse'

export type UpdateMyInfoRequest = {
  nickname?: string
  name?: string
  birthday?: string
  gender?: Gender
}

export type DeleteUserReason =
  | 'GRADUATION'
  | 'TRANSFER'
  | 'NO_LONGER_NEEDED'
  | 'SERVICE_DISSATISFACTION'
  | 'PRIVACY_CONCERN'
  | 'OTHER'

export type DeleteMyAccountRequest = {
  reason: DeleteUserReason
  reason_detail: string
}
