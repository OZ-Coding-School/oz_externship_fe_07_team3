import Dropdown from '@/components/common/Dropdown'
import Toast from '@/components/common/Toast'
import ExamEmptyState from '@/components/exam/ExamEmptyState'
import TestButton from '@/test/TestButton'
import TestInput from '@/test/TestInput'

function TestPage() {
  return (
    <div>
      <h1>테스트 페이지입니다 UI 확인용</h1>
      <Dropdown />
      <Toast />
      <TestButton />
      <TestInput />
      <div className="flex min-h-90 items-center justify-center">
        <ExamEmptyState />
      </div>
    </div>
  )
}

export default TestPage
