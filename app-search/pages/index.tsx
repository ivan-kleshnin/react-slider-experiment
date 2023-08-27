import {Container} from "@/common/components"
import {Label, TextInput} from "@/common/components/Form"
import {
  ChangeEventHandler,
  forwardRef,
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import {twMerge} from "tailwind-merge"
import styles from "./slider.module.css"

export default function SliderPage() {
  const min = 0
  const max = 11
  const defaultFrom = 0
  const defaultTo = 11

  const [from, setFrom] = useState(defaultFrom)
  const [to, setTo] = useState(defaultTo)
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

  const onFromChange = useCallback(() => {
    const from = parseInt(fromInputRef.current.value)
    const to = parseInt(toInputRef.current.value)

    if (from <= to) {
      // Normal case: just update the displayed value
      setFrom(from)
    } else {
      // Crossover case: flip input and displayed values
      fromInputRef.current.value = String(to)
      toInputRef.current.value = String(from)
      setFrom(to)
      setTo(from)
    }
  }, [])

  const onToChange = useCallback(() => {
    const from = parseInt(fromInputRef.current.value)
    const to = parseInt(toInputRef.current.value)

    if (to >= from) {
      // Normal case: just update the displayed value
      setTo(to)
    } else {
      // Crossover case: flip input and displayed values
      toInputRef.current.value = String(from)
      fromInputRef.current.value = String(to)
      setTo(from)
      setFrom(to)
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

  return <>
    <Container w="sm" className="mt-8">
      <TextInput name="test" label="Input"/>
      <div className="mt-8"/>
      <div className="flex justify-between">
        <Label>From, years</Label>
        <Label>To, years</Label>
      </div>
      <div className={styles.slider}>
        <div className="flex justify-between mt-1">
          <ValueBox value={from}/>
          <ValueBox value={to >= max ? Infinity : to}/>
        </div>
        <div className="relative mt-4">
          <Track ref={trackRef}/>
          <RangeInput
            className={dragging == "from" || from == max ? "z-10" : ""}
            defaultValue={defaultFrom}
            min={min} max={max}
            onChange={onFromChange}
            onMouseDown={onFromMouseDown}
            onMouseUp={onMouseUp}
            ref={fromInputRef}
          />
          <RangeInput
            className={dragging == "to" ? "z-10" : ""}
            defaultValue={defaultTo}
            min={min} max={max}
            onChange={onToChange}
            onMouseDown={onToMouseDown}
            onMouseUp={onMouseUp}
            ref={toInputRef}
          />
        </div>
      </div>
    </Container>
  </>
}

// ValueBox
type ValueBoxProps = {
  value: number
}

const ValueBox = memo(function ValueBox(props: ValueBoxProps) {
  const {value} = props
  return <span className="px-2 select-none rounded-sm leading-6 bg-white text-sm font-medium text-purple-500">
    {isFinite(value) ? value : <>&infin;</>}
  </span>
})

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
  return <input
    className={twMerge(
      "absolute inset-0 w-full",
      "appearance-none pointer-events-none",
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
      "w-full inset-0 rounded-full h-1 slider-track bg-white",
      className
    )}
    ref={ref}
    {...rest}
  />
}))
