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
  const lastCheatingDetectedAt = useRef(0)

  const handleCheatingDetected = useCallback(() => {
    if (isSubmitting) {
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
  }, [isSubmitting])

  const terminateExam = useCallback(async () => {
    setIsCheatingModalOpen(false)
    await onTerminate()
  }, [onTerminate])

  const handleCheatingModalClose = useCallback(async () => {
    if (cheatingCount >= 3) {
      await terminateExam()
      return
    }

    setIsCheatingModalOpen(false)
  }, [cheatingCount, terminateExam])

  const handleCheatingModalConfirm = useCallback(async () => {
    if (cheatingCount < 3) {
      setIsCheatingModalOpen(false)
      return
    }

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
    handleCheatingModalClose,
    handleCheatingModalConfirm,
  }
}
