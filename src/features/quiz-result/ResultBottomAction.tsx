import Button from '@/components/ui/button'

type ResultBottomActionProps = {
  onConfirm: () => void
}

function ResultBottomAction({ onConfirm }: ResultBottomActionProps) {
  return (
    <div className="flex items-center justify-center">
      <Button
        type="button"
        onClick={onConfirm}
        className="h-16 w-[92px] rounded-[4px] text-[20px]"
      >
        완료
      </Button>
    </div>
  )
}

export default ResultBottomAction
