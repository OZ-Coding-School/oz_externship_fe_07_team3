import useOrderingDragAndDrop from '@/hooks/useOrderingDragAndDrop'

type OrderingQuestionProps = {
  options: string[]
}

function OrderingQuestion({ options }: OrderingQuestionProps) {
  const {
    availableItems,
    answerSlots,
    isItemUsed,
    handleAvailableDragStart,
    handleSlotDragStart,
    handleDragOver,
    handleSlotDrop,
    handleRemoveSlotItem,
  } = useOrderingDragAndDrop(options)

  return (
    <div>
      <div className="my-5 w-162 rounded-[4px] bg-gray-100 px-4 py-5">
        <ul className="flex flex-col gap-5">
          {availableItems.map((item, index) => {
            const isUsed = isItemUsed(item)

            return (
              <li
                key={item.label}
                draggable={!isUsed}
                onDragStart={() => {
                  handleAvailableDragStart(index)
                }}
                className={`flex items-center gap-4 ${
                  isUsed ? 'cursor-not-allowed opacity-50' : 'cursor-grab'
                }`}
              >
                <div className="bg-primary-100 text-primary-default flex h-8 w-8 items-center justify-center rounded-[4px] text-center text-[18px] leading-[140%] font-normal tracking-[-0.03em]">
                  {item.label}
                </div>
                <span className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]">
                  {item.text}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex gap-2.5">
        {answerSlots.map((slot, index) => (
          <div
            key={index}
            draggable={slot !== null}
            onDragStart={() => {
              handleSlotDragStart(index)
            }}
            onDragOver={handleDragOver}
            onDrop={() => {
              handleSlotDrop(index)
            }}
            onClick={() => {
              handleRemoveSlotItem(index)
            }}
            className={`flex h-15 w-15 items-center justify-center rounded-[4px] transition ${
              slot
                ? 'bg-primary-100 text-primary-default hover:bg-primary-200 cursor-pointer text-2xl font-semibold'
                : 'text-ui-gray-primary bg-gray-100'
            }`}
          >
            {slot && <span>{slot.label}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderingQuestion
