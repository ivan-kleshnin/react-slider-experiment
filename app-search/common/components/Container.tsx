import {ReactNode} from "react"
import {twMerge} from "tailwind-merge"

export type ContainerProps = {
  className?: string
  children?: ReactNode
  w: "sm" | "md" | "lg" | "xl" | "2xl"
}

export function Container({className, children, w}: ContainerProps) {
  const wCn = (
    w == "sm" ? "max-w-screen-sm" :
    w == "md" ? "max-w-screen-md" :
    w == "lg" ? "max-w-screen-lg" :
    w == "xl" ? "max-w-screen-xl" :
    w == "2xl" ? "max-w-screen-2xl" : ""
  )

  return <>
    <div className={twMerge(
      "relative px-8 mx-auto h-full w-full",
      wCn,
      className,
    )}>
      {children}
    </div>
  </>
}
