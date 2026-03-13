import type { Gender } from '../api-response/myPageResponse'

export type UpdateMyInfoRequest = {
  nickname?: string
  name?: string
  birthday?: string
  gender?: Gender
}
