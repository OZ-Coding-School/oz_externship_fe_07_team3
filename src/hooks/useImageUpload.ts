import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type UseImageUploadParams = {
  initialPreview?: string | null
  allowedTypes?: string[]
  maxSizeInBytes?: number
  onChange?: (
    file: File | null,
    previewUrl: string | null
  ) => Promise<void> | void
}

const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024

/**
 * 이미지 업로드 훅
 * - 파일 유효성 검사
 * - 로컬 미리보기 생성
 * - 실제 업로드 로직은 바깥에서 처리
 */
export function useImageUpload({
  initialPreview = null,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  maxSizeInBytes = DEFAULT_MAX_SIZE,
  onChange,
}: UseImageUploadParams) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(initialPreview)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    setPreview((prev) => {
      if (prev?.startsWith('blob:')) {
        return prev
      }
      return initialPreview
    })
  }, [initialPreview])

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click()
  }

  const clearImage = () => {
    setPreview((prev) => {
      if (prev?.startsWith('blob:')) {
        URL.revokeObjectURL(prev)
      }
      return null
    })
    setFileName('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    onChange?.(null, null)
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error('jpg, jpeg, png 형식의 이미지 파일만 업로드할 수 있습니다.')
      e.target.value = ''
      return
    }

    if (file.size > maxSizeInBytes) {
      toast.error('이미지 파일은 5MB 이하만 업로드할 수 있습니다.')
      e.target.value = ''
      return
    }

    const nextPreview = URL.createObjectURL(file)

    setPreview((prev) => {
      if (prev?.startsWith('blob:')) {
        URL.revokeObjectURL(prev)
      }
      return nextPreview
    })

    setFileName(file.name)
    onChange?.(file, nextPreview)

    e.target.value = ''
  }

  return {
    fileInputRef,
    preview,
    fileName,
    handleOpenFilePicker,
    handleChangeImage,
    clearImage,
    setPreview,
  }
}
