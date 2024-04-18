"use client"
import { useWorkspace } from "@/context";
import ExportButton from "./export.button";
import { download } from "../../lib/download";

function ExportWorkspace() {
  const { globalState } = useWorkspace()

  function exportWorkspace() {
    if (!globalState) return null
    download(globalState.workspace, globalState.workspace.title || "flowboard")
  }

  return (
    <ExportButton onClick={exportWorkspace} />

  )
}

ExportWorkspace.displayName = "ExportWorkspace"
export default ExportWorkspace