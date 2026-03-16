type OrderingQuestionProps = {
  options: string[]
}

function OrderingQuestion({ options }: OrderingQuestionProps) {
  const labels = ['A', 'B', 'C', 'D']

  return (
    <div>
      <div className="my-5 w-162 rounded-[4px] bg-gray-100 px-4 py-5">
        <ul className="flex flex-col gap-5">
          {options.map((option, index) => (
            <li key={index} className="flex items-center gap-4">
              <div className="bg-primary-100 text-primary-default flex h-8 w-8 items-center justify-center rounded-[4px] text-center text-[18px] leading-[140%] font-normal tracking-[-0.03em]">
                {labels[index]}
              </div>
              <span className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]">
                {option}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2.5">
        {options.map((_, index) => (
          <div key={index} className="h-15 w-15 rounded-[4px] bg-gray-100" />
        ))}
      </div>
    </div>
  )
}

export default OrderingQuestion
