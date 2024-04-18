"use client "
import { useWorkspace } from "@/context"
import React from "react"
import CreateProject from "../utils/createProject"
import Element, { ElementProps } from ".."
import ConfigElement from "../utils/config"
import ListProjects from "./listProjects"

function Workspace({ element, ...props }: ElementProps) {
  const { globalState, projectState } = useWorkspace()
  return (
    <section
      className="h-full flex flex-col justify-between select-none"
      style={{
        maxHeight:
          projectState.openedElement
            ? `calc(100vh - 7rem )`
            : `calc(100vh - 3.5rem)`
      }}
    >

      {
        !globalState.configMode &&
        !projectState.project
        && <span className="w-full bg-neutral-200/20 ">
          <div className="h-64 max-w-screen-lg mx-auto w-full px-8 py-4 grid  grid-cols-3 md:grid-cols-6 gap-2">
            <CreateProject dense element={element} {...props} />
          </div>

        </span> // <-- create, import project/workspace 
      }
      {
        !projectState.project &&
        !globalState.configMode &&
        <div className="w-full h-full flex max-w-screen-lg  mx-auto">
          <ListProjects element={element} {...props} />
        </div>
      }


      {
        projectState.project
        && !projectState.configMode
        && <Element element={projectState.project} type={"board"} /> // <--- show project
      }

      {
        projectState.project
        && projectState.configMode
        && <ConfigElement element={projectState.project} /> // <--- config project
      }
      {
        !projectState.project
        && globalState.configMode
        && <ConfigElement element={element} /> // <--- config workspace
      }

    </section>
  )
}
Workspace.displayName = "Workspace"
export default Workspace