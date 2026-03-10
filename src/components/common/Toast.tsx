import { toast } from 'sonner'

function Toast() {
  return (
    <button
      className="w-50 cursor-pointer rounded-md border px-4 py-2"
      onClick={() => toast.success(`전송완료! 이메일을 확인해주세요.`)}
    >
      토스트 띄우기
    </button>
  )
}

export default Toast
