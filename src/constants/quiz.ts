import IconO from '@/assets/icons/quiz/icon-o-gray.svg?react'
import IconX from '@/assets/icons/quiz/icon-x-gray.svg?react'

export const OPTION_META = {
  O: {
    Icon: IconO,
    activeColor: 'text-other-green',
    label: '맞아요',
  },
  X: {
    Icon: IconX,
    activeColor: 'text-other-red',
    label: '아니에요',
  },
} as const

export const QUESTION_TYPE_LABEL = {
  single_choice: '단일선택',
  multiple_choice: '다중선택',
  ox: 'OX선택',
  short_answer: '단답형',
  ordering: '순서배열',
  fill_blank: '빈칸식',
} as const
