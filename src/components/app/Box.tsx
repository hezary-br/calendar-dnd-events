import type { CSSProperties, FC } from "react"
import type { DragSourceMonitor } from "react-dnd"
import { useDrag } from "react-dnd"

export const ItemTypes = {
  BOX: "box",
}

export interface BoxProps {
  name: string
}

interface DropResult {
  allowedDropEffect: string
  dropEffect: string
  name: string
}

export const Box: FC<BoxProps> = ({ name }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { name },
      end(item, monitor) {
        console.log({ item, monitor })
        const dropResult = monitor.getDropResult() as DropResult
        console.log({ dropResult })
        if (item && dropResult) {
          let alertMessage = ""
          const isDropAllowed =
            dropResult.allowedDropEffect === "any" ||
            dropResult.allowedDropEffect === dropResult.dropEffect

          if (isDropAllowed) {
            const isCopyAction = dropResult.dropEffect === "copy"
            const actionName = isCopyAction ? "copied" : "moved"
            alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
          } else {
            alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
          }
          alert(alertMessage)
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name]
  )

  return (
    <div
      ref={drag}
      style={{
        border: "1px dashed gray",
        color: "black",
        backgroundColor: "white",
        padding: "0.5rem 1rem",
        marginRight: "1.5rem",
        marginBottom: "1.5rem",
        float: "left",
        opacity,
      }}
    >
      {name}
    </div>
  )
}
