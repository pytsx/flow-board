import React from "react"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from "./dialog"
import { ColorResult, SliderPicker } from "react-color"
import clsx from "clsx"
import { Button } from "./button"
interface AvatarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  editable?: boolean
  callback?: (color: ColorResult) => void
}

const AvatarRaw = React.forwardRef<HTMLDivElement, AvatarProps>(({ style, editable, callback, ...props }, ref) => {
  return (
    <div className="select-none w-fit h-fit overflow-hidden rounded-full " ref={ref}>
      <div
        {...props}
        className={clsx(" w-8 h-8 rounded-full  border", props.className)}
        style={{
          background: style?.background || "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
          ...style
        }}
      />
    </div>
  )
})
AvatarRaw.displayName = "AvatarRaw"

const emptyColor = { hex: "", hsl: { h: 0, l: 0, s: 0, a: 0 }, rgb: { b: 0, g: 0, r: 0, a: 0 } }

const AvatarEditor = React.forwardRef<HTMLDivElement, AvatarProps>(({ ...props }, ref) => {
  const [color, setColor] = React.useState<ColorResult>(emptyColor)
  const handleChangeComplete = (color: ColorResult) => {
    setColor(color)
    props.callback && props.callback(color)
  }
  return (
    <>
      <span className="w-full flex items-center justify-center ">
        <AvatarRaw
          ref={ref}
          style={{ background: color.hex || props.style?.background }}
          className="!w-16 !h-16 border-2"
          editable={props.editable ? props.editable : true}
        />
      </span>
      <SliderPicker
        color={color.hex || String(props.style?.background)}
        className="select-none p-2"
        onChangeComplete={handleChangeComplete}
      />
    </>

  )
})
AvatarEditor.displayName = "AvatarEditor"

const AvatarEditable = React.forwardRef<HTMLDivElement, AvatarProps>(({ ...props }, ref) => {
  const [color, setColor] = React.useState<ColorResult | undefined>(undefined)
  const handleChangeComplete = (color: ColorResult) => {
    setColor(color)
  }
  const submit = () => props.callback && color && props.callback(color)
  return (
    <Dialog >
      <DialogTrigger>
        <AvatarRaw editable={props.editable ? props.editable : true} ref={ref} {...props} />
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="min-h-40">
          <DialogHeader>
            <DialogTitle className="select-none"></DialogTitle>
          </DialogHeader>
          <AvatarEditor editable={props.editable ? props.editable : true} callback={handleChangeComplete}  {...props} />
          <DialogClose asChild>
            <Button
              className={clsx("select-none ")}
              variant={"outline"} onClick={submit}
            >
              salvar
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
})
AvatarEditable.displayName = "AvatarEditable"



const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ ...props }, ref) => {
  return props.editable
    ? <AvatarEditable ref={ref} {...props} editable={props.editable ? props.editable : true} />
    : <AvatarRaw ref={ref} {...props} editable={props.editable ? props.editable : true} />
})

Avatar.displayName = "Avatar"
export default Avatar


export {
  AvatarEditable,
  Avatar,
  AvatarEditor,
  AvatarRaw,
}