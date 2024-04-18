"use client"

import { IElement, useWorkspace } from "@/context";
import clsx from "clsx";
import React from "react";
import Element from "..";
import Paper from "../../ui/paper";
import { useCountdown } from "@/context/countdown";

type Props = {
  element: IElement,
  children: React.ReactNode
  opts?: {
    delete?: boolean
    minimaze?: boolean
    select?: boolean
  }
}

const ElementActions = React.memo(({ element, children, opts }: Props) => {
  const defaultOpts = {
    delete: true,
    minimaze: true,
    select: true
  }
  if (!opts) {
    opts = defaultOpts
  } else {
    opts = {
      ...defaultOpts,
      ...opts
    }
  }
  const { projectState, projectDispatch, deleteElement } = useWorkspace()
  const { startCountdown } = useCountdown()
  const [select, isSelect] = React.useState<boolean>(projectState.selectedElement?.id == element.id)
  const [minimaze, setMinimaze] = React.useState<boolean>(false)

  const toogleMinimaze = () => {
    setMinimaze(prev => !prev)
  }

  React.useEffect(() => {
    if (projectState.selectedElement && projectState.selectedElement.id == element.id) {
      isSelect(true)
    } else {
      isSelect(false)
    }
  }, [projectState])

  function selectElement(e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    e.stopPropagation()
    projectDispatch({
      type: "SELECT_ELEMENT",
      payload: {
        element
      }
    })
  }

  function deselectElement(e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    e.stopPropagation()
    projectDispatch({
      type: "DESELECT_ELEMENT",
    })
  }

  function setRef() {
    if (projectState.startedElement && !!!projectState.startedElement.metadata?.whenFinish?.migrateTo) {
      const newElement: IElement = {
        ...projectState.startedElement,
        metadata: {
          ...projectState.startedElement.metadata,
          status: "ACTIVE",
          whenFinish: {
            migrateTo: element.id,
          }
        }
      }
      projectDispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          oldElement: projectState.startedElement,
          newElement
        }
      })

      projectDispatch({
        type: "START_ELEMENT",
        payload: {
          element: newElement
        }
      })

      startCountdown(newElement.metadata?.duration)
    }

  }

  function openAndCloseElement(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    if (projectState.openedElement && projectState.openedElement.id === element.id) {
      projectDispatch({
        type: "REMOVE_OPEN_ELEMENT",
      })
      return
    }
    projectDispatch({
      type: "OPEN_ELEMENT",
      payload: {
        element
      }
    })
  }


  const couldElementBeLinked = projectState.startedElement
    && projectState.startedElement.id !== element.id
    && projectState.startedElement.metadata?.status === "LINK"
    && !element.summary.parents.includes(projectState.startedElement.id)
    && !projectState.startedElement.metadata?.whenFinish?.migrateTo
    && element.metadata?.status !== "FINISHED"

  return (
    <div
      className={
        clsx(" select-none relative w-full h-full flex flex-col rounded-sm transition-all delay-75")}
    >
      <div onMouseEnter={selectElement} onMouseLeave={deselectElement} className={clsx(
        "absolute -top-2 -left-0 z-50 opacity-0 h-fit w-fit pr-4 flex items-center justify-between transition-all delay-75",
        (select || couldElementBeLinked) && "opacity-100",
      )}>
        <span className="flex ">
          {
            couldElementBeLinked
              ? < ActionButton color="blue" onClick={setRef} disabled={!opts.select} />
              : <>
                <ActionButton color="red" onClick={() => deleteElement(element)} disabled={!opts.delete} />
                <ActionButton color="orange" onClick={toogleMinimaze} disabled={!opts.minimaze} />
                <ActionButton color="green" onClick={openAndCloseElement} disabled={!opts.minimaze} />
              </>
          }
        </span>
      </div>


      {!minimaze &&
        <div className={
          clsx("w-full h-full relative",
            select && "animate-pulse ",
            [(projectState.startedElement?.metadata?.whenFinish?.migrateTo === element.id
              || projectState.startedElement?.id === element.id)
              && "animate-pulse "],
          )}>
          {children}
        </div>}

      {
        minimaze &&
        <Paper status={element.metadata?.status} active={!minimaze}>
          <Element className="text-center w-full !capitalize" type="text" element={element} raw />
        </Paper>
      }
    </div >
  )
})

type ActionButtonColors = "blue" | "orange" | "red" | "green"
function ActionButton({ disabled, onClick, color }: { disabled: boolean, onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, color: ActionButtonColors }) {
  const colorStyle = {
    blue: {
      button: "hover:bg-blue-900/10",
      div: "bg-blue-500"
    },
    orange: {
      button: "hover:bg-orange-900/10",
      div: "bg-orange-500"
    },
    red: {
      button: "hover:bg-red-900/10",
      div: "bg-red-500"
    },
    green: {
      button: "hover:bg-green-900/10",
      div: "bg-green-500"
    }
  }[color]
  return !disabled &&
    <button className={clsx("z-50 relative flex items-center justify-center p-[.125rem] rounded-full", colorStyle.button)} onClick={onClick}>
      <div className={clsx("w-3 h-3  rounded-full", colorStyle.div)} />
      <div className={"absolute w-2 h-2 bg-white/20 rounded-full"} />
    </button>
}


ElementActions.displayName = "ElementActions"
export default ElementActions