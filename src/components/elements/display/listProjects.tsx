"use client "
import { useWorkspace } from "@/context"
import React from "react"
import Element, { ElementProps } from ".."
import clsx from "clsx"

function ListProjects({ element, ...props }: ElementProps) {
  const { globalState } = useWorkspace()
  return !globalState.configMode && element.content.length > 0 &&
    <div className={clsx("h-full max-w-screen-xl mx-auto w-full px-2 flex flex-col select-none",
      // projectState.project && "hidden"
    )} >
      <span className="h-1/2 w-full">
        {
          element.content.length > 0 &&
          <section className=" grid grid-flow-row md:grid-cols-3  lg:grid-cols-5 gap-1 md:gap-4 py-8">
            {element.content
              .sort((a, b) => (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
              .map(project => project.type === "project" && (
                <Element key={project.id + "root"} element={project} type={"project"} />
              ))}
          </section>
        }
      </span>
    </div>

}

ListProjects.displayName = "ListProjects"
export default ListProjects