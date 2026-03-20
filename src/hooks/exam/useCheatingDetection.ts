import { CHEATING_MESSAGES } from '@/constants/exam/quizCheatingMessage'
import { useCallback, useEffect, useRef, useState } from 'react'

type UseCheatingDetectionParams = {
  isSubmitting: boolean
  onTerminate: () => void | Promise<void>
}

export function useCheatingDetection({
  isSubmitting,
  onTerminate,
}: UseCheatingDetectionParams) {
  const [cheatingCount, setCheatingCount] = useState(0)
  const [isCheatingModalOpen, setIsCheatingModalOpen] = useState(false)
  const [cheatingMessage, setCheatingMessage] = useState<readonly string[]>([])
  const [isTerminated, setIsTerminated] = useState(false)
  const lastCheatingDetectedAt = useRef(0)

  // 부정행위 감지 공통 처리
  const handleCheatingDetected = useCallback(() => {
    if (isSubmitting || isTerminated) {
      return
    }

    const now = Date.now()

    if (now - lastCheatingDetectedAt.current < 800) {
      return
    }

    lastCheatingDetectedAt.current = now

    setCheatingCount((prev) => {
      if (prev >= 3) {
        return prev
      }

      const nextCount = prev + 1

      setCheatingMessage(CHEATING_MESSAGES[nextCount as 1 | 2 | 3])
      setIsCheatingModalOpen(true)

      return nextCount
    })
  }, [isSubmitting, isTerminated])

  // 실제 종료 처리 공통 함수
  const terminateExam = useCallback(async () => {
    setIsCheatingModalOpen(false)
    setIsTerminated(true)
    await onTerminate()
  }, [onTerminate])

  // 경고 모달 X 버튼
  const handleCheatingModalClose = useCallback(async () => {
    // 3회째에서는 X도 시험종료 버튼과 동일하게 처리
    if (cheatingCount >= 3) {
      await terminateExam()
      return
    }

    // 1, 2회는 그냥 닫기
    setIsCheatingModalOpen(false)
  }, [cheatingCount, terminateExam])

  // 경고 모달 확인 / 시험종료 버튼
  const handleCheatingModalConfirm = useCallback(async () => {
    // 3회 미만이면 단순 닫기
    if (cheatingCount < 3) {
      setIsCheatingModalOpen(false)
      return
    }

    // 3회는 시험 종료 처리
    await terminateExam()
  }, [cheatingCount, terminateExam])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleCheatingDetected()
      }
    }

    const handleWindowBlur = () => {
      handleCheatingDetected()
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleCheatingDetected()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleWindowBlur)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleWindowBlur)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [handleCheatingDetected])

  return {
    cheatingCount,
    isCheatingModalOpen,
    cheatingMessage,
    isTerminated,
    handleCheatingModalClose,
    handleCheatingModalConfirm,
  }
}
