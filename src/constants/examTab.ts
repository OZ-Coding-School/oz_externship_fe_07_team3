import type { ExamTabType } from '@/types/mypage-type/examDeployment'

export const EXAM_TABS: ExamTabType[] = ['all', 'done', 'pending']

export const EMPTY_TITLE_MAP = {
  all: '아직 응시할 시험이 없어요.',
  done: '아직 응시 완료한 시험이 없어요.',
  pending: '현재 응시할 시험이 없어요.',
} as const

export const EXAM_TAB_LABEL = {
  all: '전체보기',
  done: '응시완료',
  pending: '미응시',
} as const

export const EXAM_STATUS_META = {
  done: {
    label: '응시완료',
    badgeClassName: 'bg-[#CAF6E6] text-[#085036]',
    buttonText: '상세보기',
    buttonClassName:
      'shrink-0 inline-flex h-12 cursor-pointer items-center justify-center whitespace-nowrap rounded-[4px] border border-grey-10 bg-gray-200 px-[24px] text-grey-8 font-bold active:border-primary-default active:bg-primary-100 active:text-primary-default',
  },
  pending: {
    label: '미응시',
    badgeClassName: 'bg-[#FFD9E1] text-[#A61B43]',
    buttonText: '응시하기',
    buttonClassName:
      'shrink-0 inline-flex h-12 cursor-pointer items-center justify-center whitespace-nowrap rounded-[4px] border border-primary-default bg-primary-100 px-[24px] text-primary-default font-bold active:bg-[#721AE3] active:text-primary-100',
  },
} as const
