import Dropdown from '@/components/common/Dropdown'
import Loading from '@/components/common/loading/Loading'
import Toast from '@/components/common/Toast'
import ExamEmptyState from '@/components/exam/ExamEmptyState'
import TestButton from '@/test/TestButton'
import TestInput from '@/test/TestInput'
import TestModal from '@/test/TestModal'
import TestRecoverAccountModal from '@/test/TestRecoverAccountModal'
import TestFindIdModal from '@/test/TestFindIdModal'

function TestPage() {
  return (
    <div>
      <h1>테스트 페이지입니다 UI 확인용</h1>

      <div className="flex justify-center">
        <Loading />
      </div>

      <Dropdown />
      <Toast />
      <TestButton />
      <TestInput />
      <TestModal />
      <TestRecoverAccountModal />
      <TestFindIdModal />

      <div className="flex min-h-90 items-center justify-center">
        <ExamEmptyState />
      </div>
    </div>
  )
}

export default TestPage
