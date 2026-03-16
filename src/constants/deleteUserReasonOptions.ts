import type { DeleteUserReason } from '@/types'

export const DELETE_REASON_OPTIONS: {
  value: DeleteUserReason
  label: string
}[] = [
  { value: 'GRADUATION', label: '원하는 종류의 강의가 없어서' },
  { value: 'TRANSFER', label: '타 부트캠프에 더 양질의 컨텐츠가 있어서' },
  { value: 'SERVICE_DISSATISFACTION', label: '사이트 UI/UX가 불편해서' },
  { value: 'NO_LONGER_NEEDED', label: '부트캠프를 수강완료해서' },
  { value: 'PRIVACY_CONCERN', label: '개인정보/보안이 우려돼서' },
  { value: 'OTHER', label: '기타(직접입력)' },
]
