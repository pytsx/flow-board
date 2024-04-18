"use client"
import { useWorkspace } from "@/context";
import { ElementProps } from ".";
import AvatarElement from "./avatar";

function ElementProject({ element, ...props }: ElementProps) {
  const { selectProject } = useWorkspace()
  const onClick = () => selectProject(element)
  return (
    <div
      onClick={onClick}
      className="!select-none relative group/board  h-64 min-w-24  flex flex-col justify-between border rounded-sm text-sm cursor-pointer ring ring-transparent hover:ring-blue-300/30 active:shadow-none overflow-hidden"
    >
      <div className="h-full w-full  flex justify-end items-start relative">
        <AvatarElement {...props} element={element} editable={false} className="!h-2 !w-[150%] absolute -top-1 -left-4 opacity-90 z-40 !border-none" />
      </div>
      <div className=" py-1 w-full bg-white/20 backdrop-blur-md"></div>

      <div className="w-full h-1/4 bg-white/50 backdrop-blur-md flex flex-col justify-between gap-1 transition-all border-t p-2">
        <p className=" w-full line-clamp-1 leading-3 select-none text-[12px]  text-neutral-800/70 transition-all">
          {element.title}
        </p>

        {
          typeof element.updatedAt === "string" &&
          typeof element.updatedAt !== "object" &&
          <p className="capitalize w-full line-clamp-1 leading-3 select-none text-[12px]  text-neutral-800/70 transition-all">
            atualizado: {new Date(element.updatedAt).toLocaleString() || new Date().toLocaleString()}
          </p>
        }


      </div>
    </div>
  )
}

ElementProject.displayName = "ElementProject"
export default ElementProject