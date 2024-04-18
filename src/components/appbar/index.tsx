"use client"
import { useWorkspace } from "@/context"
import ExportProject from "../workspace-io/export.project"
import { RawEditableText } from "../elements/text"
import ExportWorkspace from "../workspace-io/export.workspace"
import LocalStorageSync from "../automation/localStorage.sync"
import ElementToolbar from "./toolbar"
import clsx from "clsx"
import React from "react"
import { Progress } from "../ui/progress"
import { useCountdown } from "@/context/countdown"
import Avatar from "../ui/avatar"
import { Settings } from "lucide-react"
import Element from "../elements"

function calculateProgress(currentValue: number, maxValue: number): number {

  if (maxValue <= 0) {
    throw new Error("Maximum value must be greater than 0");
  }

  const progressPercentage = Math.min(
    100,
    ((currentValue / maxValue) * 100)
  );

  return progressPercentage;
}


function Appbar() {
  const { globalState, setConfigMode, projectState, deselectProject } = useWorkspace()
  const { time } = useCountdown()

  function openProjectSettings() {
    if (projectState.configMode || globalState.configMode) {
      setConfigMode(false)
    } else {
      setConfigMode(true)
    }
  }

  return (
    <header
      className={
        clsx(
          "group/appbar min-h-28 max-h-28 h-28 w-full ",
          !projectState.openedElement && "!h-14 !min-h-14",
          [(projectState.project && !projectState.openedElement) && "transition-all"]
        )}>
      <nav
        className={
          clsx(
            "px-2  w-full flex items-center justify-between h-1/2  ",
            !projectState.openedElement && "!h-full"
          )}>
        <div className="flex items-center gap-1">
          <span className="flex">

            <button
              onClick={projectState.project ? deselectProject : () => { }}
              className="rounded-full flex"
            >
              <Avatar
                editable={false}
                style={{
                  background: globalState.workspace.style.background
                }}
                className="!blur-md"
              />
            {
                projectState.project &&
                <span className="-ml-4">
                  <Avatar
                    editable={false}
                    className="!blur-md "
                    style={{
                      background: projectState.project.style.background
                    }}
                  />
                </span>
            }
            </button>
          </span>
          {
            !projectState.project &&
            <Element
              raw
              type="text"
              element={globalState.workspace}
              className="transition-all delay-75  px-2 h-8 !text-base  border border-dashed border-transparent group-hover/appbar:border-neutral-950/10 rounded-sm  whitespace-nowrap max-w-40 min-w-20"
            />
          }
          {
            projectState.project &&
            <Element
              raw
              type="text"
              element={projectState.project}
              className="transition-all delay-75  px-2 h-8 !text-base  border border-dashed border-transparent group-hover/appbar:border-neutral-950/10 rounded-sm  whitespace-nowrap max-w-40 min-w-20"
            />
          }

          <button onClick={openProjectSettings} className="opacity-0 group-hover/appbar:opacity-80 p-2  rounded-full hover:bg-neutral-500/10 hover:shadow transition-all">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2  whitespace-nowrap items-center flex-row">
          <LocalStorageSync />
        {
            projectState.project && <ExportProject />
        }
        {
            !projectState.project && globalState.workspace.content.length > 0 && <ExportWorkspace />
        }
        </div>
      </nav>
      <div className={clsx(" h-1/2  flex flex-col justify-between", !projectState.openedElement && "!h-0")}>
        {projectState.openedElement && <ElementToolbar element={projectState.openedElement} />}
        <Progress className="h-1 z-50" value={100 - calculateProgress(time, projectState.startedElement?.metadata?.duration || 20)} />

      </div>
    </header>
  )
}


Appbar.displayName = "Appbar"


export default Appbar