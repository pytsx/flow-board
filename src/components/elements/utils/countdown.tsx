"use client"
import Roll from "@/components/ui/roll"
import { IElement, useWorkspace } from "@/context"
import { useCountdown } from "@/context/countdown"
import { convertToSeconds, getMinutes, getSeconds } from "@/lib/utils"
import React from "react"

const Counterdown = ({ element }: { element: IElement }) => {
  const { minutes, seconds } = useCountdown()
  const { projectState, updateElement } = useWorkspace()

  const [newTime, setNewTime] = React.useState({
    minutes: getMinutes(projectState.startedElement?.metadata?.duration || 0) || 0,
    seconds: getSeconds(projectState.startedElement?.metadata?.duration || 0) || 0
  })

  function updateDuration(type: "minutes" | "seconds", value: number) {

    setNewTime(prev => {
      const newTime = convertToSeconds(type == "minutes" ? value : prev.minutes, type == "seconds" ? value : prev.seconds)
      projectState.startedElement
        && updateElement(projectState.startedElement, {
          ...projectState.startedElement,
          metadata: {
            ...projectState.startedElement.metadata,
            duration: newTime,
            ETA: newTime,
          }
        })

      return ({
        ...prev,
        ...(type == "minutes" && { minutes: value }),
        ...(type == "seconds" && { seconds: value }),
      })
    })

  }

  switch (element.metadata?.status) {
    case "ACTIVE":
      if (element.id !== projectState.startedElement?.id) return null
      return <div className="flex items-center">
        <Roll value={minutes} />
        <span>:</span>
        <Roll value={seconds} />
      </div>
    case "LINK":
      if (element.id !== projectState.startedElement?.id) return null
      return <div className="flex items-center gap-1 select-none">
        <input
          className="border rounded-sm max-w-14 text-center"
          type="number"
          value={newTime.minutes}
          onChange={(e) => updateDuration("minutes", Number(e.target.value))}
        />
        :
        <input
          className="border rounded-sm  max-w-14 text-center"
          type="number"
          value={newTime.seconds}
          onChange={(e) => updateDuration("seconds", Number(e.target.value))}
        />
      </div>
    default:
      return null
  }
}

Counterdown.displayName = "Counterdown"
export default Counterdown