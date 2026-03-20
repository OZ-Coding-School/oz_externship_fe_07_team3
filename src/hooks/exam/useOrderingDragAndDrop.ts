import type { AnswerValue } from '@/types/answer-type/answer'
import { useMemo, useState, type DragEvent } from 'react'

type OrderingItem = {
  label: string
  text: string
}

// 드래그한 아이템의 위치 정보
type DragItemInfo = {
  source: 'available' | 'slot' // 위 보기 또는 아래 슬롯
  index: number
}

type UseOrderingDragAndDropParams = {
  options: string[]
  value: string[]
  onChange: (answer: AnswerValue) => void
}

const LABELS = ['A', 'B', 'C', 'D'] as const

function useOrderingDragAndDrop({
  options,
  value,
  onChange,
}: UseOrderingDragAndDropParams) {
  const [draggedItemInfo, setDraggedItemInfo] = useState<DragItemInfo | null>(
    null
  )

  // 상단 보기 목록 data 호출
  const availableItems: OrderingItem[] = useMemo(() => {
    return options.map((option, index) => ({
      label: LABELS[index],
      text: option,
    }))
  }, [options])

  // 상위 answer state를 기준으로 정답 슬롯 구성
  const answerSlots = useMemo<(OrderingItem | null)[]>(() => {
    const slots = new Array(options.length).fill(null)

    value.forEach((label, index) => {
      const matchedItem = availableItems.find((item) => item.label === label)

      if (matchedItem && index < slots.length) {
        slots[index] = matchedItem
      }
    })

    return slots
  }, [availableItems, options.length, value])

  // 슬롯 변경 결과를 상위 answer state로 반영
  const updateAnswerSlots = (nextSlots: (OrderingItem | null)[]) => {
    const nextValue = nextSlots
      .filter((slot): slot is OrderingItem => slot !== null)
      .map((slot) => slot.label)

    onChange(nextValue)
  }

  // 해당 보기가 이미 아래 슬롯에 들어가 있는지 확인
  const isItemUsed = (item: OrderingItem) => {
    return answerSlots.some((slot) => {
      return slot?.label === item.label
    })
  }

  // 상단 보기에서 드래그 시작
  const handleAvailableDragStart = (index: number) => {
    const item = availableItems[index]

    if (!item) {
      return
    }

    if (isItemUsed(item)) {
      return
    }

    setDraggedItemInfo({
      source: 'available',
      index,
    })
  }

  // 하단 슬롯에서 드래그 시작
  const handleSlotDragStart = (index: number) => {
    if (answerSlots[index] === null) {
      return
    }

    setDraggedItemInfo({
      source: 'slot',
      index,
    })
  }

  // drop 가능하도록 기본 동작 막기
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  // 특정 슬롯에 drop 했을 때 처리
  const handleSlotDrop = (index: number) => {
    if (draggedItemInfo === null) {
      return
    }

    // 상단 보기 → 하단 슬롯으로 이동
    if (draggedItemInfo.source === 'available') {
      if (answerSlots[index] !== null) {
        return
      }

      const draggedItem = availableItems[draggedItemInfo.index]

      if (!draggedItem) {
        return
      }

      const copiedSlots = [...answerSlots]
      copiedSlots[index] = draggedItem
      updateAnswerSlots(copiedSlots)
      setDraggedItemInfo(null)
      return
    }

    // 하단 <-> 하단 슬롯 순서 교체
    if (draggedItemInfo.source === 'slot') {
      if (draggedItemInfo.index === index) {
        return
      }

      const copiedSlots = [...answerSlots]
      const temp = copiedSlots[index]
      copiedSlots[index] = copiedSlots[draggedItemInfo.index]
      copiedSlots[draggedItemInfo.index] = temp
      updateAnswerSlots(copiedSlots)
      setDraggedItemInfo(null)
    }
  }

  // 슬롯 제거
  const handleRemoveSlotItem = (targetIndex: number) => {
    const nextSlots = [...answerSlots]
    nextSlots[targetIndex] = null
    updateAnswerSlots(nextSlots)
  }

  return {
    availableItems,
    answerSlots,
    isItemUsed,
    handleRemoveSlotItem,
    handleAvailableDragStart,
    handleSlotDragStart,
    handleDragOver,
    handleSlotDrop,
  }
}

export default useOrderingDragAndDrop
