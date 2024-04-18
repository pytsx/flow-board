import { IElement, ElementType } from "@/context";
import { Task } from "./task";
import { AddElement } from "./utils/add";
import { TextElement } from "./text";
import { GroupElement } from "./group";
import { DragAndDrop } from "./utils/dragAndDrop";
import ElementActions from "./utils/actions";
import { Feed } from "./feed";
import Planner from "./display/board";
import ElementProject from "./project";
import AvatarElement from "./avatar";
import Workspace from "./display/workspace";

export type ElementProps = {
  element: IElement,
  dense?: boolean,
  parentName?: string,
  type: ElementType,
  style?: React.CSSProperties,
  className?: string
  raw?: boolean
  root?: boolean
  editable?: boolean
}

function Element(props: ElementProps) {
  switch (props.type) {
    case "workspace":
      return <Workspace {...props} />
    case "board":
      return <Planner {...props} />
    case "add":
      return <AddElement {...props} />
    case "project":
      return <DragAndDrop element={props.element} >
        <ElementActions  {...props} opts={{ minimaze: false }}>
          <ElementProject {...props} />
        </ElementActions>
      </DragAndDrop>
    case "avatar":
      if (props.raw) return <AvatarElement {...props} />
      return <DragAndDrop element={props.element} justDrag >
        <ElementActions {...props} opts={{ minimaze: false, select: false }}>
          <AvatarElement {...props} />
        </ElementActions>
      </DragAndDrop>
    case "task":
      if (props.raw) return <Task  {...props} />
      return <DragAndDrop element={props.element} >
        <ElementActions {...props}>
          <Task  {...props} />
        </ElementActions>
      </DragAndDrop>
    case "text":
      if (props.raw) return <TextElement {...props} />
      return <DragAndDrop element={props.element} justDrag >
        <ElementActions opts={{ minimaze: false, select: false }} {...props} >
          <TextElement {...props} />
        </ElementActions>
      </DragAndDrop>
    case "group":
      if (props.raw) return <GroupElement {...props} />
      return <DragAndDrop element={props.element} >
        <ElementActions {...props}>
          <GroupElement {...props} />
        </ElementActions>
      </DragAndDrop>
    case "feed":
      if (props.raw) return <Feed  {...props} />
      return <DragAndDrop element={props.element} >
        <ElementActions  {...props}>
          <Feed  {...props} />
        </ElementActions>
      </DragAndDrop>
    default:
      return null;
  }
}

Element.displayName = "Element"
export default Element