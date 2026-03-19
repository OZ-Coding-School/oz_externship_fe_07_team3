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
  const [cheatingMessage, setCheatingMessage] = useState('')
  const [isTerminated, setIsTerminated] = useState(false)
  const lastCheatingDetectedAt = useRef(0)

  // 감지시 메세지와 모달오픈 + 시간별로 감지해서 중복방지
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
      if (nextCount === 3) {
        setIsTerminated(true)
      }
      return nextCount
    })
  }, [isSubmitting, isTerminated])

  // 3회 이상 막기
  const handleCheatingModalClose = useCallback(() => {
    if (cheatingCount >= 3) {
      return
    }
    setIsCheatingModalOpen(false)
  }, [cheatingCount])

  // 3회 이상시 퇴장
  const handleCheatingModalConfirm = useCallback(async () => {
    setIsCheatingModalOpen(false)
    if (cheatingCount < 3) {
      return
    }
    await onTerminate()
  }, [cheatingCount, onTerminate])

  // 부정행위 감지 기능 (탭전환)
  useEffect(() => {
    // 다른 탭으로 이동하거나 브라우저가 최소화되어 페이지가 보이지 않을 때 감지
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleCheatingDetected()
      }
    }
    // 브라우저 창이 포커스를 잃었을 때 감지
    const handleWindowBlur = () => {
      handleCheatingDetected()
    }
    // 전체화면이 해제되었을 때 감지
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
