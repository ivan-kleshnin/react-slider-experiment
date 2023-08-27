import {forwardRef, memo, ReactNode} from "react"
import {twMerge} from "tailwind-merge"
import {ErrorIcon, Input, InputProps} from "./Input"
import {Label} from "./Label"

// TextInput
export type TextInputProps = InputProps & {
  label?: ReactNode
}

export const TextInput = memo(forwardRef(function TextInput(props: TextInputProps, ref: any) {
  const {
    defaultValue,
    error,
    id = props.name,
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
      <Label htmlFor={id}>{label}</Label>
    }
    <div className={twMerge("rounded-md shadow-sm", label ? "mt-2" : "")}>
      <Input
        defaultValue={defaultValue}
        error={error}
        id={id}
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
