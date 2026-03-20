import { useEffect, useId, useState } from 'react'

import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal/Modal'
import Input from '../ui/input'

type ExamEntryCodeModalProps = {
  isOpen: boolean
  examTitle: string
  questionCount: number
  timeLimit: number
  imageSrc: string
  imageAlt?: string
  onClose: () => void
  onConfirm: (code: string) => boolean | Promise<boolean>
}

export default function ExamEntryCodeModal({
  isOpen,
  examTitle,
  questionCount,
  timeLimit,
  imageSrc,
  imageAlt = '',
  onClose,
  onConfirm,
}: ExamEntryCodeModalProps) {
  const [entryCode, setEntryCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const inputId = useId()
  const descriptionId = useId()
  const errorId = useId()

  useEffect(() => {
    if (!isOpen) {
      setEntryCode('')
      setErrorMessage('')
    }
  }, [isOpen])

  const handleChangeEntryCode = (value: string) => {
    setEntryCode(value)

    if (errorMessage) {
      setErrorMessage('')
    }
  }
  const handleSubmit = async () => {
    const trimmedCode = entryCode.trim()

    if (!trimmedCode) {
      setErrorMessage('참가코드를 입력해 주세요.')
      return
    }

    const isValid = await onConfirm(trimmedCode)

    if (!isValid) {
      setErrorMessage('*코드번호가 일치하지 않습니다.')
    }
  }
  const handleClose = () => {
    setEntryCode('')
    setErrorMessage('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <section className="mx-6 mt-2.5 mb-6">
        <header className="flex flex-col items-center justify-center gap-2">
          <img src={imageSrc} alt={imageAlt} />
          <h2 className="text-ui-gray-primary text-[18px] font-semibold">
            {examTitle}
          </h2>
          <p
            id={descriptionId}
            className="text-ui-gray-700 text-[14px] font-normal"
          >
            총 {questionCount}문항 ·{' '}
            <span className="text-primary-default">
              {' '}
              제한시간 {timeLimit}분
            </span>
          </p>
        </header>

        <form
          onSubmit={async (event) => {
            event.preventDefault()
            await handleSubmit()
          }}
        >
          <div className="flex flex-col">
            <label
              className="text-ui-gray-primary mt-8 mb-2 text-[16px] font-normal"
              htmlFor={inputId}
            >
              참가코드 입력
            </label>
            <Input
              id={inputId}
              type="text"
              value={entryCode}
              onChange={(event) => {
                handleChangeEntryCode(event.target.value)
              }}
              placeholder="6자리를 입력해주세요."
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={errorMessage ? errorId : descriptionId}
              className={
                errorMessage ? 'border-other-red focus:border-other-red' : ''
              }
            />
            {errorMessage ? (
              <p
                className="text-other-red mt-[5px] text-[12px] font-normal"
                id={errorId}
              >
                {errorMessage}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="mt-6 w-full rounded-[4px]">
            시험시작
          </Button>
        </form>
      </section>
    </Modal>
  )
}
