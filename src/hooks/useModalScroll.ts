import { useEffect } from 'react'

/**
 * 모달/팝업 오픈 시 body 스크롤을 제어하는 커스텀 훅
 * @param isOpen - 모달/팝업 열림 여부
 */
export const useModalScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
}
