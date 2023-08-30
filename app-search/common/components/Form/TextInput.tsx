import {forwardRef, memo, ReactNode} from "react"
import {twMerge} from "tailwind-merge"
import {ErrorIcon, Input, InputProps} from "./Input"
import {Label} from "./Label"

// TextInput
export type TextInputProps = Omit<InputProps, "id" | "type"> & {
  formId: string
  label?: ReactNode
}

export const TextInput = memo(forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props, ref) {
  const {
    defaultValue,
    error,
    formId,
    label,
    name,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    value,
  } = props

  return <div>
    {label &&
      <Label htmlFor={formId + "." + name}>{label}</Label>
    }
    <div className={twMerge("rounded-md shadow-sm", label ? "mt-2" : "")}>
      <Input
        defaultValue={defaultValue}
        error={error}
        id={formId + "." + name}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        type="text"
        ref={ref}
        value={value}
      />
      {error && <ErrorIcon/>}
    </div>
    {error && <p className="mt-2 text-sm text-red-600">
      {error}
    </p>}
  </div>
}))
