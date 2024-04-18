import React from "react"
import { ElementProps } from "."
import Avatar from "../ui/avatar"
import { useWorkspace } from "@/context"
import { ColorResult } from "react-color"

const AvatarElement = ({ element, ...props }: ElementProps) => {
  const { updateElement } = useWorkspace()

  function changeColor(newColor: ColorResult) {
    updateElement(element, {
      ...element,
      style: {
        ...element.style,
        background: newColor.hex
      }
    })
  }
  return (
    <Avatar
      {...props}
      callback={changeColor}
      editable={props.editable ? props.editable : true}
      style={{
        background: element.style?.background || "rgba(252,176,69,1)",
      }}
    />
  )
}

AvatarElement.displayName = "AvatarElement"
export default AvatarElement