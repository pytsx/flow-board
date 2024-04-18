import { ProjectActions, ProjectState } from "./interface";
import { addElement, changeElementStatus, deleteElement, migrateElement, updateElement } from "./utils";

export function projectReducer(
  state: ProjectState,
  action: ProjectActions
): ProjectState {
  switch (action.type) {
    case "LOAD_DATA":
      if (!action.payload.element) {
        return {
          openedElement: undefined,
          project: undefined,
          refElement: undefined,
          selectedElement: undefined,
          startedElement: undefined,
          configMode: false
        }
      }
      return {
        ...state,
        project: {
          ...action.payload.element
        },
      };
    case "ADD_ELEMENT":
      if (!state.project) return state
      return {
        ...state,
        project: addElement([state.project], action)[0],
        ...(action.payload.parentId === state.openedElement?.id && { openedElement: { ...state.openedElement, content: addElement(state.openedElement.content, action) } }),
        ...(action.payload.parentId === state.refElement?.id && { refElement: { ...state.refElement, content: addElement([state.refElement], action) } }),
        ...(action.payload.parentId === state.selectedElement?.id && { selectedElement: { ...state.selectedElement, content: addElement([state.selectedElement], action) } }),
        ...(action.payload.parentId === state.startedElement?.id && { startedElement: { ...state.startedElement, content: addElement([state.startedElement], action) } }),
        ...(action.payload.parentId === state.configElement?.id && { configElement: { ...state.configElement, content: addElement([state.configElement], action) } }),
      }
    case "UPDATE_ELEMENT":
      if (!state.project) return state 

      if (state.project.id === action.payload.newElement.id) {
        return {
          ...state,
          project: {
            ...state.project,
            ...action.payload.newElement,
          }
        }
      }

      return {
        ...state,
        project: updateElement([state.project], action)[0],
        ...(action.payload.oldElement.id === state.openedElement?.id && { openedElement: { ...state.openedElement, ...action.payload.newElement } }),
        ...(action.payload.oldElement.id === state.refElement?.id && { refElement: { ...state.refElement, ...action.payload.newElement } }),
        ...(action.payload.oldElement.id === state.selectedElement?.id && { selectedElement: { ...state.selectedElement, ...action.payload.newElement } }),
        ...(action.payload.oldElement.id === state.startedElement?.id && { startedElement: { ...state.startedElement, ...action.payload.newElement } }),
        ...(action.payload.oldElement.id === state.configElement?.id && { configElement: { ...state.configElement, ...action.payload.newElement } }),
      }
    case "DELETE_ELEMENT":
      if (!state.project) return state
      return { 
        ...state,
        project: deleteElement([state.project], action)[0],
        ...(action.payload.elementId === state.openedElement?.id && { openedElement: undefined }),
        ...(action.payload.elementId === state.refElement?.id && { refElement: undefined }),
        ...(action.payload.elementId === state.selectedElement?.id && { selectedElement: undefined }),
        ...(action.payload.elementId === state.startedElement?.id && { startedElement: undefined }),
        ...(action.payload.elementId === state.configElement?.id && { configElement: undefined }),
      }
    case "MIGRATE_ELEMENT":
      if (!state.project) return state
      if (state.startedElement) {
      }
      return {
        ...state,
        project: migrateElement([state.project], action)[0],
        ...(action.payload.element.id === state.openedElement?.id && { openedElement: { ...state.openedElement, ...action.payload.element, parent: action.payload.to } }),
        ...(action.payload.element.id === state.refElement?.id && { refElement: { ...state.refElement, ...action.payload.element, parent: action.payload.to } }),
        ...(action.payload.element.id === state.selectedElement?.id && { selectedElement: { ...state.selectedElement, ...action.payload.element, parent: action.payload.to } }),
        ...(action.payload.element.id === state.startedElement?.id && { startedElement: { ...state.startedElement, ...action.payload.element, parent: action.payload.to } }),
        ...(action.payload.element.id === state.configElement?.id && { configElement: { ...state.configElement, ...action.payload.element, parent: action.payload.to } }),
      }
    case "CHANGE_STATUS":
      if (!state.project) return state
      return {
        ...state,
        project: changeElementStatus([state.project], action)[0]
      }
    case "START_ELEMENT":
      if (!state.project) return state
      return {
        ...state,
        project: changeElementStatus(
          [state.project],
          {
            type: "CHANGE_STATUS",
            payload: {
              ...action.payload,
              status: "ACTIVE"
            }
          })[0],
        startedElement: action.payload.element
      }
    case "OPEN_ELEMENT":
      return {
        ...state,
        openedElement: action.payload.element
      }
    case "SELECT_ELEMENT":
      return {
        ...state,
        selectedElement: action.payload.element,
      }
    case "SET_REF_ELEMENT":
      return {
        ...state,
        refElement: action.payload.element
      }
    case "SET_CONFIG_MODE":
      return {
        ...state,
        configMode: action.payload.value
      }
    case "REMOVE_REF_ELEMENT":
      return {
        ...state,
        refElement: undefined
      }
    case "REMOVE_OPEN_ELEMENT":
      return {
        ...state,
        openedElement: undefined
      }
    case "DESELECT_ELEMENT":
      return {
        ...state,
        selectedElement: undefined,
      }
    case "REMOVE_STARTED_ELEMENT":
      return {
        ...state,
        startedElement: undefined
      }
    default:
      return state;
  }
}
