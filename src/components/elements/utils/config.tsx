"use client"
import React from "react"
import { IElement, useWorkspace } from "@/context"
import { AvatarEditor } from "@/components/ui/avatar"
import { ColorResult } from "react-color"

function ConfigElement({ element }: { element: IElement }) {
  const { updateElement } = useWorkspace()
  function changeColor(color: ColorResult) {
    updateElement(element, {
      ...element,
      style: {
        background: color.hex
      }
    })
  }
  return (
    <section className="max-w-screen-lg mx-auto w-full h-full py-8">
      <div className="w-full flex justify-center flex-col max-w-[640px] mx-auto gap-8">
        <AvatarEditor
          callback={changeColor}
          style={{
            background: element.style.background
          }}
        />
      </div>
    </section>
  )
}


ConfigElement.displayName = "ConfigElement"
export default ConfigElement