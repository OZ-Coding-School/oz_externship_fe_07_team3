import ExamEmptyState from '@/components/exam/ExamEmptyState'
import { EXAM_SUBJECT_ICON_MAP } from '@/constants/examSubjectIconMap'
import {
  EXAM_STATUS_META,
  EXAM_TAB_LABEL,
  EXAM_TABS,
} from '@/constants/examTab'
import { getQuizPage, getQuizResultPage } from '@/constants/routesPaths'
import { cn } from '@/lib/utils'
import { mockExamDeploymentList } from '@/mocks/data/mockExamDeploymentList'
import type { ExamTabType } from '@/types/mypage-type/examDeployment'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MyExamTab() {
  const [activeTab, setActiveTab] = useState<ExamTabType>('all')
  const filteredExamList = mockExamDeploymentList.results.filter((item) => {
    if (activeTab === 'all') {
      return true
    }
    return item.exam_info.status === activeTab
  })
  return (
    <section className="w-186">
      {/* 제목 */}
      <h1 className="text-primary mb-15 text-[32px] leading-[140%] font-bold tracking-[-0.03em]">
        쪽지시험
      </h1>
      {/* 상단 탭 */}
      <div className="border-grey-9 border-b">
        <nav aria-label="쪽지시험 상태 탭">
          <ul className="flex gap-[30px]">
            {EXAM_TABS.map((tab) => {
              const isActive = activeTab === tab
              return (
                <li
                  key={tab}
                  className="text-[20px] leading-[140%] font-bold tracking-[-0.03em]"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab(tab)
                    }}
                    aria-pressed={isActive}
                    className={`cursor-pointer border-b-2 p-4 ${
                      isActive
                        ? 'border-[#721AE3] text-[#721AE3]'
                        : 'border-transparent text-gray-400 hover:text-[#721AE3]'
                    }`}
                  >
                    {EXAM_TAB_LABEL[tab]}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      {/* 콘텐츠(시험과목) 영역 */}
      <div className="mt-6">
        {filteredExamList.length === 0 ? (
          <ExamEmptyState />
        ) : (
          <ul className="flex flex-col gap-4">
            {filteredExamList.map((item) => {
              // 과목명에 맞는 아이콘과 시험 상태별 UI 메타 정보를 가져옴, ts검증
              const subjectTitle = item.exam.subject
                .title as keyof typeof EXAM_SUBJECT_ICON_MAP
              const subjectIcon = EXAM_SUBJECT_ICON_MAP[subjectTitle]
              const statusMeta = EXAM_STATUS_META[item.exam_info.status]
              const isDone = item.exam_info.status === 'done'
              // 아직 api data로 이동 X
              const buttonPath = isDone
                ? getQuizResultPage(item.id)
                : getQuizPage(item.id)

              return (
                <li
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg border px-8 py-7"
                >
                  <img src={subjectIcon} alt="" className="h-12 w-12" />
                  <div className="flex-1 flex-col">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-[18px] leading-[140%] font-semibold tracking-[-0.03em]">
                        {item.exam.title}
                      </h3>
                      <p
                        className={cn(
                          'flex items-center justify-center rounded-[2px] px-2 py-1 text-[12px]',
                          statusMeta.badgeClassName
                        )}
                      >
                        {statusMeta.label}
                      </p>
                    </div>
                    <div className="text-[14px] leading-[140%] font-normal tracking-[-0.03em] text-gray-700">
                      {isDone ? (
                        <p>
                          {item.exam.subject.title} ㆍ {item.exam_info.score}점/
                          {item.total_score}점 ㆍ{' '}
                          {item.exam_info.correct_answer_count}/
                          {item.question_count}개 정답
                        </p>
                      ) : (
                        <p>
                          {item.exam.subject.title} ㆍ 응시하고 점수를
                          확인해보세요!
                        </p>
                      )}
                    </div>
                  </div>
                  {/* 버튼영역 */}
                  <Link
                    to={buttonPath}
                    className={`${statusMeta.buttonClassName} shrink-0`}
                  >
                    {statusMeta.buttonText}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
