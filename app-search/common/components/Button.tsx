import * as React from "react"
import {twMerge} from "tailwind-merge"

export type ButtonProps = {
  className?: string
  disabled?: boolean
  children: any
  onClick?: any
  size?: "sm" | "md" | "lg"
  type?: "button" | "submit"
  variant?: "primary" | "secondary" | "outline" // | "text"
}

export function Button(props: ButtonProps) {
  const {
    className,
    disabled = false,
    children,
    onClick,
    size = "md",
    type = "button",
    // variant = "primary"
  } = props

  const baseCn = `font-medium rounded inline-flex items-center gap-x-1.5`

  const sizeCn = (
    size == "sm" ? "text-sm px-2.5 py-1.5 leading-6" :
    size == "md" ? "text-sm px-3 py-2 leading-6" :
    size == "lg" ? "text-sm px-3.5 py-2.5 leading-6" : ""
  )

  const variantCn = `
    text-white
    shadow-sm
    bg-purple-600 hover:bg-purple-500
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600
    disabled:bg-slate-300 disabled:text-slate-500
  `

  return (
    <button
      className={twMerge(baseCn, sizeCn, variantCn, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

// import {size} from "lib/belt/object"
// import * as React from "react"
// import myConfig from "../tailwind.config.js"

// Button
// export type ButtonProps = {
//   children?: React.ReactNode
//   className?: string
//   onClick?: React.MouseEventHandler<HTMLButtonElement>
//   outline?: boolean
//   primary?: boolean
//   size?: "sm" | "md" | "lg"
//   type?: "button" | "submit"
// }

// export const Button = React.forwardRef((props: ButtonProps, ref: any) => {
//   const {
//     children,
//     className,
//     onClick,
//     outline = false,
//     primary = false,
//     size = "md",
//     type = "button",
//     ...rest
//   } = props
//
//   const baseCn = `
//     inline-flex items-center gap-1.5
//     font-medium
//     outline-none border-solid border-2
//     rounded-md transition-colors
//   `
//
//   const sizeCn = (
//     size == "sm" ? "text-sm   px-3   py-1.5" :
//     size == "md" ? "text-base px-4   py-2" :
//     size == "lg" ? "text-lg   px-5   py-2.5" : ""
//   )
//
//   const colorCn = variants[Number(primary)][Number(outline)]
//
//   return (
//     <button
//       {...rest}
//       className={twMerge(baseCn, sizeCn, colorCn, className)}
//       onClick={onClick}
//       ref={ref}
//       type={type}
//     >
//       {children}
//     </button>
//   )
// })
//
// const secondarySolid = `
//   text-white
//   bg-slate-500 hover:bg-slate-600
//   border-slate-500 hover:border-slate-600
// `
//
// const primarySolid = `
//  text-white
//  bg-red-500 hover:bg-red-600
//  border-red-500 hover:border-red-600
// `
//
// const secondaryOutline = `
//   text-slate-700 hover:text-slate-800
//   bg-transparent
//   border-slate-400 hover:border-slate-500
// `
//
// const primaryOutline = `
//   text-red-600 hover:text-red-700
//   bg-transparent
//   border-red-400 hover:border-red-500
// `
//
// const variants = [
//   // row: secondary (0) / primary (1)
//   // col: solid (0) / outline (1)
//   [secondarySolid, secondaryOutline],
//   [primarySolid, primaryOutline],
// ]

