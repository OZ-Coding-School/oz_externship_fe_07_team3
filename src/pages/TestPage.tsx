import Dropdown from '@/components/common/Dropdown'
import Toast from '@/components/common/Toast'
import TestButton from '@/test/TestButton'
import TestFindIdModal from '@/test/TestFindIdModal'
import TestInput from '@/test/TestInput'
import TestModal from '@/test/TestModal'

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
    </div>
  )
}

export default TestPage
