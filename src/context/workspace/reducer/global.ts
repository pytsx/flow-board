import { IElement, addElement, changeElementStatus, deleteElement, migrateElement, updateElement } from ".."
import { GlobalReducerActions, GlobalState } from "./interface"

export const globalReducer = (state: GlobalState, action: GlobalReducerActions): GlobalState => {
  switch (action.type) {
    case "LOAD_PROJECT":
      if (action.payload.project && action.payload.project.type === "project") {
        const alreadyExist = state.workspace.content.some(el => el.id === action.payload.project?.id)
        if (alreadyExist) return {
          ...state,
          updatedAt: new Date(),
          workspace: {
            ...state.workspace,
            content: state.workspace.content.map(pro => pro.id === action.payload.project.id ? action.payload.project : pro),
            updatedAt: new Date(),
          }
        }
        return {
          ...state,
          workspace: {
            ...state.workspace,
            content: [...state.workspace.content, action.payload.project as IElement],
            updatedAt: new Date()
          },
          updatedAt: new Date()
        }
      }
      return state
    case "LOAD_WORKSPACE":
      return {
        ...state,
        workspace: {
          ...state.workspace,
          ...action.payload.data,
        },
        updatedAt: new Date()
      }
    case "SET_CONFIG_MODE":
      return {
        ...state,
        configMode: action.payload.value
      }
    case "LOAD_DATA":
      return {
        ...state,
        ...action.payload.data
      }
    case "ADD_ELEMENT":
      return {
        ...state,
        workspace: addElement([state.workspace], action)[0]
      }
    case "UPDATE_ELEMENT":
      if (state.workspace.id === action.payload.newElement.id) {
        return {
          ...state,
          workspace: {
            ...state.workspace,
            ...action.payload.newElement
          }
        }
      }

      return {
        ...state,
        workspace: updateElement([state.workspace], action)[0]
      }
    case "DELETE_ELEMENT":
      return {
        ...state,
        workspace: deleteElement([state.workspace], action)[0]
      }
    case "MIGRATE_ELEMENT":
      return {
        ...state,
        workspace: migrateElement([state.workspace], action)[0]
      }
    case "CHANGE_STATUS":
      return {
        ...state,
        workspace: changeElementStatus([state.workspace], action)[0]
      }
    default:
      return state;
  }
}