import { useWorkspace } from "@/context";
import ExportButton from "./export.button";
import { download } from "../../lib/download";

function ExportBoard() {
  const { projectState, globalState } = useWorkspace()
  function exportProject() {
    if (!projectState.project) return null
    download(projectState.project, `[${globalState.workspace.title}] ${projectState.project.title}`)
  }
  return (
    <ExportButton
      onClick={exportProject}
    />
  )
}

ExportBoard.displayName = "ExportBoard"
export default ExportBoard