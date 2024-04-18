"use client"

import { useWorkspace } from "@/context"
import clsx from "clsx"
import { RefreshCcw } from "lucide-react"
import React, { Suspense } from "react"
import { useToast } from "../ui/use-toast"

function LocalStorageSync() {
  const { globalState, globalDispatch, projectState } = useWorkspace()
  const [date, setDate] = React.useState<Date>(new Date())
  const [autoSave, setAutoSave] = React.useState<boolean>(true)
  const [sync, setSync] = React.useState<boolean>(false)
  const { toast } = useToast()

  React.useEffect(() => {
    getLocally()
  }, [])

  React.useEffect(() => {
    if (autoSave) {
      setDate(new Date())
      if (globalState.workspace.content.length > 0) {
        syncLocally()
      }
    }
  }, [globalState.workspace, autoSave])


  function saveLocally() {
    window.localStorage.setItem("flowboard", JSON.stringify(globalState))
  }

  function getLocally() {
    const data = window.localStorage.getItem("flowboard")
    if (data) {
      const state = JSON.parse(data)
      globalDispatch({
        type: "LOAD_DATA",
        payload: {
          data: state
        }
      })

    }
  }

  function syncLocally() {
    setSync(true)
    saveLocally()
    if (!projectState.project) {
      toast({
        title: "Data synced locally"
      })
    }

    if (!autoSave) {
      getLocally()
    }
    setTimeout(() => setSync(false), 500)
  }

  function clearLocalstorage() {
    window.localStorage.clear()
  }

  function onClick() {
    setAutoSave(prev => {
      const newState = !prev
      if (newState) {
        syncLocally()
      } else {
        clearLocalstorage()
      }
      toast({
        title: `auto save ${newState ? "enabled" : "disabled"}`,
        duration: 2000,
        variant: newState ? "default" : "destructive"
      })
      return newState
    })
  }

  return (
    <div
      contentEditable={false}
      className="select-none flex items-center gap-1 cursor-pointer"
      onClick={onClick}>
      <p className="text-xs font-semibold opacity-50 hidden md:inline">
        sync at:
      </p>
      <Suspense>
        <span
          dangerouslySetInnerHTML={
            { __html: (date || new Date()).toLocaleString() }
          }
          className="text-[10px] md:text-xs uppercase"
        ></span>
      </Suspense>
      <RefreshCcw
        className={
          clsx(
            "w-3 h-3 opacity-60",
            sync && "animate-spin",
            autoSave && "!opacity-100 text-blue-800/60",
            !autoSave && "!text-red-800/40"
          )
        }
      />
    </div>
  )
}

LocalStorageSync.displayName = "LocalStorageSync"

export default LocalStorageSync