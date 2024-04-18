"use client"
import { useWorkspace } from "@/context";
import { Folder } from "lucide-react";
import React from "react"
import DashedContainer from "../ui/dashed-container";
import { upload } from "@/lib/upload";


function ImportWorkspace({ dense = false }: { dense?: boolean }) {
  const { globalDispatch } = useWorkspace()

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files || [])[0];
    if (!file) return null
    upload(file, (data) => {
      if (data.type === "workspace") {
        globalDispatch({
          type: "LOAD_WORKSPACE",
          payload: {
            data
          }
        })
      }
    })
  };

  return (
    <DashedContainer dense={dense} type={dense ? "default" : "shadow"} className="relative !overflow-hidden">
      <label
        htmlFor="dropzone-workspace"
        className="flex flex-col gap-1 items-center justify-center !cursor-pointer "
      >
        <Folder className="opacity-60" />
        <p className="text-center">import workspace</p>
        <input onChange={handleImport} id="dropzone-workspace" type="file" className="cursor-pointer absolute opacity-0 h-[250%]" />
      </label>
    </DashedContainer >
  )
}


ImportWorkspace.displayName = "ImportWorkspace"
export default ImportWorkspace