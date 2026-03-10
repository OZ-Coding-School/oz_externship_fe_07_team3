import { toast } from 'sonner'
import checkToast from '@/assets/icons/checkToast.svg'

function Toast() {
  return (
    <button
      className="w-50 cursor-pointer rounded-md border px-4 py-2"
      onClick={() =>
        toast(
          <div className="flex items-center gap-2">
            <img src={checkToast} alt="성공" className="h-6 w-6" />
            <span>전송완료! 이메일을 확인해주세요.</span>
          </div>
        )
      }
    >
      토스트 띄우기
    </button>
  )
}

export default Toast
