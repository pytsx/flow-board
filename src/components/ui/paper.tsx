import { ElementStatusType } from "@/context"
import { cn } from "@/lib/utils"
import React from "react"


interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  active?: boolean
  dense?: boolean
  status?: ElementStatusType
}

const Paper = React.forwardRef<HTMLDivElement, Props>(({ active = true, dense, className, status, ...props }, ref) => {

  return (
    <div
      ref={ref}
      {...props}
      className={
        cn("w-full  rounded-sm shadow border border-y-0 border-x-8 border-slate-400 bg-slate-200 h-8 flex items-center", className,
          [!active && "opacity-50"],
          [status === "ACTIVE" && "bg-green-100 border-green-700/30 "],
          [status === "PAUSED" && "bg-orange-100 border-orange-700/30 "],
          [status === "FINISHED" && "bg-neutral-100 border-neutral-700/30 "],
        )}
    >
      {props.children}
    </div>
  )
})


Paper.displayName = "Paper"
export default Paper