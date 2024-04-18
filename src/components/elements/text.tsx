"use client"
import { useWorkspace } from "@/context";
import clsx from "clsx";
import { ElementProps } from ".";
import React from "react";

export function TextElement({ element, dense, className }: ElementProps) {
  const { updateElement } = useWorkspace()

  function updateAnElement(value: string) {
    updateElement(element, {
      ...element, 
      title: value
    })
  }

  return element.title && (
    <RawEditableText callback={updateAnElement} className={className || ""} text={element.title} dense={dense} />
  )
}


export function RawEditableText({ callback, text, dense, className }: { text: string, callback: (e: string) => void, dense?: boolean, className?: string }) {

  function onBlur(e: React.FocusEvent<HTMLParagraphElement, Element>) {
    const value = e.target.innerText === "" ? text : e.target.innerText
    callback(value || "")
  }

  return (
    <p
      contentEditable={!dense}
      dangerouslySetInnerHTML={{ __html: text }}
      suppressContentEditableWarning={true}
      onBlur={onBlur}
      className={clsx("text-sm line-clamp-2 px-1 py-1", [dense && "line-clamp-4 text-xs"], className)}
      autoFocus
    />
  )
}