// Slider2 (uncontrolled only, for now)
import {Label} from "@/common/components/Form"
import {
  ChangeEventHandler,
  forwardRef,
  memo,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import {twMerge} from "tailwind-merge"
import styles from "./Slider2.module.css"

type Value2 = [number, number]
type Variant2 = "exact" | "open"

export type Slider2Props = {
  defaultValue: Value2
  min: number
  max: number
  label?: ReactNode
  onChange?: ([from, to]: Value2) => void
  fromVariant?: Variant2
  toVariant?: Variant2
  displayValue: ([from, to]: Value2) => ReactNode
}

export function Slider2(props: Slider2Props) {
  const {
    label,
    min, max,
    defaultValue = [0, 10],
    onChange,
    fromVariant = "exact",
    toVariant = "exact",
    displayValue,
  } = props

  const [value, setValue] = useState(defaultValue)
  const [dragging, setDragging] = useState<"from" | "to" | undefined>(undefined)

  const fromInputRef = useRef<HTMLInputElement>(null!)
  const toInputRef = useRef<HTMLInputElement>(null!)
  const trackRef = useRef<any>(null!)

  useEffect(function fillColor() {
    const from = parseInt(fromInputRef.current.value)
    const to = parseInt(toInputRef.current.value)

    const fromPercent = from * 100 / max
    const toPercent = to * 100 / max
    trackRef.current.style.background = `linear-gradient(
      to right,
      #cbd5e1 ${fromPercent}%,
      #a855f7 ${fromPercent}%,
      #a855f7 ${toPercent}%,
      #cbd5e1 ${toPercent}%
    )`
  })

  const onChange_ = useCallback(() => {
    const from = parseInt(fromInputRef.current.value)
    const to = parseInt(toInputRef.current.value)
    if (from <= to) {
      // Normal case: just update the displayed value
      setValue([from, to])
      if (onChange) {
        onChange([from, to])
      }
    } else {
      // Crossover case: flip input and displayed values
      fromInputRef.current.value = String(to)
      toInputRef.current.value = String(from)
      setValue([to, from])
      if (onChange) {
        onChange([to, from])
      }
    }
  }, [])

  const onFromMouseDown = useCallback(() => {
    setDragging("from")
  }, [])

  const onToMouseDown = useCallback(() => {
    setDragging("to")
  }, [])

  const onMouseUp = useCallback(() => {
    setDragging(undefined)
  }, [])

  return <div>
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <ValueBox>
        {displayValue(value)}
      </ValueBox>
    </div>
    <div className={styles.slider}>
      <div className="relative mt-4">
        <Track ref={trackRef}/>
        <RangeInput
          className={[
            (fromVariant == "open" && value[0] == min) ? "openLeftRange" : "",
            (dragging == "from" || value[0] == max) ? "z-10" : ""
          ].join(" ")}
          defaultValue={value[0]}
          min={min} max={max}
          onChange={onChange_}
          onMouseDown={onFromMouseDown}
          onMouseUp={onMouseUp}
          ref={fromInputRef}
        />
        <RangeInput
          className={[
            (toVariant == "open" && value[1] == max) ? "openRightRange" : "",
            (dragging == "to") ? "z-10" : "",
          ].join(" ")}
          defaultValue={value[1]}
          min={min} max={max}
          onChange={onChange_}
          onMouseDown={onToMouseDown}
          onMouseUp={onMouseUp}
          ref={toInputRef}
        />
      </div>
    </div>
    <Axis
      min={min}
      max={max}
      fromVariant={fromVariant}
      toVariant={toVariant}
    />
  </div>
}

// Axis
const Axis = memo(function Axis(props: any) {
  const {min, max, fromVariant, toVariant} = props
  return <div className="relative h-4 flex justify-between mt-7 text-xs text-slate-500 select-none">
    <span className="absolute top-0 left-0">{min}{fromVariant == "open" ? "-" : ""}</span>
    <span className="absolute left-1/2 -translate-x-1/2">{(max - min) / 2}</span>
    <span className="absolute top-0 right-0">{max}{toVariant == "open" ? "+" : ""}</span>
  </div>
})

// ValueBox
function ValueBox({children}: {children: ReactNode}) {
  return <div className="px-2 select-none rounded-sm leading-6 bg-white text-sm">
    {children}
  </div>
}

// RangeInput
type RangeInputProps = {
  className?: string
  defaultValue?: number
  min?: number
  max?: number
  onChange?: ChangeEventHandler<HTMLInputElement>
  onMouseDown?: MouseEventHandler<HTMLInputElement>
  onMouseUp?: MouseEventHandler<HTMLInputElement>
  value?: number
}

const RangeInput = forwardRef<HTMLInputElement, RangeInputProps>(function RangeInput(props, ref) {
  const {className, ...rest} = props
  // input[type="range"] {
  //   outline: none;
  //   margin: auto;
  //   background-color: transparent;
  // }

  return <input
    className={twMerge(
      "absolute inset-0 w-full h-0",
      "outline-none appearance-none pointer-events-none",
      className
    )}
    ref={ref}
    type="range"
    {...rest}
  />
})

// Track
type TrackProps = {
  className?: string
}

const Track = memo(forwardRef<HTMLDivElement, TrackProps>(function Track(props, ref) {
  const {className, ...rest} = props
  return <div
    className={twMerge(
      "absolute inset-0 my-auto",
      "rounded-full h-1 bg-slate-300",
      className
    )}
    ref={ref}
    {...rest}
  />
}))
