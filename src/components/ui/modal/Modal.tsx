// src/components/ui/modal/Modal.tsx
import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useModalScroll } from '@/hooks/useModalScroll'

/**
 * X버튼이 있는 모달 컴포넌트 (배경 클릭으로 닫히지 않음)
 * @param isOpen - 모달 열림 여부
 * @param onClose - 닫기 핸들러
 * @param children - 모달 내부 콘텐츠
 * @param width - 모달 너비 (Tailwind 클래스)
 * @param shadow - 그림자 여부 (기본값: true)
 * @example
 * <Modal isOpen={isOpen} onClose={handleClose} width="w-[396px]">
 *   <div>내용</div>
 * </Modal>
 */

type ModalProps = {
  isOpen: boolean // 모달 열림/닫힘 상태
  onClose: () => void // 닫기 핸들러
  children: ReactNode // 모달 내부 콘텐츠 (자유롭게 주입)
  width?: string // 모달 너비 (Tailwind 클래스)
  shadow?: boolean // 그림자 여부
}

export default function Modal({
  isOpen,
  onClose,
  children,
  width,
  shadow = true, // 그림자 기본값 true
}: ModalProps) {
  useModalScroll(isOpen) // 스크롤 제어 훅 (열릴 때 막기, 닫힐 때 복구)

  if (!isOpen) return null // 닫혀있으면 아무것도 렌더링 안 함

  // CSR(Vite + React) 환경이므로 document 참조 안전
  // modal-root 없으면 body에 렌더링
  const modalRoot = document.getElementById('modal-root') ?? document.body

  return createPortal(
    // 전체 화면을 덮는 배경 (딤처리)
    // onClick 없음 → 배경 클릭해도 닫히지 않음
    <div
      role="dialog" // 스크린리더에게 다이얼로그임을 알림
      aria-modal="true" // 모달 뒤 콘텐츠 접근 차단
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
      // fixed: 스크롤과 무관하게 화면에 고정
      // inset-0: top/right/bottom/left 전부 0 → 전체 화면 덮기
      // z-[1000]: 일반 요소들 위에 표시
      // flex items-center justify-center: 모달 가운데 정렬
      // bg-black/50: 배경 딤처리 50%
    >
      <div
        className={`relative overflow-hidden rounded-[12px] bg-white ${shadow ? 'shadow-[0_4px_16px_rgba(160,160,160,0.25)]' : ''} ${width}`}
        // relative: 자식 요소 절대 위치 기준점
        // overflow-hidden: 모달 밖으로 콘텐츠 넘치지 않게
        // rounded-[12px]: 모서리 둥글게 (피그마 스펙)
        // bg-white: 모달 배경 흰색
        // shadow: 그림자 on/off (prop으로 제어)
        // width: 밖에서 자유롭게 지정
        onClick={(e) => e.stopPropagation()} // 모달 안쪽 클릭 시 이벤트 전파 막기
      >
        {/* X버튼 영역: 모달은 반드시 명시적으로 닫아야 함 */}
        <div className="flex justify-end px-[24px] pt-[20px]">
          {/* flex justify-end: X버튼 오른쪽 정렬 */}
          {/* px-[24px] pt-[20px]: 피그마 스펙 패딩 */}
          <button
            onClick={onClose} // X버튼 클릭 시 닫기
            className="text-ui-gray-400 hover:text-ui-gray-600 cursor-pointer"
            // cursor-pointer: 마우스 커서 포인터
            // text-ui-gray-400: 기본 색상
            // hover:text-ui-gray-600: 호버 시 색상 진하게
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor" // 부모 color 상속
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" /> {/* \ 방향 선 */}
              <line x1="6" y1="6" x2="18" y2="18" /> {/* / 방향 선 → X 완성 */}
            </svg>
          </button>
        </div>
        {children} {/* 팀원들이 자유롭게 채울 내용 */}
      </div>
    </div>,
    modalRoot // modal-root div에 포탈로 렌더링 (DOM 구조 밖으로 분리)
  )
}
