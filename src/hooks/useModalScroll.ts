// src/hooks/useModalScroll.ts
import { useEffect } from 'react'

/**
 * 모달/팝업 오픈 시 body 스크롤을 제어하는 커스텀 훅
 * @param isOpen - 모달/팝업 열림 여부
 */
export const useModalScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // 모달 열릴 때 body 스크롤 막기
      document.body.style.overflow = 'hidden'
    }
    return () => {
      // 모달 닫힐 때 또는 언마운트될 때 스크롤 복구
      document.body.style.overflow = ''
    }
  }, [isOpen]) // isOpen 바뀔 때마다 실행
}
