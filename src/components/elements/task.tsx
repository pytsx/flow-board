"use client"

import React from "react"
import { clsx } from "clsx"
import { Link } from "lucide-react"
import Element, { ElementProps } from "."
import { AddElement } from "./utils/add"
import Paper from "../ui/paper"
import { useWorkspace } from "@/context"

export function Task({ element, type, ...props }: ElementProps) {
  const { dense = false } = props
  const { globalDispatch, projectState, } = useWorkspace()

  if (projectState.startedElement && projectState.startedElement.id !== element.id) {
    if (element.metadata?.status === "ACTIVE") {
      globalDispatch({
        type: "CHANGE_STATUS",
        payload: {
          element: element,
          status: "PAUSED"
        }
      })
    }
  }

  return (

    <Paper
      status={element.metadata?.status}
      dense={dense}
        className={clsx(
          "relative group/card w-full h-full flex-col  items-start p-1 transition-all delay-75 py-1",
          [projectState.startedElement && projectState.startedElement.id !== element.id && !projectState.startedElement.metadata?.whenFinish?.migrateTo && ""]
        )}
      >
      <span className="flex items-center justify-between w-full gap-1">
        <Element type={"text"} element={element} raw />
      </span>

      <div className="h-full w-full px-1 gap-1 flex flex-col py-1">
          {
            Array.isArray(element.content) && element.content.map(el => (
              <Element key={el.id} type={el.type} element={el} {...props} />
            ))
          }
        {<AddElement type={"add"} element={element} />}
        </div>
        {
          !dense &&
        <div className="flex items-center justify-between w-full h-fit gap-1">


              {/* <span className="text-xs font-bold uppercase line-clamp-1 max-w-24">{(element.parent)}</span> */}

            <div className="w-full flex justify-end">
              <button className="p-2 rounded-full hover:bg-neutral-900/10 ">
                {element.metadata?.whenFinish?.migrateTo && <Link className="w-4 h-4" />}
              </button>
            </div>
        </div>
        }

    </Paper>
  )
}