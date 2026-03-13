import { useState } from 'react'

import type { MyPageSideTabType } from '@/types/mypage-type/myPageSideTab'
import MyPageSideTab from '@/features/mypage/MyPageSideTab'
import MyExamTab from '@/features/mypage/MyExamTab'
import MyPasswordTab from '@/features/mypage/MyPasswordTab'
import MyInfoTab from '@/features/mypage/MyInfoTab'

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<MyPageSideTabType>('info')

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
