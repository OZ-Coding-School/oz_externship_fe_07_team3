import * as React from 'react'
import { Field, FieldLabel } from './field'
import Input from './input'

interface InputFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
}

export function InputField({
  label,
  status,
  id,
  disabled,
  ...props
}: InputFieldProps) {
  const isInvalid = status === 'danger'

  return (
    <Field data-invalid={isInvalid && !disabled}>
      {/* 라벨이 있을 때만 렌더링 */}
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      {/* 우리가 만든 알맹이 인풋 */}
      <Input id={id} status={status} disabled={disabled} {...props} />
    </Field>
  )
}
