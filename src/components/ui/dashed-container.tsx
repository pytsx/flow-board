import { cn } from "@/lib/utils"
import clsx from "clsx"
import React from "react"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dense?: boolean
  disabled?: boolean
  type?: "default" | "shadow"
  childClassName?: string
}

const DashedContainer = React.forwardRef<HTMLDivElement, Props>(({ dense, type = "default", childClassName, ...props }, ref) => {
  const { className, children } = props
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "transition-all  group/dashedContainer py-12 cursor-pointer w-full h-full rounded-sm border-2 border-dashed",
        [type == "default" && "border-blue-200 bg-blue-200/10 hover:bg-blue-200/30"],
        [type == "shadow" && "border-slate-200 bg-slate-200/10 hover:bg-slate-200/30"],
        [dense && "!p-0"],
        "text-xs uppercase  ",
        [dense && "!capitalize !border"],
        [props.disabled &&
          type == "default"
          ? "hover:!bg-blue-200/10 !cursor-default"
          : "hover:!bg-slate-200/10 !cursor-default"
        ],
        className,
      )}>
      <div className={cn("select-none w-full h-full flex items-center justify-center flex-col gap-1 opacity-70 text-slate-700 group-hover/dashedContainer:opacity-100 transition-all px-1", childClassName)}>
        {children}
      </div>
    </div>
  )
})

DashedContainer.displayName = "DashedContainer"
export default DashedContainer