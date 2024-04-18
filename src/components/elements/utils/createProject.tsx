"use client"
import { IElement, useWorkspace } from "@/context"
import clsx from "clsx"
import { Plus } from "lucide-react"
import { v4 } from "uuid"
import ImportProject from "../../workspace-io/import.project"
import DashedContainer from "../../ui/dashed-container"
import { generateGradient } from "@/lib/colors"
import ImportWorkspace from "../../workspace-io/import.workspace"
import { ElementProps } from ".."



const AddProjectBtn = ({ dense = false, element }: ElementProps) => {

  const { globalState, selectProject, addElement } = useWorkspace()
  function addBoard() {
    const id = v4()
    const title = "projeto sem título"
    const _element: IElement = {
      id,
      position: globalState.workspace.content.length + 1,
      parent: element.id,
      content: [],
      type: "project",
      style: {
        background: generateGradient(),
      },
      updatedAt: new Date(),
      title,
      summary: {
        parents: [...element.summary.parents],
        child: []
      },
      project: id
    }
    addElement(_element)
    selectProject(_element)
  }


  return (
    <DashedContainer dense={dense} onClick={addBoard} className="!cursor-pointer" >
      <Plus className="opacity-60" />
      <p className="text-center px-1">new project</p>
    </DashedContainer>
  )
}

function CreateProject({ dense = false, ...props }: ElementProps) {

  if (dense) {
    return <>
      <AddProjectBtn {...props} dense={dense} />
      <ImportProject dense={dense} />
      <ImportWorkspace dense={dense} />
      <DashedContainer dense={dense} disabled type="shadow" />
      <DashedContainer dense={dense} disabled type="shadow" />
      <DashedContainer dense={dense} disabled type="shadow" />
    </>
  }

  return (
    <div className={clsx("flex flex-col items-center justify-center gap-2 w-full my-auto")}>
      <AddProjectBtn {...props} />
      <span className="w-full h-full flex gap-2">
        <ImportProject />
        <ImportWorkspace />
      </span>

    </div>
  )
}



CreateProject.displayName = "CreateProject"

export default CreateProject