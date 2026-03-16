import { useEffect } from 'react'

/**
 * 모달/팝업 오픈 시 body 스크롤을 제어하는 커스텀 훅
 * @param isOpen - 모달/팝업 열림 여부
 */
export const useModalScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])
}
