"use client"

import React from "react"
import { IElement } from "./interface"
import { globalReducer } from "./reducer/global"
import { GlobalReducerActions, GlobalState, ProjectActions, ProjectState } from "./reducer/interface"
import { projectReducer } from "./reducer/project"

type ContextProps = {
  globalState: GlobalState
  globalDispatch: React.Dispatch<GlobalReducerActions>
  projectState: ProjectState
  projectDispatch: React.Dispatch<ProjectActions>
  deselectProject: () => void
  selectProject: (element: IElement) => void
  deleteElement: (element: IElement) => void
  updateElement: (element: IElement, newElement: IElement) => void
  addElement: (element: IElement) => void
  completeElementCycle: () => void
  setConfigMode: (value: boolean) => void
  migrateElement: (element: IElement, to: string) => void
}

const initialState: GlobalState = {
  workspaceName: "new workspace",
  configMode: false,
  updatedAt: new Date(),
  workspace: {
    position: 0,
    parent: "root",
    summary: {
      parents: ["root"],
      child: []
    },
    title: "workspace",
    type: "workspace",
    id: "workspace_root",
    content: [],
    style: {
      background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
    },
    updatedAt: new Date(),
    project: "root"
  }
}

const initialProjectState: ProjectState = {
  configMode: false,

}

const WorkspaceContext = React.createContext<ContextProps>({
  globalDispatch: () => { },
  globalState: initialState,
  projectDispatch: () => { },
  projectState: initialProjectState,
  deselectProject: () => { },
  selectProject: () => { },
  deleteElement: () => { },
  updateElement: () => { },
  addElement: () => { },
  completeElementCycle: () => { },
  setConfigMode: () => { },
  migrateElement: () => { }
})

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalState, globalDispatch] = React.useReducer(globalReducer, initialState)
  const [projectState, projectDispatch] = React.useReducer(projectReducer, initialProjectState)

  function deselectProject() {

    projectDispatch({
      type: "LOAD_DATA",
      payload: {
        element: undefined
      }
    })
  }

  function setConfigMode(value: boolean) {
    if (projectState.project) {
      projectDispatch({
        type: "SET_CONFIG_MODE",
        payload: { value }
      })
    } else {
      globalDispatch({
        type: "SET_CONFIG_MODE",
        payload: { value }
      })
    }
  }

  function migrateElement(element: IElement, to: string) {
    projectDispatch({
      type: "MIGRATE_ELEMENT",
      payload: {
        to,
        element: {
          ...element,
        }
      }
    })
    globalDispatch({
      type: "MIGRATE_ELEMENT",
      payload: {
        to,
        element: {
          ...element,
        }
      }
    })
  }

  function completeElementCycle() {
    if (projectState.startedElement) {
      migrateElement({
        ...projectState.startedElement,
        metadata: {
          ...projectState.startedElement?.metadata,
          status: "FINISHED"
        }
      }, projectState.startedElement?.metadata?.whenFinish?.migrateTo!)


      projectDispatch({
        type: "REMOVE_STARTED_ELEMENT"
      })
    }
  }

  function selectProject(element: IElement) {
    projectDispatch({
      type: "LOAD_DATA",
      payload: {
        element
      }
    })
  }


  function deleteElement(element: IElement) {
    projectDispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: element.id,
        parentId: element.parent
      }
    })

    globalDispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: element.id,
        parentId: element.parent
      }
    })

  }

  function updateElement(element: IElement, newElement: IElement) {
    projectDispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: element,
        newElement: newElement as IElement,
      }
    })
    globalDispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: element,
        newElement: newElement as IElement,
      }
    })
  }

  function addElement(element: IElement) {
    projectDispatch({
      type: "ADD_ELEMENT",
      payload: {
        parentId: element.parent,
        element: element,
      }
    })
    globalDispatch({
      type: "ADD_ELEMENT",
      payload: {
        parentId: element.parent,
        element: element,
      }
    })
  }

  return (
    <WorkspaceContext.Provider value={{
      globalState,
      globalDispatch,
      projectState,
      projectDispatch,
      selectProject,
      deselectProject,
      deleteElement,
      updateElement,
      addElement,
      completeElementCycle,
      setConfigMode,
      migrateElement
    }}>
      {children}
    </WorkspaceContext.Provider>
  )
}


export const useWorkspace = () => {
  const context = React.useContext(WorkspaceContext)
  if (!context) throw new Error("you must define Board context before use Board hooks")
  return context
}