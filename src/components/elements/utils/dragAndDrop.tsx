"use client"

import React from "react";
import { IElement, useWorkspace } from "@/context";
import clsx from "clsx";
type Props = {
  children: React.ReactNode,
  element: IElement,
  disabled?: boolean,
  justDrag?: boolean
}
export function DragAndDrop({ children, element, disabled, justDrag = false }: Props) {
  const { projectDispatch, projectState, migrateElement } = useWorkspace()
  const [drag, setDrag] = React.useState<boolean>(false)

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (justDrag) return null
    if (element.summary.parents.includes(projectState?.selectedElement?.id || "")) return null

    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    e.stopPropagation()
    if (!projectState.project) return null

    projectDispatch({
      type: "SET_REF_ELEMENT",
      payload: {
        element: element,
      }
    })
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation()
    projectDispatch({
      type: "SELECT_ELEMENT",
      payload: {
        element: element
      }
    })
    setDrag(true)
  }

  function onDragEnd() {
    setDrag(false)

    if (!projectState.selectedElement) return null
    if (!projectState.refElement) return null
    if ((projectState.selectedElement.parent === projectState.refElement.id)) return null
    if ((projectState.selectedElement.id === projectState.refElement.id)) return null

    migrateElement(projectState.selectedElement, projectState.refElement.id)
    projectDispatch({
      type: "DESELECT_ELEMENT",
    })
    projectDispatch({
      type: "REMOVE_REF_ELEMENT",
    })
  }

  return <div
    onDragOver={onDragOver}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    draggable={projectState.startedElement ? projectState.startedElement.metadata?.status !== "ACTIVE" : !disabled}
    className={clsx(
      "relative group/dragAndDrop cursor-pointer w-full transition-all delay-75 h-full",
      [drag || (drag && projectState?.selectedElement && projectState?.selectedElement.id === element.id) && "scale-90 opacity-50"],
      [disabled && "cursor-default h-full w-full delay-75 transition-[width]"],
    )}
  >
    {children}
  </div>
}