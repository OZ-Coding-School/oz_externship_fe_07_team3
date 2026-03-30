import Button from '@/components/ui/button'
import type { MyPageSideTabType } from '@/types/mypage-type/myPageSideTab'

type MyPageSideTabProps = {
  activeTab: MyPageSideTabType
  onChangeTab: (tab: MyPageSideTabType) => void
}

const SIDE_TABS: { label: string; value: MyPageSideTabType }[] = [
  { label: '쪽지시험', value: 'exam' },
  { label: '내 정보', value: 'info' },
  { label: '비밀번호 변경', value: 'password' },
]
export default function MyPageSideTab({
  activeTab,
  onChangeTab,
}: MyPageSideTabProps) {
  return (
    <aside className="w-45">
      <div className="flex flex-col gap-4">
        {SIDE_TABS.map((tab) => (
          <Button
            key={tab.value}
            type="button"
            variant="sidebarTab"
            size="sidebarTab"
            active={activeTab === tab.value}
            onClick={() => onChangeTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </aside>
  )
}
