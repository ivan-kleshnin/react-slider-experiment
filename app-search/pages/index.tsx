import {Container} from "@/common/components"
import {Label, TextInput} from "@/common/components/Form"
import {twMerge} from "tailwind-merge"
import {forwardRef, useCallback, useEffect, useRef, useState} from "react"
import styles from "./slider.module.css"

export default function SliderPage() {
  const min = 0
  const max = 11
  const defaultFrom = 0
  const defaultTo = 11

  const [from, setFrom] = useState(defaultFrom)
  const [to, setTo] = useState(defaultTo)

  const fromInputRef = useRef<HTMLInputElement>(null!)
  const toInputRef = useRef<HTMLInputElement>(null!)
  const trackRef = useRef<any>(null!)

  useEffect(function fillColor() {
    const fromValue = parseInt(fromInputRef.current.value)
    const toValue = parseInt(toInputRef.current.value)

    const fromPercent = fromValue * 100 / max
    const toPercent = toValue * 100 / max
    trackRef.current.style.background = `linear-gradient(
      to right, 
      #cbd5e1 ${fromPercent}%, 
      #a855f7 ${fromPercent}%, 
      #a855f7 ${toPercent}%, 
      #cbd5e1 ${toPercent}%
    )`
  })

  const onFromChange = useCallback(() => {
    const fromValue = parseInt(fromInputRef.current.value)
    const toValue = parseInt(toInputRef.current.value)

    if (fromValue <= toValue) {
      // Normal case: just update the displayed value
      setFrom(fromValue)
    } else {
      // Crossover case: flip input and displayed values
      fromInputRef.current.value = String(toValue)
      toInputRef.current.value = String(fromValue)
      setFrom(toValue)
      setTo(fromValue)
    }
  }, [])

  const onToChange = useCallback(() => {
    const fromValue = parseInt(fromInputRef.current.value)
    const toValue = parseInt(toInputRef.current.value)

    if (toValue >= fromValue) {
      // Normal case: just update the displayed value
      setTo(toValue)
    } else {
      // Crossover case: flip input and displayed values
      toInputRef.current.value = String(fromValue)
      fromInputRef.current.value = String(toValue)
      setTo(fromValue)
      setFrom(toValue)
    }
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
          <span className="px-2 select-none rounded-sm leading-6 bg-white text-sm font-medium text-purple-500">
            {from}
          </span>
          <span className="px-2 select-none rounded-sm leading-6 bg-white text-sm font-medium text-purple-500">
            {to >= max ? <>&infin;</> : to}
          </span>
        </div>
        <div className="relative mt-4">
          <Track ref={trackRef}/>
          <RangeInput
            defaultValue={defaultFrom}
            min={min} max={max}
            onChange={onFromChange}
            ref={fromInputRef}
          />
          <RangeInput
            defaultValue={defaultTo}
            min={min} max={max}
            onChange={onToChange}
            ref={toInputRef}
          />
        </div>
      </div>
    </Container>
  </>
}

const RangeInput = forwardRef(function RangeInput({className, ...rest}: any, ref: any) {
  // original had: margin: auto
  // original had: outline-none
  // className="bg-transparent"
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

const Track = forwardRef(function Track(_: any, ref: any) {
  return <div
    className={twMerge(
      "absolute inset-0 my-auto",
      "w-full inset-0 rounded-full h-1 slider-track bg-white"
    )}
    ref={ref}
  />
})

// const slider1 = document.getElementById('slider-1') as HTMLInputElement
// const slider2 = document.getElementById('slider-2') as HTMLInputElement
// const rangeDisplay1 = document.getElementById('range1')!
// const rangeDisplay2 = document.getElementById('range2')!
// const sliderTrack = document.querySelector('.slider-track') as HTMLDivElement
//
// function slideOne() {
//   if (parseInt(slider2.value) < parseInt(slider1.value)) {
//     slider1.value = slider2.value
//   }
//   rangeDisplay1.textContent = slider1.value
//   fillColor()
// }
//
// function slideTwo() {
//   if (parseInt(slider2.value) < parseInt(slider1.value)) {
//     slider2.value = slider1.value
//   }
//   rangeDisplay2.textContent = slider2.value
//   fillColor()
// }
//
// function fillColor() {
//   const percent1 = (parseInt(slider1.value) / parseInt(slider1.max)) * 100
//   const percent2 = (parseInt(slider2.value) / parseInt(slider1.max)) * 100
//   sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , rgb(79 70 229) ${percent1}% , rgb(79 70 229) ${percent2}% , #dadae5 ${percent2}%)`
// }
