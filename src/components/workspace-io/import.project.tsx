"use client"

import { useWorkspace } from "@/context";
import { Cloud, File } from "lucide-react";
import React from "react"
import DashedContainer from "../ui/dashed-container";
import { upload } from "@/lib/upload";

function ImportProject({ dense = false }: { dense?: boolean }) {
  const { globalDispatch } = useWorkspace()

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files || [])[0];
    if (!file) return null
    upload(file, (data) => {
      if (data.type) {
        globalDispatch({
          type: "LOAD_PROJECT",
          payload: {
            project: data
          }
        })
      }
    })
  };

  return (
    <DashedContainer dense={dense} type={dense ? "default" : "shadow"} className="relative overflow-hidden">
      <label
        htmlFor="dropzone-file"
        className=" flex flex-col gap-1 items-center justify-center !cursor-pointer"
      >
        <File className="opacity-60" />
        <p className="text-center px-1">import project</p>
        <input onChange={handleImport} id="dropzone-file" type="file" className="cursor-pointer absolute opacity-0 h-[250%]" />
      </label>
    </DashedContainer >
  )
}


ImportProject.displayName = "ImportProject"
export default ImportProject