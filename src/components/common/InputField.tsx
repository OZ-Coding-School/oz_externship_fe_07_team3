import * as React from 'react'
import { Field, FieldLabel, FieldHelperText } from '../ui/field'
import Input, { type InputProps } from '../ui/input'

type InputFieldProps = InputProps & {
  label?: string
  required?: boolean
  helperText?: string
  fieldLabelClassName?: string
  fieldHelperTextClassName?: string
  requiredMarkClassName?: string
}

const InputField = ({
  label,
  required = false,
  helperText,
  status,
  id,
  disabled,
  fieldLabelClassName,
  fieldHelperTextClassName,
  requiredMarkClassName = 'text-other-red',
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
          {required && <span className={requiredMarkClassName}>*</span>}
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
