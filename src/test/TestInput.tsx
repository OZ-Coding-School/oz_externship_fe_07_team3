import InputField from '@/components/common/InputField'

export default function TestInput() {
  return (
    <div className="mx-auto flex max-w-[400px] flex-col gap-10 bg-white p-10">
      <h1 className="border-b pb-4 text-2xl font-bold">Input Field Set Test</h1>

      <InputField label="아이디" placeholder="아이디를 입력하세요" />

      <InputField
        label="비밀번호"
        type="password"
        status="danger"
        placeholder="비밀번호 입력"
        helperText="비밀번호가 일치하지 않습니다."
      />

      <InputField
        label="이메일"
        status="success"
        placeholder="example@email.com"
        helperText="사용 가능한 이메일입니다."
      />

      <InputField disabled label="비활성 필드" placeholder="수정 불가" />
    </div>
  )
}
