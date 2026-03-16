function ShortAnswerQuestion() {
  return (
    <input
      type="text"
      maxLength={20}
      placeholder="20글자 이내로 입력해 주세요."
      className="placeholder:text-ui-gray-tertiary mt-5 h-12 w-162 rounded-[4px] bg-gray-100 px-5 text-base outline-none"
    />
  )
}

export default ShortAnswerQuestion
