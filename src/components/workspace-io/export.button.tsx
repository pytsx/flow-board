"use client"
import clsx from "clsx";
import React from "react";
import { buttonVariants } from "../ui/button";
import { Download } from "lucide-react";
interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { }
const ExportButton = React.forwardRef<HTMLButtonElement, Props>(({ ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(buttonVariants({ variant: "outline", className: "!px-2" }),
        "select-none rounded-sm leading-none bg-transparent  text-neutral-950 !capitalize text-sm  ",
        "transition-all ",
        "active:shadow-none active:opacity-60",
        "h-fit md:h-8"
      )}
      {...props}
    >
      <Download className="w-4 h-4" />
    </button>
  )
})

ExportButton.displayName = "ExportButton"
export default ExportButton