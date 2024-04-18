"use client"
import { useWorkspace } from "@/context";
import Element from "./elements";
import Appbar from "./appbar";

function App() {
  const { globalState } = useWorkspace()
  return <>
    <Appbar />
    <Element element={globalState.workspace} type="workspace" />
  </>
}

App.displayName = "App"
export default App
export {
  App
}