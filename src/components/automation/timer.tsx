"use client"
import { IElement, ElementStatusType, useWorkspace } from "@/context";
import { Loader, LucideIcon, Pause, Play, RefreshCcw } from "lucide-react";
import React from "react";
import { useCountdown } from "@/context/countdown";
import clsx from "clsx";

function Timer({ element }: { element: IElement }) {
  const { projectDispatch, projectState } = useWorkspace()
  const { startCountdown, resetCountdown, pauseCountdown } = useCountdown()

  React.useEffect(() => {
    if (projectState.startedElement && projectState.startedElement?.metadata?.whenFinish?.migrateTo !== undefined && projectState.startedElement?.metadata?.status === "ACTIVE") {
      startCountdown(projectState.startedElement?.metadata.ETA)
    }
  }, [projectState.startedElement?.metadata?.whenFinish?.migrateTo, projectState.startedElement?.metadata?.status])

  function changeStatus(status: ElementStatusType) {
    const newElement: IElement = {
      ...element,
      metadata: {
        ...element.metadata,
        status,
        ETA: status == "IDLE" ? element.metadata?.duration : element.metadata?.ETA,
        whenFinish: status == "IDLE" ? undefined : element.metadata?.whenFinish,
      }
    }

    projectDispatch({
      type: "START_ELEMENT",
      payload: {
        element: newElement
      }
    })

    projectDispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: element,
        newElement: newElement
      }
    })
  }

  function active() {
    if (projectState.startedElement?.metadata?.whenFinish?.migrateTo !== undefined) {
      changeStatus("ACTIVE")
      const el = projectState.project
      if (el) {
        if (el.metadata?.status === "IDLE") {
          startCountdown(el.metadata?.duration)
        } else {
          startCountdown(el.metadata?.ETA)
        }
      }
    } else {
      changeStatus("LINK")
      pauseCountdown()
    }
  }

  function pause() {
    changeStatus("PAUSED")
    pauseCountdown()
  }

  function reset() {
    if (projectState.startedElement?.id === element.id) {
      resetCountdown()
    }
    changeStatus("IDLE")
  }

  return element.metadata?.status !== "FINISHED" && (
    <div className="flex items-center">
      {element.metadata?.status === "LINK" && <TimerButton onClick={pause} icon={Loader} className="animate-spin" />}

      {(element.metadata?.status !== "IDLE"
        && element.metadata?.status !== "LINK")
        && <TimerButton onClick={reset} icon={RefreshCcw} />}

      {(element.metadata?.status !== "ACTIVE"
        && element.metadata?.status !== "LINK")
        && <TimerButton onClick={active} icon={Play} />}
      {element.metadata?.status === "ACTIVE" && <TimerButton onClick={pause} icon={Pause} />}
    </div>
  )
}

function TimerButton({ icon: Icon, onClick, className }: { onClick: () => void, icon: LucideIcon, className?: string }) {
  return <button onClick={onClick} className={clsx("p-2 hover:bg-neutral-400/20 rounded-full", className)}>
    <Icon className="w-4 h-4" />
  </button>
}

Timer.displayName = "Timer"
export default Timer