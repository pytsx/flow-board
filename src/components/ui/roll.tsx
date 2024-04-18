import clsx from "clsx"
import React from "react"
import { v4 } from "uuid"

const numbers: Record<string, string> = {
  "0": "-translate-y-0",
  "1": "-translate-y-8",
  "2": "-translate-y-16",
  "3": "-translate-y-24",
  "4": "-translate-y-32",
  "5": "-translate-y-40",
  "6": "-translate-y-48",
  "7": "-translate-y-56",
  "8": "-translate-y-64",
  "9": "-translate-y-72",
}

const Roll = React.memo(({ value }: { value: number }) => {
  let [a, b] = value.toString()

  if (!b) {
    b = a
    a = `0`
  }

  return (
    <span className={"rounded-sm max-h-7 overflow-hidden text-neutral-950/80 flex text-lg font-mono "}>
      <div className={clsx("flex flex-col gap-1 transition-all delay-0", numbers[a || "0"])}>
        {
          Object.keys(numbers).map((number, index) => (
            <span key={number + 100 + value + index + v4()} >{number}</span>
          ))
        }
      </div>
      <div className={clsx("flex flex-col gap-1 transition-all delay-0", numbers[b])}>
        {
          Object.keys(numbers).map((number, index) => (
            <span key={number + index + value + v4()}>{number}</span>
          ))
        }
      </div>
    </span>
  )
})

Roll.displayName = "Roll"
export default Roll 