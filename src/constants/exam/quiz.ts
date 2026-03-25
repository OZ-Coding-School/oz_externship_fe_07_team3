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
  SINGLE_CHOICE: '단일선택',
  MULTIPLE_CHOICE: '다중선택',
  OX: 'OX선택',
  SHORT_ANSWER: '단답형',
  ORDERING: '순서배열',
  FULL_BLANK: '빈칸식',
} as const
