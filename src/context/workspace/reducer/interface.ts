import { IElement, ElementStatusType } from "../interface"

export type GlobalState = {
  workspaceName: string
  updatedAt: Date
  workspace: IElement
  configMode: boolean
}

export type ProjectState = {
  project?: IElement
  startedElement?: IElement
  selectedElement?: IElement
  refElement?: IElement
  openedElement?: IElement
  configMode: boolean
  configElement?: IElement
  returnTo?: string
}


export type CommonReducerActions = | {
  type: "ADD_ELEMENT",
  payload: {
    parentId: string
    projectId?: string
    element: IElement
  }
} | {
  type: "UPDATE_ELEMENT",
  payload: {
    oldElement: IElement
    newElement: IElement
  }
} | {
  type: "DELETE_ELEMENT",
  payload: {
    elementId: string
    parentId: string
  }
} | {
  type: "MIGRATE_ELEMENT",
  payload: {
    to: string
    element: IElement
  }
} | {
  type: "CHANGE_STATUS"
  payload: {
    element: IElement
    status: ElementStatusType
  }
} | {
  type: "SET_CONFIG_MODE",
  payload: { value: boolean }
}

export type GlobalReducerActions =
  | CommonReducerActions
  | {
    type: "LOAD_DATA",
    payload: {
      data: GlobalState
    }
  }
  | {
    type: "LOAD_PROJECT",
    payload: {
      project: IElement
    }
  } | {
    type: "LOAD_WORKSPACE",
    payload: {
      data: GlobalState
    }
  } | {
    type: "RENAME_WORKSPACE",
    payload: {
      value: string
    }
  }

export type ProjectActions =
  CommonReducerActions | {
    type: "LOAD_DATA"
    payload: {
      element?: IElement
    }
  } | {
    type: "START_ELEMENT",
    payload: {
      element: IElement
    }
  } | {
    type: "CHANGE_STATUS"
    payload: {
      element: IElement
      status: ElementStatusType
    }
  } | {
    type: "SELECT_ELEMENT",
    payload: {
      element: IElement
    }
  } | {
    type: "OPEN_ELEMENT",
    payload: {
      element: IElement
    }
  } | {
    type: "SET_REF_ELEMENT",
    payload: {
      element: IElement
    }
  }
  | { type: "REMOVE_REF_ELEMENT" }
  | { type: "DESELECT_ELEMENT" }
  | { type: "REMOVE_OPEN_ELEMENT" }
  | { type: "REMOVE_STARTED_ELEMENT" }