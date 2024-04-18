"use client"
import React from "react"
import { useWorkspace } from "../workspace";
import { getMinutes, getSeconds } from "@/lib/utils";


interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: (time?: number) => void;
  resetCountdown: () => void;
  pauseCountdown: () => void;
  time: number;

}

const Context = React.createContext<CountdownContextData>({} as CountdownContextData)

const maxMinutes = 25;
let countdownTimeout: NodeJS.Timeout;

export const CountdownProvider = ({ children }: { children: React.ReactNode }) => {
  const { projectState, updateElement, completeElementCycle } = useWorkspace()
  const [time, setTime] = React.useState(projectState.startedElement?.metadata?.duration || maxMinutes);
  const [isActive, setIsActive] = React.useState(false);
  const [hasFinished, setHasFinished] = React.useState(false);

  const [minutes, setMinutes] = React.useState(getMinutes(time))
  const [seconds, setSeconds] = React.useState(getSeconds(time))

  function startCountdown(_time: number = maxMinutes) {
    clearTimeout(countdownTimeout);
    setTime(_time)
    setMinutes(getMinutes(_time))
    setSeconds(getSeconds(_time))
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(projectState.startedElement?.metadata?.duration || maxMinutes);
    setHasFinished(false);
  }
  React.useEffect(() => {
    if (projectState.startedElement && projectState.startedElement.metadata?.whenFinish?.migrateTo) {

      if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
          const newTime = time - 1
          setTime(newTime);
          setMinutes(Math.floor(newTime / 60))
          setSeconds(newTime % 60)
          if (projectState.startedElement && newTime % 4 === 0) {
            updateElement(projectState.startedElement, {
              ...projectState.startedElement,
              metadata: {
                ...projectState.startedElement.metadata,
                ETA: time
              }
            })
          }
        }, 1000);

      } else if (isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
        resetCountdown()
        if (projectState.startedElement && projectState.startedElement.metadata?.whenFinish?.migrateTo) {
          completeElementCycle()
        }
      }
    } else {
      resetCountdown()
    }
    return () => clearTimeout(countdownTimeout)
  }, [isActive, time]);

  function pauseCountdown() {
    setIsActive(false)
  }

  return (
    <Context.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
      pauseCountdown,
      time
    }}>
      {children}
    </Context.Provider>
  )
}


export const useCountdown = () => {
  const context = React.useContext(Context)
  if (!context) throw new Error("you must define Board context before use Board hooks")

  return context
}