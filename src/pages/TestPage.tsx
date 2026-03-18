import Dropdown from '@/components/common/Dropdown'
import Toast from '@/components/common/Toast'
import TestButton from '@/test/TestButton'
import TestInput from '@/test/TestInput'
import TestModal from '@/test/TestModal'
import TestFindIdModal from '@/test/TestFindIdModal'
import TestFindPasswordModal from '@/test/TestFindPasswordModal'
import TestRecoverAccountModal from '@/test/TestRecoverAccountModal'

function TestPage() {
  return (
    <div>
      <h1>테스트 페이지입니다 UI 확인용</h1>
      <Dropdown />
      <Toast />
      <TestButton />
      <TestInput />
      <TestModal />
      <TestFindIdModal />
      <TestFindPasswordModal />
      <TestRecoverAccountModal />

      <div className="flex min-h-90 items-center justify-center"></div>
    </div>
  )
}

export default TestPage
