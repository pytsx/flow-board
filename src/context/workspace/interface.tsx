export type ElementType = "group" | "task" | "add" | "text" | "feed" | "board" | "project" | "details" | "avatar" | "workspace"
export type ElementStatusType = | "ACTIVE" | "PAUSED" | "IDLE" | "FINISHED" | "LINK"

type ElementTimer = Partial<Record<ElementStatusType, Date>>

type ElementMetadata = {
  [x: string]: any
  status: ElementStatusType
  timer: ElementTimer
  ETA: number
  duration: number
  whenFinish: {
    migrateTo: string
  }
}

export interface IElement {
  position: number
  parent: string
  summary: {
    parents: string[],
    child: string[]
  }
  type: ElementType
  id: string
  title?: string
  content: IElement[]
  style: React.CSSProperties
  updatedAt: Date
  metadata?: Partial<ElementMetadata>
  project: string
}
