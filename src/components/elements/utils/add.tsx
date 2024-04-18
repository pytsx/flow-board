"use client"
import { ElementType, IElement, useWorkspace } from "@/context";
import clsx from "clsx";
import { Plus, Text, Group, LucideIcon, RectangleHorizontal, RectangleVertical, Folder, Ruler, Paintbrush } from "lucide-react";
import React from "react";
import { v4 } from "uuid"
import { ElementProps } from "..";
import { generateGradient } from "@/lib/colors";


type AddElementOpts = Omit<Partial<Record<ElementType, boolean>>, "add">

interface Props extends Partial<ElementProps> {
  board?: IElement
  permanent?: boolean
  opts?: AddElementOpts
}

const defaultOpts: AddElementOpts = {
  board: true,
  feed: true,
  group: true,
  task: true,
  text: true,
  project: true,
  details: false,
  avatar: false
}

export function AddElement({ element, dense = false, board, permanent = false, opts, ...props }: Props) {
  if (!opts) {
    opts = defaultOpts
  } else {
    opts = {
      ...defaultOpts,
      ...opts,
    }
  }

  const { addElement, projectState, globalState } = useWorkspace()

  function addAnElement(type: ElementType) {
    const title = type == "text" ? "insira um texto" : type + " sem título"
    const parent = element?.id || board?.id || "root"
    const id = v4()

    const newElement: IElement = {
      id,
      position: Array.isArray(element?.content) && element.content.length + 1 || 0,
      parent,
      content: [],
      style: {
        background: generateGradient(),
      },
      type,
      title,
      summary: {
        child: [],
        parents: [...element?.summary.parents || []]
      },
      updatedAt: new Date(),
      metadata: {
        status: "IDLE",
        timer: {
          IDLE: new Date()
        },
        ETA: 5,
        duration: 5
      },
      project: projectState.project?.id || globalState.workspace.id
    }
    addElement(newElement)
  }

  if (element?.metadata?.status === "FINISHED") return <div></div>
  if (projectState.startedElement?.metadata?.status === "ACTIVE") return <div className="h-10 w-full min-w-[2.1rem]"></div>

  return (
    <span className={clsx("relative group/addElement flex justify-center w-full min-h-12", [dense && "h-fit"])}>
      <button className={clsx("absolute top-0 bottom-0  min-h-8 opacity-0 group-hover/feed:opacity-10  group-hover/addElement:hidden w-full flex items-center justify-center")} >
        <Plus />
      </button>
      <div className={clsx("h-full w-full flex items-center min-h-12 justify-center gap-1", dense && "!min-h-fit")}>

        {opts.feed
          && <Button
            className={props.className}
            dense={dense}
            permanent={permanent}
            icon={RectangleVertical}
            onClick={() => addAnElement("feed")} />}

        {opts.group
          && <Button
            className={props.className}
            permanent={permanent}
            dense={dense}
            icon={Group}
            onClick={() => addAnElement("group")} />}

        {opts.task
          && <Button
            className={props.className}
            permanent={permanent}
            dense={dense}
            icon={RectangleHorizontal}
            onClick={() => addAnElement("task")} />}

        {opts.text
          && <Button
            className={props.className}
            permanent={permanent}
            dense={dense}
            icon={Text}
            onClick={() => addAnElement("text")} />}

        {opts.project
          && <Button
            className={props.className}
            permanent={permanent}
            dense={dense}
            icon={Folder}
            onClick={() => addAnElement("project")} />}

        {opts.details
          && <Button
            className={props.className}
            permanent={permanent}
            dense={dense}
            icon={Ruler}
            onClick={() => addAnElement("details")} />}

        {opts.avatar
          && <Button
            className={props.className}
            permanent={permanent}
            dense={dense}
            icon={Paintbrush}
            onClick={() => addAnElement("avatar")} />}

      </div>
    </span>
  )
}

function Button({
  icon: Icon,
  onClick,
  permanent,
  dense,
  className
}: { icon: LucideIcon, onClick: () => void, permanent: boolean, dense: boolean, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={
        clsx(
          "group/addElementBtn p-2 h-full border rounded-sm items-center justify-center flex",
          !permanent && "hidden group-hover/addElement:flex",
          dense && "!p-1",
          className
        )} >
      <Icon className={
        clsx(
          "w-4 h-4 group-hover/addElementBtn:scale-110 group-hover/addElementBtn:!opacity-100 opacity-50 transition-all delay-75",
          permanent && "opacity-60"
        )} />
    </button>
  )
}


