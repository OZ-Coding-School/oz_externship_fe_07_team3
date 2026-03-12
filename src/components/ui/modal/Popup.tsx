// src/components/ui/modal/Popup.tsx
import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useModalScroll } from '@/hooks/useModalScroll'

/**
 * X버튼이 없는 팝업 컴포넌트 (배경 클릭으로 닫힘)
 * 모달(z-[1000]) 위에 중첩으로 뜰 수 있도록 z-[1001] 설정
 * @param isOpen - 팝업 열림 여부
 * @param onClose - 닫기 핸들러
 * @param children - 팝업 내부 콘텐츠
 * @param width - 팝업 너비 (Tailwind 클래스)
 * @param shadow - 그림자 여부 (기본값: true)
 * @param isNested - Modal 위에 중첩으로 뜨는지 여부 (기본값: false)
 *                   true일 때 배경 딤처리 제거 (중복 방지)
 * @example
 * // 단독으로 뜰 때
 * <Popup isOpen={isOpen} onClose={handleClose} width="w-[428px]">
 *   <div>내용</div>
 * </Popup>
 *
 * // Modal 위에 중첩으로 뜰 때
 * <Popup isOpen={isOpen} onClose={handleClose} width="w-[428px]" isNested>
 *   <div>내용</div>
 * </Popup>
 */

type PopupProps = {
  isOpen: boolean // 팝업 열림/닫힘 상태
  onClose: () => void // 닫기 핸들러
  children: ReactNode // 팝업 내부 콘텐츠 (자유롭게 주입)
  width?: string // 팝업 너비 (Tailwind 클래스)
  shadow?: boolean // 그림자 여부
  isNested?: boolean // Modal 위에 중첩 여부 (true면 딤처리 제거)
}

export default function Popup({
  isOpen,
  onClose,
  children,
  width,
  shadow = true, // 그림자 기본값 true
  isNested = false, // 중첩 기본값 false (단독으로 뜨는 게 기본)
}: PopupProps) {
  useModalScroll(isOpen) // 스크롤 제어 훅 (열릴 때 막기, 닫힐 때 복구)

  if (!isOpen) return null // 닫혀있으면 아무것도 렌더링 안 함

  // CSR(Vite + React) 환경이므로 document 참조 안전
  // modal-root 없으면 body에 렌더링
  const modalRoot = document.getElementById('modal-root') ?? document.body

  return createPortal(
    // 전체 화면을 덮는 배경
    // isNested=false(단독): bg-black/50 → 딤처리 O
    // isNested=true(중첩): bg 없음 → 딤처리 X (Modal 배경과 중복 방지)
    // onClick={onClose} → 배경 클릭 시 닫힘
    <div
      role="dialog" // 스크린리더에게 다이얼로그임을 알림
      aria-modal="true" // 모달 뒤 콘텐츠 접근 차단
      className={`fixed inset-0 z-[1001] flex items-center justify-center ${isNested ? '' : 'bg-black/50'}`}
      // fixed: 스크롤과 무관하게 화면에 고정
      // inset-0: top/right/bottom/left 전부 0 → 전체 화면 덮기
      // z-[1001]: Modal(z-1000)보다 위에 표시
      // flex items-center justify-center: 팝업 가운데 정렬
      // isNested ? '' : 'bg-black/50': 중첩 여부에 따라 딤처리 조건부 적용
      onClick={onClose} // 배경 클릭 시 닫힘
    >
      <div
        className={`relative overflow-hidden rounded-[12px] bg-white ${shadow ? 'shadow-[0_4px_16px_rgba(160,160,160,0.25)]' : ''} ${width}`}
        // relative: 자식 요소 절대 위치 기준점
        // overflow-hidden: 팝업 밖으로 콘텐츠 넘치지 않게
        // rounded-[12px]: 모서리 둥글게 (피그마 스펙)
        // bg-white: 팝업 배경 흰색
        // shadow: 그림자 on/off (prop으로 제어)
        // width: 밖에서 자유롭게 지정
        onClick={(e) => e.stopPropagation()} // 팝업 안쪽 클릭 시 이벤트 전파 막기
      >
        {children} {/* 팀원들이 자유롭게 채울 내용 */}
      </div>
    </div>,
    modalRoot // modal-root div에 포탈로 렌더링 (DOM 구조 밖으로 분리)
  )
}
