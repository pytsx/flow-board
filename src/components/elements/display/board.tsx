"use client"

import { deepSearch, useWorkspace } from "@/context";
import React, { Fragment } from "react";
import clsx from "clsx";
import Element, { ElementProps } from "..";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../ui/resizable";
import { AddElement } from "../utils/add";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Board = React.memo(({ element, ...props }: ElementProps) => {
  const { globalState, projectState, selectProject } = useWorkspace()
  if (!projectState.project) return null

  function onClick(parent: string) {
    const prevProject = deepSearch(globalState.workspace.content, parent)
    if (prevProject) {
      if (prevProject.id !== parent) {
        onClick(prevProject.parent)
      }
      selectProject(prevProject)
    }
  }
  return (
    <div className="flex flex-col w-full h-full select-none">
      <div className={clsx("w-full h-full flex relative ", globalState.workspace.content.length === 0 && "hidden")}>
        <section className="flex  w-full px-2">
          {
            element?.content.length > 0 &&
            <ResizablePanelGroup
              direction="horizontal"
              className="items-center justify-center grid-cols-5 gap-1 "
            >
              {
                element.parent !== globalState.workspace.id &&
                <span className="h-full pt-[.45rem]">
                  <Button
                    variant={"outline"}
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => projectState.project && onClick(projectState.project.parent)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </span>
              }
              {
                element.content
                  .slice(0, 6)
                  .filter(el => el.title !== undefined)
                  .map((feed, index) => (
                    <Fragment key={feed.id + index}  >
                      <ResizablePanel minSize={20} className="h-full pt-2 ">
                        <Element
                          {...props}
                          type={feed.type}
                          element={feed}
                          style={{
                            maxHeight:
                              projectState.openedElement
                                ? `calc(100vh - 7rem )`
                                : `calc(100vh - 3.5rem )`
                          }} />
                      </ResizablePanel>
                      {
                        (
                          index <= element.content.slice(0, 6).length - 2
                        ) && <ResizableHandle className="h-full" key={feed.id + index + 100} />
                      }
                    </Fragment>
                  ))
              }
            </ResizablePanelGroup>
          }
          <span className={clsx(element?.content.length > 0 ? "w-fit h-fit flex pl-1 pt-[.45rem]" : "w-full h-full px-1 flex items-center justify-center transition-all delay-75")}>
            <AddElement
              type={"add"}
              element={element}
              permanent
              dense
              className="!p-2"
              opts={{
                board: false,
                task: false,
                group: false,
                text: false,
                project: false,
                avatar: false
              }} />
          </span>
        </section>

      </div>

    </div>
  )
})


Board.displayName = "Board"

export default Board