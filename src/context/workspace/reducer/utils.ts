import { deepMerge } from "@pytsx/system";
import { IElement, } from "../interface";
import { CommonReducerActions } from "./interface";

export function recursiveUpdate(elements: IElement[], id: string | null, callback: (element: IElement) => IElement): IElement[] {
  if (id === null) return elements.map(el => {
    callback(el)
    return {
      ...el,
      content: recursiveUpdate(el.content, id, callback)
    }
  })
  return elements.map(el => {
    if (el.id === id) {
      return {
        ...deepMerge(el, callback(el))
      }
    } else {
      return {
        ...el,
        content: recursiveUpdate(el.content, id, callback)
      }
    }
  })
}

interface ElementStats {
  element: IElement
  childNumber: number
  ETA: number
}


export function getStats(_element: IElement): ElementStats {
  let stats: ElementStats = {
    element: _element,
    childNumber: _element.content.length,
    ETA: _element.metadata?.ETA || 0
  }
  _element.content.map(item => {
    if (item.content.length > 0) {
      return {
        childNumber: item.content.length,
        ETA: item.metadata?.ETA
      }
    }
    stats.childNumber += getStats(item).childNumber
    stats.ETA += getStats(item).ETA
  })

  return stats
}

export function addElement(elements: IElement[], action: CommonReducerActions): IElement[] {
  if (action.type !== "ADD_ELEMENT") throw new Error("wrong action type pass to AddElement")
  // if (!action.payload.parentId) {
  //   return [...elements, action.payload.element]
  // }
  return recursiveUpdate(elements, action.payload.parentId, (element) => {
    const isDuplicate = element.content.some(
      (element) =>
        element.id === action.payload.element.id
    );
    if (isDuplicate) return updateElement([element], {
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: element,
        newElement: {
          ...element,
          ...action.payload.element,
          updatedAt: new Date()
        }
      }
    })[0]

    const newElement = {
      ...action.payload.element,
      parent: element.id,
      summary: {
        ...action.payload.element.summary,
        parents: [...(element?.summary.parents || []), element.id]
      },
      updatedAt: new Date()
    }

    const newParent: IElement = {
      ...element,
      content: [...element.content, newElement],
      summary: {
        ...element.summary,
        child: [...element.summary.child, newElement.id]
      },

      metadata: {
        ...element.metadata,
        ETA: (element.metadata?.ETA || 0) + (action.payload.element.metadata?.ETA || 0)
      },
      updatedAt: new Date()
    }
    return newParent
  })

}

export function updateElement(elements: IElement[], action: CommonReducerActions): IElement[] {
  if (action.type !== "UPDATE_ELEMENT") throw new Error("wrong action type pass to updateElement")

  if (action.payload.oldElement.parent === "root") {
    return recursiveUpdate(elements, action.payload.oldElement.id, (element) => {
      return {
        ...deepMerge<IElement, IElement>(element, action.payload.newElement),
        updatedAt: new Date()
      }
    })
  }

  return recursiveUpdate(elements, action.payload.oldElement.parent, (element) => {
    return {
      ...element,
      content: element.content.map(item => {
        if (item.id === action.payload.oldElement.id) {
          return {
            ...item,
            ...action.payload.newElement,
            updatedAt: new Date()
          }
        }
        return item
      })
    }
  })
}

export function changeElementStatus(elements: IElement[], action: CommonReducerActions): IElement[] {
  if (action.type !== "CHANGE_STATUS") throw new Error("wrong action type pass to StartElement")
  return recursiveUpdate(elements, action.payload.element.id, (element) => {
    return {
      ...element,
      metadata: {
        ...element.metadata,
        status: action.payload.status,
        timer: {
          [action.payload.status]: new Date()
        }
      },
      updatedAt: new Date()
    }
  })
}


export function migrateElement(elements: IElement[], action: CommonReducerActions): IElement[] {
  if (action.type !== "MIGRATE_ELEMENT") throw new Error("wrong action type pass to StartElement")
  const newElements = deleteElement(elements, {
    type: "DELETE_ELEMENT",
    payload: {
      elementId: action.payload.element.id,
      parentId: action.payload.element.parent
    }
  })

  return addElement(
    newElements,
    {
      type: "ADD_ELEMENT",
      payload: {
        element: {
          ...action.payload.element,
          metadata: {
            ...action.payload.element.metadata,
            whenFinish: undefined
          }
        },
        parentId: action.payload.to
      }
    })
}

export function deleteElement(elements: IElement[], action: CommonReducerActions): IElement[] {
  if (action.type !== "DELETE_ELEMENT") throw new Error("wrong action type pass to deleteElement")
  if (action.payload.parentId === "root") {
    return elements.filter(item => {
      if (item.id === action.payload.elementId) {
        return false
      } else if (item.content && Array.isArray(item.content)) {
        item.content = deleteElement(item.content, action)
      }
      return true
    })
  }

  return elements?.map(element => {
    if (element.id === action.payload.parentId) {

      return {
        ...element,
        content: element.content.filter(item => {
          if (item.id === action.payload.elementId) {
            return false
          } else if (item.content && Array.isArray(item.content)) {
            item.content = deleteElement(item.content, action)
          }
          return true
        }),
        updatedAt: new Date()
      }
    } else {
      element.content = deleteElement(element.content, action)
    }
    return element
  })
}

export function deepSearch(elements: IElement[], elementId: string): IElement | undefined {
  return elements.find(element => {
    if (element.id === elementId) return element
    return deepSearch(element.content, elementId)
  })
}

