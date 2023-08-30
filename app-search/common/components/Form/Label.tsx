import {memo, ReactNode} from "react"
import {twMerge} from "tailwind-merge"

/*
  Label component is used in forms (rerenders often) so it's memoized despite small VDOM size.
  The page is not gonna have too many such elements so the cost of +few extra pointers is negligible
*/

// Label
export type LabelProps = {
  className?: string
  htmlFor?: string
  children: ReactNode
}

export const Label = memo(function Label(props: LabelProps) {
  const {className, htmlFor, children} = props

  return (
    <label
      htmlFor={htmlFor}
      className={twMerge("block text-sm font-medium leading-6 text-slate-900 hover:cursor-pointer", className)}
    >
      {children}
    </label>
  )
})
