import { useForm } from 'react-hook-form'
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '@/schemas/changePasswordSchema'
import axios from 'axios'
import InputField from '@/components/common/InputField'
import Button from '@/components/ui/button'
import { toast } from 'sonner'
import { changePasswordZodErrorsToRHF } from '@/utils/changePasswordZodErrorsToRHF'
import { PASSWORD_CHANGE_FIELDS } from '@/constants/passwordChangeFields'
import { useChangePassword } from '@/api/queries/myInfo/useChangePassword'

type ErrorResponseData = {
  error_detail?: string | Record<string, string[]>
}

export default function MyPasswordTab() {
  const { mutate: changePassword, isPending } = useChangePassword()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const handleChangePasswordError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data as ErrorResponseData | undefined
      const errorDetail = responseData?.error_detail

      if (typeof errorDetail === 'string') {
        toast.error(errorDetail)
        return
      }

      if (errorDetail && typeof errorDetail === 'object') {
        if (errorDetail.old_password?.[0]) {
          setError('old_password', {
            type: 'server',
            message: errorDetail.old_password[0],
          })
        }

        if (errorDetail.new_password?.[0]) {
          setError('new_password', {
            type: 'server',
            message: errorDetail.new_password[0],
          })
        }

        return
      }
    }

    toast.error('비밀번호 변경에 실패했습니다.')
  }

  const onSubmit = (values: ChangePasswordFormValues) => {
    clearErrors()

    const parsed = changePasswordSchema.safeParse(values)

    if (!parsed.success) {
      changePasswordZodErrorsToRHF({
        error: parsed.error,
        setError,
      })
      return
    }

    changePassword(
      {
        old_password: parsed.data.old_password,
        new_password: parsed.data.new_password,
      },
      {
        onSuccess: (data) => {
          toast.success(data.detail || '비밀번호 변경 성공')
          reset()
        },
        onError: handleChangePasswordError,
      }
    )
  }

  return (
    <section className="mb-40">
      <h1 className="text-ui-gray-primary mb-5 text-[32px] font-bold">
        비밀번호 변경
      </h1>

      <div className="border-grey-3 w-186 rounded-xl border px-11 py-13">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex flex-col"
        >
          <div className="mb-10 flex flex-col gap-5">
            {PASSWORD_CHANGE_FIELDS.map(({ id, label, name, placeholder }) => (
              <div
                key={name}
                className="grid grid-cols-[140px_1fr] items-start gap-6"
              >
                <label htmlFor={id} className="w-34 text-base font-normal">
                  {label}
                </label>

                <InputField
                  id={id}
                  type="password"
                  placeholder={placeholder}
                  status={errors[name] ? 'danger' : 'default'}
                  helperText={errors[name]?.message}
                  {...register(name, {
                    onChange: () => {
                      clearErrors(name)

                      if (name === 'new_password') {
                        clearErrors('confirmPassword')
                      }
                    },
                  })}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="fill"
              size="md"
              disabled={isPending}
              className="cursor-pointer rounded-lg px-9 py-5 text-base font-semibold"
            >
              {isPending ? '변경 중...' : '변경하기'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
