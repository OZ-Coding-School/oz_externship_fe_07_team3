import { useState } from 'react'

import MyExamTab from '@/features/mypage/MyExamTab'
import MyInfoTab from '@/features/mypage/MyInfoTab'
import MyPageSideTab from '@/features/mypage/MyPageSideTab'
import MyPasswordTab from '@/features/mypage/MyPasswordTab'
import type { MyPageSideTabType } from '@/types/mypage-type/myPageSideTab'
import { useSearchParams } from 'react-router-dom'

export default function MyPage() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')

  const initialTab: MyPageSideTabType =
    tab === 'exam' || tab === 'password' || tab === 'info' ? tab : 'info'

  const [activeTab, setActiveTab] = useState<MyPageSideTabType>(initialTab)
  return (
    <div className="mx-auto mt-27 flex w-236 gap-5 py-10">
      <MyPageSideTab activeTab={activeTab} onChangeTab={setActiveTab} />

      <div className="w-186">
        {activeTab === 'exam' && <MyExamTab />}
        {activeTab === 'info' && <MyInfoTab />}
        {activeTab === 'password' && <MyPasswordTab />}
      </div>
    </div>
  )
}
