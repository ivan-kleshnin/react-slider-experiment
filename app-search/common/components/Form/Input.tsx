import {ExclamationCircleIcon} from "@heroicons/react/20/solid"
import {FocusEvent, forwardRef} from "react"
import {twMerge} from "tailwind-merge"

// Notes: no left/right icon support

// Input
export type InputProps = {
  defaultValue?: string
  id?: string
  error?: string
  max?: string | number
  min?: string | number
  name: string
  onChange?: any
  onFocus?: (event: FocusEvent<unknown>) => void
  onBlur?: (event: FocusEvent<unknown>) => void
  pattern?: string
  placeholder?: string
  type?: string
  value?: string
}

export const Input = forwardRef(function Input(props: InputProps, ref: any) {
  const {
    defaultValue,
    id,
    error,
    max,
    min,
    name,
    onChange,
    onFocus,
    onBlur,
    pattern,
    placeholder,
    type = "text",
    value
  } = props


  const baseCn = `
    block w-full py-1.5
    text-sm leading-6
    rounded-md border-0 ring-inset focus:ring-inset ring-1 focus:ring-2
  `

  const statusCn = (error
    ? "text-red-900 ring-red-300 focus:ring-red-500 placeholder:text-red-300"
    : "text-slate-900 ring-slate-300 focus:ring-purple-600 placeholder:text-slate-400"
  )

  const iconCn = error ? "pr-10" : ""

  return (
    <input
      autoComplete="off"
      defaultValue={defaultValue}
      id={id}
      className={twMerge(baseCn, statusCn, iconCn)}
      max={max}
      min={min}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      pattern={pattern}
      placeholder={placeholder}
      ref={ref}
      type={type}
      value={value}
    />
  )
})

// ErrorIcon
export function ErrorIcon() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <ExclamationCircleIcon
        className="h-5 w-5 text-red-500"
      />
    </div>
  )
}
