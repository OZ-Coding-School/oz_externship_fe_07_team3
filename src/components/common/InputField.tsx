import * as React from 'react'
import { Field, FieldLabel, FieldHelperText } from '../ui/field'
import Input, { type InputProps } from '../ui/input'

type InputFieldProps = InputProps & {
  label?: string
  helperText?: string
  fieldLabelClassName?: string
  fieldHelperTextClassName?: string
}

const InputField = ({
  label,
  helperText,
  status,
  id,
  disabled,
  fieldLabelClassName,
  fieldHelperTextClassName,
  ...props
}: InputFieldProps) => {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  const currentStatus = disabled ? 'disabled' : (status ?? 'default')
  const isInvalid = currentStatus === 'danger'

  return (
    <Field data-invalid={isInvalid}>
      {label && (
        <FieldLabel htmlFor={inputId} className={fieldLabelClassName}>
          {label}
        </FieldLabel>
      )}

      <Input id={inputId} status={status} disabled={disabled} {...props} />

      {helperText && currentStatus !== 'disabled' && (
        <FieldHelperText
          status={currentStatus}
          className={fieldHelperTextClassName}
        >
          {helperText}
        </FieldHelperText>
      )}
    </Field>
  )
}

export default InputField
