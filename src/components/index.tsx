"use client"
import { WorkspaceProvider } from "@/context";
import Workspace from "./elements/display/workspace";
import { Toaster } from "./ui/toaster";
import { CountdownProvider } from "@/context/countdown";
import "../app/globals.css";
import App from "./app";

function FlowBoard() {
  return (
    <WorkspaceProvider >
      <CountdownProvider>
        <App />
        <Toaster />
      </CountdownProvider>
    </WorkspaceProvider>
  );
}

FlowBoard.displayName = "FlowBoard"
export default FlowBoard
export {
  FlowBoard
}