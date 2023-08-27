import {ReactNode} from "react"
import {twMerge} from "tailwind-merge"

// Label
export type LabelProps = {
  className?: string
  htmlFor?: string
  children: ReactNode
}

export function Label(props: LabelProps) {
  const {className, htmlFor, children} = props

  return (
    <label
      htmlFor={htmlFor}
      className={twMerge("block text-sm font-medium leading-6 text-slate-900 hover:cursor-pointer", className)}
    >
      {children}
    </label>
  )
}
