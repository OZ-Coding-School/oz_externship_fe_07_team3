import Textarea from '@/components/ui/textarea'

export default function TestTextarea() {
  return (
    <div className="flex flex-col gap-10">
      <Textarea
        variant="feedback"
        size="sm"
        placeholder="100글자 이내로 입력해 주세요."
        className=""
      />
      <Textarea variant="answer" size="md" className="" disabled>
        쪽지시험
      </Textarea>
    </div>
  )
}
