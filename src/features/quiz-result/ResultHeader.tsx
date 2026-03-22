import ArrowIcon from '@/assets/icons/quiz/arrow-left.svg?react'

type ResultHeaderProps = {
  title: string
  metaText: string
  onBack: () => void
}

function ResultHeader({ title, metaText, onBack }: ResultHeaderProps) {
  return (
    <header className="border-grey-9 sticky top-0 z-50 flex h-32 items-center justify-between border-b bg-gray-100 px-90 whitespace-nowrap">
      <div className="flex items-start">
        <button
          className="mr-3"
          type="button"
          onClick={onBack}
          aria-label="뒤로가기"
        >
          <ArrowIcon />
        </button>

        <div>
          <h1 className="font-semibold">{title}</h1>
          <p className="text-gray-600">{metaText}</p>
        </div>
      </div>
    </header>
  )
}

export default ResultHeader
