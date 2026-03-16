import { useEffect, useMemo, useState } from 'react'

type UseQuizTimerProps = {
  initialSeconds: number
  onTimeEnd?: () => void
}

export function useQuizTimer({ initialSeconds, onTimeEnd }: UseQuizTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (remainingSeconds === 0) {
      if (onTimeEnd) {
        onTimeEnd()
      }
      return
    }

    const timerId = window.setInterval(() => {
      setRemainingSeconds((prev) => prev - 1)
    }, 1000)

    return () => {
      window.clearInterval(timerId)
    }
  }, [remainingSeconds, onTimeEnd])

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60

    // 00:00 형태로 변환
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }, [remainingSeconds])

  return {
    remainingSeconds,
    formattedTime,
  }
}
