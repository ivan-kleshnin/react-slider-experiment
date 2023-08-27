import {forwardRef, memo, ReactNode} from "react"
import {twMerge} from "tailwind-merge"
import {ErrorIcon, InputProps} from "./Input"
import {Label} from "./Label"

// Textarea
export type TextareaProps = InputProps & {
  label?: ReactNode
  rows?: number
}

export const Textarea = memo(forwardRef(function Textarea(props: TextareaProps, ref: any) {
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
    rows = 3,
    value,
  } = props

  return <div>
    {label &&
      <Label htmlFor={id}>{label}</Label>
    }
    <div className={twMerge("rounded-md shadow-sm", label ? "mt-2" : "")}>
      <textarea
        className="block rounded-md w-full border-0 py-1.5 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
        defaultValue={defaultValue}
        id={name}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
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
