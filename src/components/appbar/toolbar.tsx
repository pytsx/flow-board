import { IElement, useWorkspace } from "@/context"
import Timer from "../automation/timer"
import { Badge } from "../ui/badge"
import Counterdown from "../elements/utils/countdown"
import { RawEditableText } from "../elements/text"

function ElementToolbar({ element }: { element: IElement }) {
  const { projectState, updateElement } = useWorkspace()

  function renameElement(name: string) {
    if (projectState.openedElement) {
      updateElement(projectState.openedElement, { ...projectState.openedElement, title: name })
    }
  }

  return projectState.project && (
    <section className="flex flex-col w-full justify-between">
      <div className="flex px-2 border rounded-sm mx-2  shadow items-stretch ">
        {
          projectState.openedElement && <>
            <RawEditableText
              text={projectState.openedElement.title || ""}
              callback={renameElement}
              className="min-w-32 max-w-32 transition-all delay-75 my-1  px-2 !text-base  border border-dashed border-transparent group-hover/appbar:border-neutral-950/10 rounded-sm  whitespace-nowrap"
            />
          </>
        }
        <div className="flex items-center w-full select-none gap-1">
        </div>

        <div className="flex items-center border-l pl-2">

          <Counterdown element={element} />
          <Timer element={element} />

          <Badge variant={"outline"} className="h-6 rounded-sm opacity-80">
            <p className="!text-[10px]  select-none ">
              {element.metadata?.status}
            </p>
          </Badge>
        </div>
      </div>
    </section>
  )
}

ElementToolbar.displayName = "ElementToolbar"


export default ElementToolbar