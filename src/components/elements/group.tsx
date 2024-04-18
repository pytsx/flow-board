import DashedContainer from "../ui/dashed-container";
import { AddElement } from "./utils/add";
import Element, { ElementProps } from ".";

export function GroupElement({ element, type, ...props }: ElementProps) {

  return <DashedContainer dense type="shadow" className="!py-1" childClassName="!opacity-100 capitalize p-0 px-1">
    <Element type="text" element={element} raw className="w-full" />
    {
      Array.isArray(element.content) && element.content.map(content => (
        <Element key={content.id} type={content.type} element={content} {...props} />
      ))
    }
    <AddElement element={element} dense={props.dense} />

  </DashedContainer>
}