import React from "react"
import { cn } from "@/lib/utils"
import { useDrag } from "react-dnd"
import { useDayItems } from "@/components/DayContext"
import { motion } from "framer-motion"

export type DayItemProps = React.ComponentPropsWithoutRef<"p"> & {
  itemName: string
}

interface DropResult {
  allowedDropEffect: string
  dropEffect: string
  name: string
}

export const DayItem = React.forwardRef<React.ElementRef<"p">, DayItemProps>(
  function DayItemComponent({ itemName, className, ...props }, ref) {
    const [, setItems] = useDayItems()
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: "ITEMS",
        item: { name: itemName },
        end(item, monitor) {
          const dropResult = monitor.getDropResult() as DropResult
          if (item && dropResult) {
            setItems(items => {
              const final = items.map(i =>
                i.id === item.name
                  ? {
                      ...i,
                      date: dropResult.name,
                    }
                  : i
              )
              console.log({ final })
              return final
            })
          }
        },
        // collect: (monitor: DragSourceMonitor) => ({
        collect: (monitor: any) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [itemName]
    )

    return (
      <motion.p
        layout
        transition={{
          type: "spring",
        }}
        // @ts-ignore
        ref={drag}
        className={cn(
          "h-7 flex items-center justify-center text-xs w-fit px-2 bg-blue-500 text-white",
          className
        )}
        style={{
          opacity: isDragging ? 0 : 1,
        }}
        {...props}
      />
    )
  }
)
