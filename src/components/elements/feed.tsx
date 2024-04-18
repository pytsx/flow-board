import React from "react"
import clsx from "clsx"
import { ScrollArea } from "../ui/scroll-area"
import Element, { ElementProps } from "."
import { AddElement } from "./utils/add"
import Paper from "../ui/paper"

export function Feed({ element, type, ...props }: ElementProps) {
  return (
    <section
      className={"group group/feed relative flex flex-col h-full gap-1 "}
    >
      <Paper status={element.metadata?.status} className={clsx("absolute z-40 top-0")}>
        <Element
          raw
          type={"text"}
          element={element}
          {...props} 
          className={clsx(
            "w-full h-full capitalize text-sm text-center leading-4 line-clamp-1 flex items-center justify-center whitespace-nowrap px-8",
            props.dense && "text-xs"
          )} />
      </Paper>
      <ScrollArea style={props.style}>
        <section className=" flex flex-col gap-1 pt-9  bg-slate-200/30 rounded-sm px-1">
          {
            (element.content || [])
              .sort((a, b) => (a.position || 0) - (b.position || 0))
              .map(el => (
                <Element type={el.type} element={el} key={el.id} parentName={element.id} {...props} />
              ))
          }
          <AddElement element={element} parentName={element.id} dense={props.dense} />
        </section>
      </ScrollArea>
    </section>
  )
}