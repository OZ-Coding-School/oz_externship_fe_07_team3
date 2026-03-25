import { useCheckExamCode } from '@/api/queries/exam/useCheckExamCode'
import { useExamDeployments } from '@/api/queries/exam/useExamDeployments'
import ExamEmptyState from '@/components/exam/ExamEmptyState'
import ExamEntryCodeModal from '@/components/exam/ExamEntryCodeModal'
import { EXAM_SUBJECT_ICON_MAP } from '@/constants/exam/examSubjectIconMap'
import {
  EMPTY_TITLE_MAP,
  EXAM_STATUS_META,
  EXAM_TAB_LABEL,
  EXAM_TABS,
} from '@/constants/exam/examTab'
import { getQuizPage, getQuizResultPage } from '@/constants/routesPaths'
import { cn } from '@/lib/utils'
import type {
  ExamDeploymentItem,
  ExamTabType,
} from '@/types/mypage-type/examDeployment'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type ExamItem = ExamDeploymentItem

export default function MyExamTab() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ExamTabType>('all')
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null)
  const [isEntryCodeModalOpen, setIsEntryCodeModalOpen] = useState(false)
  const { data, isPending, isError } = useExamDeployments()
  const examList = data?.results ?? []

  const filteredExamList = examList.filter((item) => {
    if (activeTab === 'all') {
      return true
    }
    return item.exam_info.status === activeTab
  })

  const handleExamActionClick = (item: ExamItem) => {
    const status = item.exam_info.status as keyof typeof EXAM_STATUS_META
    const isDone = status === 'done'
    if (isDone) {
      navigate(getQuizResultPage(item.id))
      return
    }
    setSelectedExam(item)
    setIsEntryCodeModalOpen(true)
  }

  const handleCloseEntryCodeModal = () => {
    setIsEntryCodeModalOpen(false)
    setSelectedExam(null)
  }
  const { mutateAsync: checkCode } = useCheckExamCode()
  const handleConfirmEntryCode = async (entryCode: string) => {
    if (!selectedExam) {
      return false
    }
    try {
      await checkCode({
        deploymentId: selectedExam.id,
        entryCode,
      })
      navigate(getQuizPage(selectedExam.id))
      return true
    } catch {
      return false
    }
  }
  const selectedSubjectTitle = selectedExam?.exam.subject.title as
    | keyof typeof EXAM_SUBJECT_ICON_MAP
    | undefined

  const modalImageSrc =
    (selectedSubjectTitle
      ? EXAM_SUBJECT_ICON_MAP[selectedSubjectTitle]
      : undefined) ??
    selectedExam?.exam.subject.thumbnail_img_url ??
    selectedExam?.exam.thumbnail_img_url ??
    ''

  if (isPending) {
    return <div>로딩 중...</div>
  }

  if (isError) {
    return <div>시험 목록을 불러오지 못했습니다.</div>
  }

  return (
    <>
      <section className="w-186">
        <h1 className="text-primary mb-15 text-[32px] leading-[140%] font-bold tracking-[-0.03em]">
          쪽지시험
        </h1>

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
                      className={cn(
                        'cursor-pointer border-b-2 p-4',
                        isActive
                          ? 'border-[#721AE3] text-[#721AE3]'
                          : 'border-transparent text-gray-400 hover:text-[#721AE3]'
                      )}
                    >
                      {EXAM_TAB_LABEL[tab]}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="mt-6">
          {filteredExamList.length === 0 ? (
            <ExamEmptyState title={EMPTY_TITLE_MAP[activeTab]} />
          ) : (
            <ul className="flex flex-col gap-4">
              {filteredExamList.map((item) => {
                const subjectTitle = item.exam.subject
                  .title as keyof typeof EXAM_SUBJECT_ICON_MAP
                const subjectIcon =
                  EXAM_SUBJECT_ICON_MAP[subjectTitle] ??
                  item.exam.subject.thumbnail_img_url ??
                  item.exam.thumbnail_img_url ??
                  ''
                const status = item.exam_info.status
                const statusMeta = EXAM_STATUS_META[status]
                const isDone = status === 'done'

                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 rounded-lg border border-gray-200 bg-[#fafafa] px-8 py-7"
                  >
                    <img
                      src={subjectIcon}
                      alt={`${item.exam.subject.title} 과목 아이콘`}
                      className="h-12 w-12"
                    />

                    <div className="flex flex-1 flex-col">
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
                            {item.exam.subject.title} ㆍ {item.exam_info.score}
                            점/
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

                    <button
                      type="button"
                      onClick={() => {
                        handleExamActionClick(item)
                      }}
                      className={`${statusMeta.buttonClassName} shrink-0`}
                    >
                      {statusMeta.buttonText}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <ExamEntryCodeModal
        isOpen={isEntryCodeModalOpen}
        examTitle={selectedExam?.exam.title ?? ''}
        questionCount={selectedExam?.question_count ?? 0}
        timeLimit={selectedExam?.duration_time ?? 20}
        imageSrc={modalImageSrc}
        imageAlt={
          selectedExam ? `${selectedExam.exam.subject.title} 과목 아이콘` : ''
        }
        onClose={handleCloseEntryCodeModal}
        onConfirm={handleConfirmEntryCode}
      />
    </>
  )
}
