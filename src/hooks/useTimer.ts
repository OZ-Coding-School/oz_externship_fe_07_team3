import { useCallback, useEffect, useState } from 'react'

export const useTimer = (initialSeconds: number) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)

  const startTimer = useCallback(() => {
    setTimeLeft(initialSeconds)
    setIsActive(true)
  }, [initialSeconds])

  const stopTimer = useCallback(() => {
    setIsActive(false)
  }, [])

  const resetTimer = useCallback(() => {
    setIsActive(false)
    setTimeLeft(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [isActive, timeLeft])

  const min = Math.floor(timeLeft / 60)
  const sec = timeLeft % 60
  const formattedTime = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  const isExpired = timeLeft <= 0

  return {
    timeLeft,
    formattedTime,
    isActive,
    isExpired,
    startTimer,
    stopTimer,
    resetTimer,
  }
}
