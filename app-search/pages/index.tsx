import {Button, Container} from "@/common/components"
import {Slider2, TextInput} from "@/common/components/Form"

export default function SliderPage() {
  const min = 0
  const max = 10

  function displayValue([from, to]: [number, number]) {
    if (from == min && to == max) {
      return <>Any</>
    }
    if (to == max) {
      return <>From {from} and up</>
    }
    if (from == to) {
      return <>Exactly {from}</>
    }
    if (from == min) {
      return <>Up to {to}</>
    }
    return <>Between {from} and {to}</>
  }

  return <>
    <Container w="sm" className="mt-8 space-y-8">
      <TextInput formId="slidersPageForm" name="test" label="Input"/>
      <Slider2
        label={<>Experience<span className="text-slate-400">, years</span></>}
        defaultValue={[min, max]}
        min={min} max={max}
        toVariant="open"
        displayValue={displayValue}
      />
      <Button>Submit</Button>
    </Container>
  </>
}
